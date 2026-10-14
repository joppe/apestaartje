import type { Stage } from '@apestaartje/animation/stage/Stage';

import type { Universe } from '../../../wasm';

type ToolProps = {
  stage: Stage;
  universe: Universe;
  cellSize: number;
};

type Mode = undefined | 'draw' | 'erase';

export function tools({ stage, universe, cellSize }: ToolProps) {
  const container = stage.element;
  const width = universe.width();
  const height = universe.height();
  let mode: Mode = undefined;
  let isDragging = false;

  function erase(clientX: number, clientY: number) {
    if (!isDragging || (mode !== 'erase' && mode !== 'draw')) {
      return;
    }

    const { left, top } = container.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const row = Math.min(Math.floor(y / cellSize), height);
    const col = Math.min(Math.floor(x / cellSize), width);

    if (mode === 'erase') {
      universe.dead(row, col);
    } else {
      universe.alive(row, col);
    }

    stage.render();
  }

  container.addEventListener('mouseleave', () => {
    isDragging = false;
  });
  container.addEventListener('mouseup', () => {
    isDragging = false;
  });
  container.addEventListener('mousedown', (event: MouseEvent) => {
    isDragging = true;

    erase(event.clientX, event.clientY);
  });
  container.addEventListener('mousemove', (event: MouseEvent) => {
    erase(event.clientX, event.clientY);
  });

  return {
    enableDrawing: () => {
      mode = 'draw';
    },
    enableErasing: () => {
      mode = 'erase';
    },
    stop: () => {
      mode = undefined;
    },
  };
}
