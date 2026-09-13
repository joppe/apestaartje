import { ChildElement } from '@apestaartje/dom/custom-element/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import type { Store } from '@apestaartje/store/Store';

import type { Data } from '../../store/Data';

import { container } from '../../dependency-injection/container';

@Component({
  selector: 'tetris-score',
  template: `<h3></h3>`,
})
export class Score extends HTMLElement {
  @ChildElement('h3')
  declare public _score: HTMLElement;

  private _store: Store<Data> | undefined;

  public connectedCallback(): void {
    if (this._store === undefined) {
      throw new Error('Store is undefined');
    }

    this._store = container.resolve<Store<Data>>('store');
    this._store.subscribe('score', this.updateScore.bind(this));
  }

  private updateScore(score: number | undefined): void {
    if (score === undefined) {
      return;
    }

    this._score.innerText = String(score);
  }
}
