import { ChildElement } from '@apestaartje/dom/custom-element/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Store } from '@apestaartje/store/Store';

import { container } from '../../dependency-injection/container';
import { Data } from '../../store/Data';

@Component({
  selector: 'tetris-score',
  template: `<h3></h3>`,
})
export class Score extends HTMLElement {
  @ChildElement('h3')
  declare public _score: HTMLElement;

  private _store: Store<Data>;

  public connectedCallback(): void {
    this._store = container.resolve<Store<Data>>('store');
    this._store.subscribe('score', this.updateScore.bind(this));
  }

  private updateScore(score: number): void {
    this._score.innerText = String(score);
  }
}
