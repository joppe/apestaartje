import { ChildElement } from '@apestaartje/dom/custom-element/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Input } from '@apestaartje/dom/custom-element/input/Input';
import { InputType } from '@apestaartje/dom/custom-element/input/InputType';
import type { Machine } from '@apestaartje/finite-state-machine/machine/Machine';
import { factory as stateFactory } from '@apestaartje/finite-state-machine/machine/factory';

import { Event as GameEvent } from '../../finite-state-machine/game/Event';
import { State as GameState } from '../../finite-state-machine/game/State';
import { config } from '../../finite-state-machine/game/config';
import '../component/CountDown';
import '../component/GameCanvas';
import '../component/GameOver';
import '../component/NavigationLink';
import '../component/Score';

@Component({
  selector: 'tetris-game-page',
  template: `
    <h1>Game</h1>

    <main>
      <tetris-count-down active="false"></tetris-count-down>
      <tetris-game-canvas active="false"></tetris-game-canvas>
    </main>

    <tetris-game-over active="false"></tetris-game-over>

    <aside>
      <tetris-preview></tetris-preview>
      <tetris-score></tetris-score>
    </aside>
  `,
})
export class GamePage extends HTMLElement {
  @Input({
    attribute: 'active',
    watch: true,
    type: InputType.Bool,
  })
  declare public active: boolean;

  @ChildElement('tetris-count-down')
  declare public countDown: HTMLElement;

  @ChildElement('tetris-game-over')
  declare public gameOver: HTMLElement;

  @ChildElement('tetris-game-canvas')
  declare public gameCanvas: HTMLElement;

  private _currentState: string = config.initial;
  private readonly _state: Machine;
  private _isConnected: boolean = false;

  public constructor() {
    super();

    this._state = stateFactory(config);

    window.addEventListener('count-down-finished', (): void => {
      this._currentState = this._state.transition(
        GameEvent.Play,
        this._currentState,
      );
      this.handleState();
    });

    window.addEventListener('game-over', (): void => {
      this._currentState = this._state.transition(
        GameEvent.GameOver,
        this._currentState,
      );
      this.handleState();
    });
  }

  public attributeChangedCallback(name: string): void {
    if (this._isConnected && name === 'active') {
      this.toggle();
    }
  }

  public connectedCallback(): void {
    this._isConnected = true;
    this.toggle();
  }

  private toggle(): void {
    if (this.active === true) {
      this._currentState = this._state.transition(
        GameEvent.CountDown,
        this._state.initial(),
      );
    } else {
      this._currentState = this._state.initial();
    }

    this.handleState();
  }

  private handleState(): void {
    switch (this._currentState) {
      case GameState.CountDown:
        this.gameOver.setAttribute('active', 'false');
        this.gameCanvas.setAttribute('active', 'false');
        this.countDown.setAttribute('active', 'true');
        break;
      case GameState.Play:
        this.gameOver.setAttribute('active', 'false');
        this.countDown.setAttribute('active', 'false');
        this.gameCanvas.setAttribute('active', 'true');
        break;
      case GameState.GameOver:
        this.gameCanvas.setAttribute('active', 'true');
        this.countDown.setAttribute('active', 'false');
        this.gameOver.setAttribute('active', 'true');
        break;
      default:
        this.gameCanvas.setAttribute('active', 'false');
        this.countDown.setAttribute('active', 'false');
        this.gameOver.setAttribute('active', 'false');
    }
  }
}
