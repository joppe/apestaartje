export function castValue(
  value: string | null,
  type: string,
): string | number | boolean | object | undefined {
  let n: number;

  if (value === null) {
    return undefined;
  }

  switch (type) {
    case 'bool':
      if (value !== 'true' && value !== 'false') {
        throw new Error(`Cannot cast ${value} to "bool"`);
      }

      return value === 'true';
    case 'int':
      n = parseInt(value, 10);

      if (isNaN(n)) {
        throw new Error(`Cannot cast ${value} to "int"`);
      }

      return n;
    case 'float':
      n = parseFloat(value);

      if (isNaN(n)) {
        throw new Error(`Cannot cast ${value} to "float"`);
      }

      return n;
    case 'json':
      return <object>JSON.parse(value);
    default:
      return value;
  }
}
