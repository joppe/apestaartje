import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';

import { SelfSteeringVehicle } from '../objects/SelfSteeringVehicle';
import '../style.css';

const stageSize = { width: 800, height: 600 };

const stage = new Stage(stageSize);
const foreground = stage.createLayer('foreground', 10);

const vehicle = new SelfSteeringVehicle({
  position: { x: stageSize.width / 2, y: stageSize.height / 2 },
  size: 10,
  appearance: {
    color: '#ff5733',
    border: {
      color: 'black',
      width: 2,
    },
  },
  edges: {
    topLeft: { x: 0, y: 0 },
    bottomRight: { x: stageSize.width, y: stageSize.height },
  },
  maxSpeed: 2,
  maxForce: 0.05,
});
foreground.addAsset(vehicle, 'vehicle', 10);

const animator = new Animator(
  (chronometer) => {
    stage.tick(chronometer);
    stage.render();

    return true;
  },
  (chronometer: Chronometer) => chronometer.count % 3 === 0,
);

document.body.append(stage.element);

animator.start();
