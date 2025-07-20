import { Animator } from '@apestaartje/animation/animator/Animator';
import { Stage } from '@apestaartje/animation/stage/Stage';

import { ParticleEmitter } from '../objects/particle/ParticleEmitter';
import '../style.css';

const stageSize = { width: 800, height: 600 };

const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);

const gravity = { x: 0, y: 0.1 }; // Simulated gravity force

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
