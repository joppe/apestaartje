import type { Layer } from './Layer';

/**
 * Configuration for adding an Layer to the Stage
 */

export type LayerConfig = {
  depth: number;
  id: string;
  layer: Layer;
};
