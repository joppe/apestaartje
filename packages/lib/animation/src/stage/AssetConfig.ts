import type { Asset } from './Asset';

/**
 * Configuration for adding an Asset to a Layer
 */

export type AssetConfig = {
  asset: Asset;
  depth: number;
  id: string;
};
