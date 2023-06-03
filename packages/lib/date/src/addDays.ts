import { clone } from './clone';

export function addDays(start: Date, count: number): Date {
  const date = clone(start);

  date.setDate(date.getDate() + count);

  return date;
}
