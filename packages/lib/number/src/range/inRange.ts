import { Range } from './Range';

/**
 * Check if a value falls within a range
 */
export function inRange(
  value: number,
  range: Range,
  exclusive = false,
): boolean {
  if (exclusive) {
    return value > range.min && value < range.max;
  }

  return value >= range.min && value <= range.max;
}
