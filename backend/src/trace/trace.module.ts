// trace.module.ts
import {
  CallHandler,
  DynamicModule,
  ExecutionContext,
  Global,
  Injectable,
  Module,
  NestInterceptor,
} from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncLocalStorage } from 'node:async_hooks';
import { performance } from 'node:perf_hooks';
import 'reflect-metadata';
import { Observable } from 'rxjs';
import { Logger } from '../llm/logger';

/* ---------------- Constants ---------------- */
export const TRACE_META_KEY = Symbol('TRACE_META_KEY');

/* ---------------- Interfaces ---------------- */
export interface TraceMeta {
  title?: string;
  description?: string;
}

export interface TraceNode {
  name: string;
  start: number;
  end?: number;
  duration?: number;
  children: TraceNode[];
  payload?: Record<string, any>;
  meta?: TraceMeta;
}

export interface TraceStore {
  stack: TraceNode[];
  root?: TraceNode;
  constants?: Record<string, string>;
}

export interface TraceStorage {
  getStore(): TraceStore | undefined;
  run<T>(store: TraceStore, fn: () => T): T;
}

export function getTraceStack() {
  return getTraceStorage()?.getStore()?.stack || []; /*
  try {
    const func = (trace: TraceNode[]): TraceNode[] => {
      for (let index = 0; index < trace.length; index++) {
        if (trace[index]?.children?.length) {
          trace[index].children = [...func(trace[index]?.children)];
        }
      }
      return [...trace.filter((t) => t.payload || t?.children?.length)];
    };
    const result = func(getTraceStorage()?.getStore()?.stack || []);
    return result.length ? result : null;
  } catch (error) {
    return null;
  }*/
}

/* ---------------- Default Storage ---------------- */
@Injectable()
export class AlsTraceStorage implements TraceStorage {
  private readonly als = new AsyncLocalStorage<TraceStore>();

  getStore(): TraceStore | undefined {
    return this.als.getStore();
  }

  run<T>(store: TraceStore, fn: () => T): T {
    return this.als.run(store, fn);
  }
}

/* ---------------- Storage Provider ---------------- */
let activeStorage: TraceStorage = new AlsTraceStorage();

export function getTraceStorage(): TraceStorage {
  return activeStorage;
}

export function setTraceStorage(storage: TraceStorage) {
  activeStorage = storage;
}

/* ---------------- Payload Helper ---------------- */
export function addPayloadToTrace(payload: Record<string, any>) {
  const store = getTraceStorage().getStore();
  if (!store) return;

  const node = store.stack.at(-1);
  if (!node) return;

  node.payload ??= {};
  Object.assign(node.payload, payload);
}

/* ---------------- Meta Decorator ---------------- */
export function TraceMeta(meta: TraceMeta): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(TRACE_META_KEY, meta, target, propertyKey);
  };
}

/* ---------------- Core Trace Decorator ---------------- */
export function Trace(name?: string): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    const meta = Reflect.getMetadata(TRACE_META_KEY, target, propertyKey);

    descriptor.value = function (...args: any[]) {
      return traceRun(
        name ?? `${target.constructor.name}.${String(propertyKey)}`,
        meta,
        () => original.apply(this, args),
      );
    };

    return descriptor;
  };
}

/* ---------------- Trace Helper ---------------- */
export async function traceRun<T>(
  name: string,
  meta: TraceMeta | undefined,
  fn: () => Promise<T> | T,
): Promise<T> {
  const storage = getTraceStorage();
  const store = storage.getStore();
  if (!store) {
    Logger.logInfo(
      `Trace storage not found, running without tracing [${name}]`,
    );
    return fn();
  }

  const node: TraceNode = {
    name,
    start: performance.now(),
    children: [],
    meta,
  };

  const parent = store.stack.at(-1);
  if (parent) {
    parent.children.push(node);
  } else {
    store.root = node;
  }

  store.stack.push(node);

  try {
    return await fn();
  } finally {
    node.end = performance.now();
    node.duration = node.end - node.start;
    store.stack.pop();
  }
}

/* ---------------- Trace Interceptor ---------------- */
@Injectable()
export class TraceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const storage = getTraceStorage();
    const store: TraceStore = { stack: [] };

    return new Observable((observer) => {
      storage.run(store, () => {
        next.handle().subscribe(observer);
      });
    });
  }
}

/* ---------------- TraceModule ---------------- */
@Global()
@Module({})
export class TraceModule {
  static forRoot(options?: { storage?: TraceStorage }): DynamicModule {
    if (options?.storage) {
      setTraceStorage(options.storage);
    }

    return {
      module: TraceModule,
      providers: [
        options?.storage
          ? { provide: 'TraceStorage', useValue: options.storage }
          : { provide: 'TraceStorage', useClass: AlsTraceStorage },
        {
          provide: APP_INTERCEPTOR,
          useClass: TraceInterceptor,
        },
      ],
    };
  }
}
