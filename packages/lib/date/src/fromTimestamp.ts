export function fromTimestamp(timestamp: number, milliseconds = false): Date {
  const date = new Date();

  date.setTime(milliseconds ? timestamp : timestamp * 1000);

  return date;
}
