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

import './EnterName';

const ACTIVE_CLASS: string = 'active';

@Component({
  selector: 'tetris-game-over',
  template: `
    <h3 class="c-game-over__title">GAME OVER</h3>

    <tetris-enter-name active="true"></tetris-enter-name>

    <nav>
      <tetris-navigation-link
        event-name="${GlobalEvent.Home}"
        title="Home"
      ></tetris-navigation-link>
      <tetris-navigation-link
        event-name="${GlobalEvent.HighScore}"
        title="High Score"
      ></tetris-navigation-link>
    </nav>
  `,
})
export class GameOver extends HTMLElement {
  @Input({
    attribute: 'active',
    watch: true,
    type: InputType.Bool,
  })
  declare public active: boolean;

  @ChildElement('tetris-enter-name')
  declare public enterName: HTMLElement;

  @ChildElement('nav')
  declare public nav: HTMLElement;

  @Output('state-change')
  declare public stateChange: EventEmitter<string>;

  private readonly _highScore: HighScore;
  private readonly _store: Store<Data>;

  public constructor() {
    super();

    this._highScore = container.resolve('high-score');
    this._store = container.resolve('store');
  }

  public attributeChangedCallback(name: string): void {
    if (name === 'active') {
      this.toggle();
    }
  }

  private toggle(): void {
    if (this.active) {
      const showEnterName: boolean = this._highScore.isTopScore(
        this._store.get('score'),
      );

      this.nav.style.display = showEnterName ? 'none' : 'block';
      this.enterName.setAttribute('active', String(showEnterName));
      this.classList.add(ACTIVE_CLASS);
    } else {
      this.classList.remove(ACTIVE_CLASS);
    }
  }
}
