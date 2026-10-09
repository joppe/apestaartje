import { gameOfLifeFactory } from './gameOfLifeFactory';

const root = document.body;

gameOfLifeFactory({
  start: [
    { x: 20, y: 20 },
    { x: 21, y: 20 },
    { x: 22, y: 20 },
    { x: 23, y: 20 },
    { x: 24, y: 20 },
    { x: 25, y: 20 },
    { x: 26, y: 20 },
    { x: 27, y: 20 },
    { x: 28, y: 20 },
    { x: 29, y: 20 },
  ],
  config: {
    container: root,
  },
});
