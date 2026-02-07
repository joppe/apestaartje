import { type Asset } from '@apestaartje/animation/stage/Asset';
import { type Vector } from '@apestaartje/geometry/vector/Vector';

import { circle } from '../../draw/shapes';
import { Movable } from '../Movable';

type ParticleProps = {
  position: Vector;
  velocity?: Vector;
  acceleration?: Vector;
};

export class Particle extends Movable implements Asset {
  private _lifespan = 255;

  public constructor({
    position,
    velocity = { x: 0, y: 0 },
    acceleration = { x: 0, y: 0 },
  }: ParticleProps) {
    super({ position, velocity, acceleration, mass: 1 });
  }

  public isDead(): boolean {
    return this._lifespan <= 0; // Particle is considered dead when lifespan is
  }

  public cleanup(): boolean {
    return this.isDead();
  }

  public tick(): void {
    this.update();
    this._lifespan -= 2; // Decrease lifespan
  }

  public render(context: CanvasRenderingContext2D): void {
    circle(context, {
      radius: 5,
      position: this._position,
      color: `rgba(255, 0, 0, ${this._lifespan / 255})`, // Fade out effect
    });
  }
}
