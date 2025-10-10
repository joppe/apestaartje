import type { Vector } from '@apestaartje/geometry/vector/Vector';
import type { GridPosition } from '@apestaartje/grid/GridPosition';

import type { Maze } from '../maze/Maze';

type HitWallOptions = {
  maze: Maze;
  position: Vector;
  stepsPerUnit: number;
};

export function hitWall({ maze, position, stepsPerUnit }: HitWallOptions) {
  const positions: GridPosition[] = [
    {
      column: Math.floor(position.x / stepsPerUnit),
      row: Math.floor(position.y / stepsPerUnit),
    },
    {
      column: Math.ceil(position.x / stepsPerUnit),
      row: Math.floor(position.y / stepsPerUnit),
    },
    {
      column: Math.floor(position.x / stepsPerUnit),
      row: Math.ceil(position.y / stepsPerUnit),
    },
    {
      column: Math.ceil(position.x / stepsPerUnit),
      row: Math.ceil(position.y / stepsPerUnit),
    },
  ];

  return positions.some((position) => {
    return maze.isWall(position);
  });
}
