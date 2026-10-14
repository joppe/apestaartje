import { element } from '@apestaartje/element/element';
import type { Size } from '@apestaartje/geometry/size/Size';

import type { Chronometer } from '../animator/Chronometer';
import type { LayerConfig } from './LayerConfig';

import { Layer } from './Layer';
import styles from './stage.module.css';

/**
 * The main Stage
 */

export class Stage {
  private readonly _container: HTMLDivElement;
  private _layerConfigs: LayerConfig[] = [];
  private readonly _size: Size;

  get size(): Size {
    return this._size;
  }

  get element(): HTMLDivElement {
    return this._container;
  }

  constructor(size: Size) {
    this._size = size;

    this._container = element(['div', { class: styles.stage }]);
    this._container.style.setProperty('--width', `${this._size.width}px`);
    this._container.style.setProperty('--height', `${this._size.height}px`);
  }

  public createLayer(preferredId?: string, preferredDepth?: number): Layer {
    const depth = preferredDepth ?? this._layerConfigs.length;
    const id = preferredId ?? String(depth);
    const layer = new Layer(this._container, this._size);
    const layerConfigs = this._layerConfigs.concat({
      depth,
      id,
      layer,
    });

    layerConfigs.sort((a: LayerConfig, b: LayerConfig): number => {
      if (a.depth < b.depth) {
        return -1;
      }

      if (a.depth > b.depth) {
        return 1;
      }

      return 0;
    });

    this._layerConfigs = layerConfigs;

    return layer;
  }

  public removeLayer(id: string): void {
    this._layerConfigs = this._layerConfigs.filter(
      (layerConfig: LayerConfig): boolean => {
        return layerConfig.id !== id;
      },
    );
  }

  public getLayer(id): Layer {
    const layerConfig = this._layerConfigs.find(
      (config: LayerConfig): boolean => {
        return config.id === id;
      },
    );

    if (layerConfig === undefined) {
      throw new Error(`Could not find layer with id "${id}"`);
    }

    return layerConfig.layer;
  }

  public tick(time: Chronometer): void {
    this._layerConfigs.forEach((layerConfig: LayerConfig): void => {
      layerConfig.layer.tick(time);
    });
  }

  public render(): HTMLDivElement {
    this._layerConfigs.forEach((layerConfig: LayerConfig): void => {
      layerConfig.layer.render();
    });

    return this._container;
  }
}
