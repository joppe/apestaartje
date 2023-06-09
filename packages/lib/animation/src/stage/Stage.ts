import { Size } from '@apestaartje/geometry/size/Size';

import { Chronometer } from '../animator/Chronometer';

import { Layer } from './Layer';
import { LayerConfig } from './LayerConfig';

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

    this._container = document.createElement('div');
    this._container.style.width = `${this._size.width}px`;
    this._container.style.height = `${this._size.height}px`;
    this._container.style.position = 'relative';

    this.createLayer('root', 0);
  }

  public createLayer(id: string, depth: number): Layer {
    const layer: Layer = new Layer(this._container, this._size);
    const layerConfigs: LayerConfig[] = this._layerConfigs.concat({
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

  public getLayer(id = 'root'): Layer {
    const layerConfig: LayerConfig | undefined = this._layerConfigs.find(
      (config: LayerConfig): boolean => {
        return config.id === id;
      },
    );

    if (layerConfig === undefined) {
      throw new Error(`Could not find layer with id "${id}"`);
    }

    return layerConfig.layer;
  }

  public render(time: Chronometer): HTMLDivElement {
    this._layerConfigs.forEach((layerConfig: LayerConfig): void => {
      layerConfig.layer.render(time);
    });

    return this._container;
  }
}
