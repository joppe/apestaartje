import { Direction } from '../tiles/Direction';

import { Callback } from './Callback';

export function control(callback: Callback): void {
  document.body.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
        callback(Direction.UP);
        break;
      case 'ArrowRight':
        callback(Direction.RIGHT);
        break;
      case 'ArrowDown':
        callback(Direction.DOWN);
        break;
      case 'ArrowLeft':
        callback(Direction.LEFT);
        break;
    }
  });
}
