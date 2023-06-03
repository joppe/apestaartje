import { addDays } from './addDays';
import { startOfWeek } from './startOfWeek';

export function range(date: Date, length: number): Date[] {
  const start = startOfWeek(date);

  return Array.from({ length }, (_, i: number): Date => {
    return addDays(start, i);
  });
}
