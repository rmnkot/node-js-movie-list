/**
 * @returns 'Provide valid { field } value as one of [{ values }]'
 */
const oneOf = (field: string, values: string[]) => {
  return `Provide valid '${field}' value as one of [${values}]`;
};

/**
 * @returns 'Provide a valid { field }'
 */
const invalid = (field: string) => {
  return `Provide a valid '${field}'`;
};

/**
 * @returns '{ field } is required'
 */
const required = (field: string) => {
  return `'${field}' is required`;
};

/**
 * @returns '{ field } must be from { min } to { max }'
 */
const minMax = (field: string, range: { min: number; max: number }) => {
  return `'${field}' must be from ${range.min} to ${range.max}`;
};

/**
 * @returns '{ field } must be from { min } to { max }'
 */
const minLength = (field: string, { min }: { min: number }) => {
  return `'${field}' must be at least ${min} characters long`;
};

/**
 * @returns 'Provide { field }'
 */
const provide = (field: string) => `Provide '${field}'`;

export default {
  invalid,
  required,
  minMax,
  minLength,
  oneOf,
  provide,
};
