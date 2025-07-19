type ConstrainProps = {
  value: number;
  min: number;
  max: number;
};

export function constrain({ value, min, max }: ConstrainProps): number {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
