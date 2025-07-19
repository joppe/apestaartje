import type { Point } from '@apestaartje/geometry/point/Point';

export class Mouse {
  private _position: Point;
  private _isPressed = false;

  get position(): Point {
    return this._position;
  }

  get isPressed(): boolean {
    return this._isPressed;
  }

  public constructor(element: HTMLElement) {
    this._position = { x: 0, y: 0 };

    this.attachListeners(element);
  }

  private attachListeners(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();

    const moveHandle = (event: MouseEvent): void => {
      this._position.x = event.clientX - rect.left;
      this._position.y = event.clientY - rect.top;
    };

    const mousedownHandle = (): void => {
      this._isPressed = true;
    };
    const mouseupHandle = (): void => {
      this._isPressed = false;
    };

    element.addEventListener('mousemove', moveHandle);
    element.addEventListener('mouseenter', moveHandle);
    element.addEventListener('mousedown', mousedownHandle);
    element.addEventListener('mouseup', mouseupHandle);
  }
}
