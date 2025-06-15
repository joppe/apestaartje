import { ChildElement } from '@apestaartje/dom/custom-element/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Input } from '@apestaartje/dom/custom-element/input/Input';
import { InputType } from '@apestaartje/dom/custom-element/input/InputType';
import { EventEmitter } from '@apestaartje/dom/custom-element/output/EventEmitter';
import { Output } from '@apestaartje/dom/custom-element/output/Output';
import { Store } from '@apestaartje/store/Store';

import { container } from '../../dependency-injection/container';
import { Event as GlobalEvent } from '../../finite-state-machine/global/Event';
import { HighScore } from '../../game/high-score/HighScore';
import { Data } from '../../store/Data';

@Component({
  selector: 'tetris-enter-name',
  template: `
    <div class="c-enter-name">
      <h2>Please enter name</h2>
      <p>You reached the highscore with <b></b>!</p>
      <input maxlength="10" type="text" />
      <button type="button" disabled>Go</button>
      <p><em>Min. 3 characters and max. 10 characters.</em></p>
    </div>
  `,
})
export class EnterName extends HTMLElement {
  @Input({
    attribute: 'active',
    watch: true,
    type: InputType.Bool,
  })
  declare public active: boolean;

  @ChildElement('input')
  declare public name: HTMLInputElement;

  @ChildElement('button')
  declare public button: HTMLButtonElement;

  @ChildElement('b')
  declare public points: HTMLElement;

  @Output('state-change')
  declare public stateChange: EventEmitter<string>;

  private readonly _highScore: HighScore;
  private readonly _store: Store<Data>;
  private _isConnected: boolean = false;

  public constructor() {
    super();

    this._highScore = container.resolve('high-score');
    this._store = container.resolve('store');
  }

  public connectedCallback(): void {
    this._isConnected = true;

    this.name.addEventListener('keyup', (): void => {
      const name: string = this.name.value.trim();

      this.button.disabled = name.length < 3 || name.length > 10;
    });

    this.button.addEventListener('click', (): void => {
      this._highScore.addScore(
        <number>this._store.get('score'),
        this.name.value,
      );

      this.stateChange.emit(GlobalEvent.HighScore);
    });
  }

  public attributeChangedCallback(name: string): void {
    if (!this._isConnected) {
      return;
    }

    if (name === 'active') {
      this.toggle();
    }
  }

  private toggle(): void {
    if (this.active) {
      this.show();
    } else {
      this.hide();
    }
  }

  private show(): void {
    this.points.innerText = String(this._store.get('score'));
    this.style.display = 'block';
  }

  private hide(): void {
    this.style.display = 'none';
  }
}
