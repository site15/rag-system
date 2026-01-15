import { encapsulateString, extractAnnotation } from './api-decorator';
import { ParsedField } from './types';

describe('encapsulateString', () => {
  it('should encapsulate strings', () => {
    expect(encapsulateString('foo')).toEqual("'foo'");
    expect(encapsulateString('foo 123')).toEqual("'foo 123'");
  });

  it('should escape single quotes', () => {
    expect(encapsulateString("have some 'single' quotes")).toEqual(
      "'have some \\'single\\' quotes'",
    );
  });

  it('should encapsulate date strings', () => {
    expect(encapsulateString('2024-10-24T13:52:23.296Z')).toEqual(
      "'2024-10-24T13:52:23.296Z'",
    );
  });

  it('should encapsulate uuid strings', () => {
    expect(encapsulateString('9ee102e8-b43a-4a48-9a06-47b059e88137')).toEqual(
      "'9ee102e8-b43a-4a48-9a06-47b059e88137'",
    );
  });

  it('should encapsulate phone numbers', () => {
    expect(encapsulateString('+46754489636')).toEqual("'+46754489636'");
  });

  it('should not encapsulate boolean values', () => {
    expect(encapsulateString('true')).toEqual('true');
    expect(encapsulateString('false')).toEqual('false');
  });

  it('should not encapsulate null', () => {
    expect(encapsulateString('null')).toEqual('null');
  });

  it('should not encapsulate number', () => {
    expect(encapsulateString('123')).toEqual('123');
    expect(encapsulateString('123.45')).toEqual('123.45');
    expect(encapsulateString('-123')).toEqual('-123');
    expect(encapsulateString('-123.45')).toEqual('-123.45');
  });

  it('should not encapsulate arrays', () => {
    expect(encapsulateString("['foo', true, 123.45]")).toEqual(
      "['foo', true, 123.45]",
    );
  });
});

describe('extractAnnotation', () => {
  it('should extract single annotation', () => {
    const field = {
      documentation: '@description Some text',
    } as ParsedField;

    expect(extractAnnotation(field, 'description')).toMatchObject({
      name: 'description',
      value: 'Some text',
    });
  });

  it('should extract annotation with additional spaces', () => {
    const field = {
      documentation: '  @description   Some text   ',
    } as ParsedField;

    expect(extractAnnotation(field, 'description')).toMatchObject({
      name: 'description',
      value: 'Some text',
    });
  });

  it('should not extract empty annotation', () => {
    const field = {
      documentation: '@description',
    } as ParsedField;

    expect(extractAnnotation(field, 'description')).toEqual(null);
  });

  it('should extract annotations from multiline documentation', () => {
    const field = {
      documentation: '@description Some text \n  @minLength 3\n',
    } as ParsedField;

    expect(extractAnnotation(field, 'description')).toMatchObject({
      name: 'description',
      value: 'Some text',
    });
    expect(extractAnnotation(field, 'minLength')).toMatchObject({
      name: 'minLength',
      value: '3',
    });
  });

  it('should not find annotation', () => {
    const field = {
      documentation: '@IsPositive\n  @minLength 3',
    } as ParsedField;

    expect(extractAnnotation(field, 'description')).toEqual(null);
  });

  it('should return if no documentation', () => {
    const field = {} as ParsedField;

    expect(extractAnnotation(field, 'description')).toEqual(null);
  });
});
