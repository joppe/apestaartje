import type { GameOfLife } from '../GameOfLife';

export type ControlsFactoryOptions = {
  api: GameOfLife;
  container: HTMLElement;
  delay: number;
};
