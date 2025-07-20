import { type Layer } from '@apestaartje/animation/stage/Layer';
import { type Vector } from '@apestaartje/geometry/vector/Vector';
import { rand } from '@apestaartje/number/rand';

import { randomVector } from '../../helpers/randomVector';

import { Particle } from './Particle';

type ParticleEmitterProps = {
  position: Vector;
  maxParticles: number;
  layer: Layer;
};

export class ParticleEmitter {
  private _position: Vector;
  private _particles: Particle[] = [];
  private _maxParticles: number;
  private _layer: Layer;

  public constructor({ position, maxParticles, layer }: ParticleEmitterProps) {
    this._position = position;
    this._maxParticles = maxParticles;
    this._layer = layer;
  }

  public applyForce(force: Vector): void {
    this._particles.forEach((particle) => {
      particle.applyForce(force);
    });
  }

  public tick(): void {
    this._particles = this._particles.filter((particle) => {
      particle.tick();

      return !particle.isDead();
    });
    this.emit();
  }

  protected emit(): void {
    if (this._particles.length < this._maxParticles) {
      const velocity = randomVector({ min: -2, max: 2 }, { min: -2, max: 2 });
      const particle = new Particle({
        position: this._position,
        velocity,
      });
      this._particles.push(particle);
      this._layer.addAsset(particle, `particle-${rand()}`, 10);
    }
  }
}
