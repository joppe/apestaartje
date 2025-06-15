import { Canvas } from '@apestaartje/dom/canvas/Canvas';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import type { Vector } from '@apestaartje/geometry/vector/Vector';
import type { Store } from '@apestaartje/store/Store';

import { container } from '../../dependency-injection/container';
import type { BlockConfig } from '../../store/BlockConfig';
import type { Data } from '../../store/Data';
import type { TetrominoData } from '../../tetromino/TetrominoData';
import { crop } from '../../tetromino/crop';
import { block as renderBlock } from '../canvas/block';
import { getColor } from '../tetromino/getColor';

@Component({
  selector: 'tetris-preview',
  template: ` <h2>Next</h2> `,
})
export class Preview extends HTMLElement {
  private _canvas: Canvas;
  private _store: Store<Data>;

  public connectedCallback(): void {
    this._store = container.resolve<Store<Data>>('store');

    this.addCanvas();
    this.subscribe();
  }

  private renderTetromino(preview: TetrominoData | undefined): void {
    this._canvas.clear();

    if (preview === undefined) {
      return;
    }

    const color: string = getColor(preview.type);
    const blockConfig: BlockConfig = this._store.get('block');
    const size: number = blockConfig.size;

    crop(preview.blocks).forEach((block: Vector): void => {
      renderBlock(
        this._canvas.context,
        { x: block.x * size, y: block.y * size },
        { width: size, height: size },
        color,
        blockConfig.line,
      );
    });
  }

  private addCanvas(): void {
    const blockConfig: BlockConfig = this._store.get('block');

    this._canvas = new Canvas({
      width: blockConfig.size * 5,
      height: blockConfig.size * 5,
    });
    this._canvas.appendTo(<HTMLElement>this);
  }

  private subscribe(): void {
    this._store.subscribe('next', this.renderTetromino.bind(this));
  }
}
