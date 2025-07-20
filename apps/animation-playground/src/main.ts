import { Animator } from '@apestaartje/animation/animator/Animator';
import { type Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { type Asset } from '@apestaartje/animation/stage/Asset';
import { Layer } from '@apestaartje/animation/stage/Layer';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { type Vector } from '@apestaartje/geometry/vector/Vector';
import { rand } from '@apestaartje/number/rand';
import { random } from '@apestaartje/number/random';
import { type Range } from '@apestaartje/number/range/Range';

import { circle } from './draw/shapes';
import { Movable } from './objects/Movable';
import './style.css';
import { Mouse } from './util/Mouse';

const stageSize = { width: 800, height: 600 };

const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);
const mouse = new Mouse(stage.element);

const gravity = { x: 0, y: 0.1 }; // Simulated gravity force

type ParticleProps = {
  position: Vector;
  velocity?: Vector;
  acceleration?: Vector;
};

class Particle extends Movable implements Asset {
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

function randomVector(x: Range, y: Range): Vector {
  return {
    x: random(x.min, x.max),
    y: random(y.min, y.max),
  };
}

type ParticleEmitterProps = {
  position: Vector;
  maxParticles: number;
  layer: Layer;
};

class ParticleEmitter {
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

const emitter = new ParticleEmitter({
  position: { x: 100, y: 100 },
  maxParticles: 100,
  layer: foreground,
});

const animator = new Animator((chronometer) => {
  stage.tick(chronometer);

  emitter.applyForce(gravity);
  emitter.tick();

  stage.render();

  return true;
});

document.body.append(stage.element);

animator.start();
