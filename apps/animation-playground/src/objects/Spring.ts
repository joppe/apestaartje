import { type Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';
import { length } from '@apestaartje/geometry/vector/length';
import { scale } from '@apestaartje/geometry/vector/scale';
import { subtract } from '@apestaartje/geometry/vector/subtract';
import { unit } from '@apestaartje/geometry/vector/unit';

type SpringProps = {
  anchor: Vector;
  restLength: number;
  maxLength: number;
  k: number; // Spring constant
};

export class Spring {
  private _anchor: Vector;
  private _restLength: number;
  private _maxLength: number; // Maximum length of the spring
  private _k: number; // Spring constant

  public constructor({ anchor, restLength, maxLength, k }: SpringProps) {
    this._anchor = anchor;
    this._restLength = restLength;
    this._maxLength = maxLength;
    this._k = k;
  }

  public calculateForce(point: Vector): Vector {
    const direction = subtract(point, this._anchor);
    const distance = length(direction);
    const stretch = distance - this._restLength;

    return scale(unit(direction), -this._k * stretch);
  }

  public constraint(point: Vector): Vector {
    const direction = subtract(point, this._anchor);
    const distance = length(direction);

    if (distance > this._maxLength) {
      return add(this._anchor, scale(unit(direction), this._maxLength));
    }

    return point; // No constraint applied
  }
}
