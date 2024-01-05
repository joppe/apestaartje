import { range } from '@apestaartje/iterator/range/range';

export function axisSiblingIndices(axisIndex: number): number[] {
  const startIndex = axisIndex - (axisIndex % 3);
  const siblingIndices: number[] = [];

  for (const offsetIndex of range(0, 2)) {
    const index = startIndex + offsetIndex;

    if (index === axisIndex) {
      continue;
    }

    siblingIndices.push(index);
  }

  return siblingIndices;
}
