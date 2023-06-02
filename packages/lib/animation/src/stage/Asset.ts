import { Chronometer } from '../animator/Chronometer';

/**
 * An Asset that can be rendered on a Canvas element
 */
export type Asset = {
  cleanup(): boolean;

  render(time: Chronometer, context: CanvasRenderingContext2D): void;
};
