import { add } from '@apestaartje/geometry/point/add';
import type { Point } from '@apestaartje/geometry/point/Point';
import type { Rectangle } from '@apestaartje/geometry/rectangle/Rectangle';
import type { Size } from '@apestaartje/geometry/size/Size';

type Boxptions = {
  northEast: Point;
  size: Size;
};

export class Box {
  private readonly _size: Size;
  private readonly _rectangle: Rectangle;

  public get northEast(): Point {
    return {
      x: this._rectangle.topLeft.x,
      y: this._rectangle.bottomRight.y,
    };
  }

  public get rectangle(): Rectangle {
    return this._rectangle;
  }

  public get width(): number {
    return this._size.width;
  }

  public get height(): number {
    return this._size.height;
  }

  constructor({ northEast, size }: Boxptions) {
    this._size = size;
    this._rectangle = {
      topLeft: {
        x: northEast.x,
        y: northEast.y + size.height,
      },
      bottomRight: {
        x: northEast.x + size.width,
        y: northEast.y,
      },
    };
  }

  public move(offset: Point): void {
    this._rectangle.topLeft = add(this._rectangle.topLeft, offset);
    this._rectangle.bottomRight = add(this._rectangle.bottomRight, offset);
  }
}
