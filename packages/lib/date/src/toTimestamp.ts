export function toTimestamp(date: Date, milliseconds = false): number {
  const time = date.getTime();

  return milliseconds ? time : Math.round(time / 1000);
}
