import { radians } from '@apestaartje/geometry/angle/radians';
import { Transform } from '@apestaartje/geometry/transform/Transform';
import { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { subtract } from '@apestaartje/geometry/vector/subtract';

import { TetrominoData } from './TetrominoData';
import { Type } from './Type';
import { getSize } from './getSize';

const CENTER_OFFSET: Vector = {
  x: 0.5,
  y: 0.5,
};

export class Tetromino {
  private _position: Vector = { x: 0, y: 0 };
  private readonly _blocks: Vector[];
  private readonly _center: Vector;
  private readonly _size: number;
  private readonly _type: Type;

  public get center(): Vector {
    return this._center;
  }

  public get data(): TetrominoData {
    return {
      type: this._type,
      blocks: this._blocks.map((block: Vector): Vector => {
        return add(this._position, block);
      }),
    };
  }

  public get position(): Vector {
    return this._position;
  }

  public set position(position: Vector) {
    this._position = position;
  }

  public get size(): number {
    return this._size;
  }

  public get type(): Type {
    return this._type;
  }

  public constructor(
    type: Type,
    blocks: Vector[],
    position?: Vector,
    size?: number,
  ) {
    this._type = type;
    this._blocks = blocks;

    if (position !== undefined) {
      this._position = position;
    }

    if (size === undefined) {
      this._size = getSize(blocks);
    } else {
      this._size = size;
    }

    this._center = {
      x: this._size / 2,
      y: this._size / 2,
    };
  }

  public rotate(degrees: number): Tetromino {
    const transform: Transform = new Transform();

    transform.translate(this._center.x, this._center.y);
    transform.rotate(radians(degrees));
    transform.translate(-this._center.x, -this._center.y);

    const blocks: Vector[] = this._blocks.map((block: Vector): Vector => {
      const copy: Vector = add(block, CENTER_OFFSET);
      const transformed: Vector = transform.transformPoint(copy);
      const repositioned: Vector = subtract(transformed, CENTER_OFFSET);

      return { x: Math.round(repositioned.x), y: Math.round(repositioned.y) };
    });

    return new Tetromino(this._type, blocks, this._position, this._size);
  }

  public move(offset: Vector): Tetromino {
    const position: Vector = add(this._position, offset);

    return new Tetromino(this._type, this._blocks, position, this._size);
  }
}
