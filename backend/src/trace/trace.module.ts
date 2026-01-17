// trace.module.ts
import {
  CallHandler,
  DynamicModule,
  ExecutionContext,
  Global,
  Injectable,
  Module,
  NestInterceptor,
  Optional,
} from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncLocalStorage } from 'node:async_hooks';
import { performance } from 'node:perf_hooks';
import * as path from 'path';
import 'reflect-metadata';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MermaidGenerator, MermaidOptions } from './mermaid-generator';

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
}

export interface TraceStorage {
  getStore(): TraceStore | undefined;
  run<T>(store: TraceStore, fn: () => T): T;
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
  constructor(
    @Optional()
    private readonly options?: {
      saveAsMermaid?: boolean;
      mermaidOptions?: MermaidOptions;
      outputDir?: string;
    },
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const storage = getTraceStorage();
    const store: TraceStore = { stack: [] };

    return new Observable((observer) => {
      storage.run(store, () => {
        next
          .handle()
          .pipe(
            tap({
              finalize: () => {
                if (store.root) {
                  if (this.options?.saveAsMermaid) {
                    this.saveTraceAsMermaid(store, context);
                  } else {
                    console.dir(store.root, { depth: null });
                  }
                }
              },
            }),
          )
          .subscribe(observer);
      });
    });
  }

  private saveTraceAsMermaid(
    store: TraceStore,
    context: ExecutionContext,
  ): void {
    try {
      const mermaidOptions = this.options?.mermaidOptions || {};
      const outputDir = this.options?.outputDir || './traces';

      // Generate filename based on request info
      const request = context.switchToHttp().getRequest();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const method = request.method || 'UNKNOWN';
      const url = (request.url || 'unknown').replace(/[^a-zA-Z0-9]/g, '_');

      const filename = `trace_${method}_${url}_${timestamp}.md`;
      const filepath = path.join(outputDir, filename);

      // Generate Mermaid diagram
      const mermaidContent = MermaidGenerator.generateFlowchart(
        store,
        mermaidOptions,
      );

      // Create markdown content with the diagram
      const markdownContent = `# Trace Diagram

Generated: ${new Date().toISOString()}
Method: ${method}
URL: ${request.url || 'N/A'}

${mermaidContent}

## Trace Data (JSON)

\`\`\`json
${JSON.stringify(store.root, null, 2)}
\`\`\``;

      // Save to file
      MermaidGenerator.saveToFile(markdownContent, filepath);
    } catch (error) {
      console.error('Failed to save trace as Mermaid diagram:', error);
      // Fallback to console output
      console.dir(store.root, { depth: null });
    }
  }
}

/* ---------------- TraceModule ---------------- */
@Global()
@Module({})
export class TraceModule {
  static forRoot(options?: {
    storage?: TraceStorage;
    saveTracesAsMermaid?: boolean;
    mermaidOptions?: MermaidOptions;
    tracesOutputDir?: string;
  }): DynamicModule {
    if (options?.storage) {
      setTraceStorage(options.storage);
    }

    const interceptorOptions = {
      saveAsMermaid: options?.saveTracesAsMermaid ?? false,
      mermaidOptions: options?.mermaidOptions,
      outputDir: options?.tracesOutputDir,
    };

    return {
      module: TraceModule,
      providers: [
        options?.storage
          ? { provide: 'TraceStorage', useValue: options.storage }
          : { provide: 'TraceStorage', useClass: AlsTraceStorage },
        {
          provide: APP_INTERCEPTOR,
          useValue: new TraceInterceptor(interceptorOptions),
        },
      ],
    };
  }
}
