import { constrain } from './constrain';

type Range = {
  min: number;
  max: number;
};

type ScaleProps = {
  value: number;
  from: Range;
  to: Range;
};

export function scale({ value, from, to }: ScaleProps): number {
  const fromRange = from.max - from.min;
  const toRange = to.max - to.min;

  if (fromRange === 0) {
    return to.min; // Avoid division by zero, return the minimum of the target range
  }

  const scaledValue = ((value - from.min) / fromRange) * toRange + to.min;

  // Ensure the scaled value is within the target range
  if (scaledValue < to.min) {
    return to.min;
  }

  if (scaledValue > to.max) {
    return to.max;
  }

  return constrain({ value: scaledValue, min: to.min, max: to.max });
}
