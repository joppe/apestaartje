import { clone } from './clone';

export function startOfDay(currentDate: Date): Date {
  const date = clone(currentDate);

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}
