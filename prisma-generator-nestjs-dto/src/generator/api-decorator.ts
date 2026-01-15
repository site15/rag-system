/* eslint-disable no-fallthrough */
import { IApiProperty, ImportStatementParams, ParsedField } from './types';
import { DTO_OVERRIDE_API_PROPERTY_TYPE } from './annotations';
import { isAnnotatedWith } from './field-classifiers';

const ApiProps = [
  'description',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'minLength',
  'maxLength',
  'minItems',
  'maxItems',
  'example',
];

const PrismaScalarToFormat: Record<string, { type: string; format?: string }> =
  {
    String: { type: 'string' },
    Boolean: { type: 'boolean' },
    Int: { type: 'integer', format: 'int32' },
    BigInt: { type: 'integer', format: 'int64' },
    Float: { type: 'number', format: 'float' },
    Decimal: { type: 'string', format: 'float' },
    DateTime: { type: 'string', format: 'date-time' },
    Bytes: { type: 'string', format: 'binary' },
  };

export function isAnnotatedWithDoc(field: ParsedField): boolean {
  return ApiProps.some((prop) =>
    new RegExp(`@${prop}\\s+(.+)\\s*$`, 'm').test(field.documentation || ''),
  );
}

function getDefaultValue(field: ParsedField): any {
  if (!field.hasDefaultValue) return undefined;

  if (Array.isArray(field.default)) return JSON.stringify(field.default);

  switch (typeof field.default) {
    case 'string':
    case 'number':
    case 'boolean':
      return field.default;
    case 'object':
      if (field.default.name) {
        return field.default.name;
      }
      return undefined;
    // fall-through
    default:
      return undefined;
  }
}

export function extractAnnotation(
  field: ParsedField,
  prop: string,
): IApiProperty | null {
  const regexp = new RegExp(`@${prop}\\s+(.+)$`, 'm');
  const matches = regexp.exec(field.documentation || '');

  if (matches && matches[1]) {
    return {
      name: prop,
      value: matches[1].trim(),
    };
  }

  return null;
}

/**
 * Wrap string with single-quotes unless it's a (stringified) number, boolean, null, or array.
 */
export function encapsulateString(value: string): string {
  // don't quote booleans, numbers, or arrays
  if (
    value === 'true' ||
    value === 'false' ||
    value === 'null' ||
    /^-?\d+(?:\.\d+)?$/.test(value) ||
    /^\[.*]$/.test(value)
  ) {
    return value;
  }

  // quote everything else
  return `'${value.replace(/'/g, "\\'")}'`;
}

/**
 * Parse all types of annotation that can be decorated with `@ApiProperty()`.
 * @param field
 * @param include All default to `true`. Set to `false` if you want to exclude a type of annotation.
 */
export function parseApiProperty(
  field: ParsedField,
  include: {
    default?: boolean;
    doc?: boolean;
    enum?: boolean;
    type?: boolean;
  } = {},
): IApiProperty[] {
  const incl = {
    default: true,
    doc: true,
    enum: true,
    type: true,
    ...include,
  };
  const properties: IApiProperty[] = [];

  if (incl.doc && field.documentation) {
    for (const prop of ApiProps) {
      const property = extractAnnotation(field, prop);
      if (property) {
        properties.push(property);
      }
    }
  }

  if (incl.type) {
    const rawCastType = isAnnotatedWith(field, DTO_OVERRIDE_API_PROPERTY_TYPE, {
      returnAnnotationParameters: true,
    });
    const castType = rawCastType ? rawCastType.split(',')[0] : undefined;
    const scalarFormat = PrismaScalarToFormat[field.type];
    if (castType) {
      properties.push({
        name: 'type',
        value: '() => ' + castType,
        noEncapsulation: true,
      });
    } else if (scalarFormat) {
      properties.push({
        name: 'type',
        value: scalarFormat.type,
      });
      if (scalarFormat.format) {
        properties.push({ name: 'format', value: scalarFormat.format });
      }
    } else if (field.kind !== 'enum') {
      properties.push({
        name: 'type',
        value: field.type,
        noEncapsulation: true,
      });
    }
    if (field.isList) {
      properties.push({ name: 'isArray', value: 'true' });
    }
  }

  if (incl.enum && field.kind === 'enum') {
    properties.push({ name: 'enum', value: field.type });
    properties.push({ name: 'enumName', value: field.type });
  }

  const defaultValue = getDefaultValue(field);
  if (incl.default && defaultValue !== undefined) {
    if (defaultValue === 'now' && field.type === 'DateTime') {
      properties.push({
        name: 'default',
        value: 'new Date().toISOString()',
        noEncapsulation: true,
      });
    } else {
      properties.push({ name: 'default', value: `${defaultValue}` });
    }
  }

  if (!field.isRequired) {
    properties.push({ name: 'required', value: 'false' });
  }
  if (
    typeof field.isNullable === 'boolean' ? field.isNullable : !field.isRequired
  ) {
    properties.push({ name: 'nullable', value: 'true' });
  }

  // set dummy property to force `@ApiProperty` decorator
  if (properties.length === 0) {
    properties.push({ name: 'dummy', value: '' });
  }

  return properties;
}

/**
 * Compose `@ApiProperty()` decorator.
 */
export function decorateApiProperty(field: ParsedField): string {
  if (field.apiHideProperty) {
    return '@ApiHideProperty()\n';
  }

  if (
    field.apiProperties?.length === 1 &&
    field.apiProperties[0].name === 'dummy'
  ) {
    return '@ApiProperty()\n';
  }

  let decorator = '';

  if (field.apiProperties?.length) {
    decorator += '@ApiProperty({\n';
    field.apiProperties.forEach((prop) => {
      if (prop.name === 'dummy') return;
      decorator += `  ${prop.name}: ${
        prop.name === 'enum' || prop.noEncapsulation
          ? prop.value
          : encapsulateString(prop.value)
      },\n`;
    });
    decorator += '})\n';
  }

  return decorator;
}

export function makeImportsFromNestjsSwagger(
  fields: ParsedField[],
  apiExtraModels?: string[],
): ImportStatementParams[] {
  const hasApiProperty = fields.some((field) => field.apiProperties?.length);
  const hasApiHideProperty = fields.some((field) => field.apiHideProperty);

  if (hasApiProperty || hasApiHideProperty || apiExtraModels?.length) {
    const destruct: string[] = [];

    if (apiExtraModels?.length) destruct.push('ApiExtraModels');
    if (hasApiHideProperty) destruct.push('ApiHideProperty');
    if (hasApiProperty) destruct.push('ApiProperty');

    return [{ from: '@nestjs/swagger', destruct }];
  }

  return [];
}
