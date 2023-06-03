/**
 * The string must be in the form yyyy-m-d
 */
export function fromString(string: string): Date {
  const [year, month, day] = string
    .split('-')
    .map((part) => parseInt(part, 10));

  return new Date(year, month - 1, day);
}
