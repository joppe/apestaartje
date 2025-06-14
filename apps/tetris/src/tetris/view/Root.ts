import { ChildElements } from '@apestaartje/dom/custom-element/child-element/ChildElements';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Machine } from '@apestaartje/finite-state-machine/machine/Machine';
import { factory as stateFactory } from '@apestaartje/finite-state-machine/machine/factory';
import { Store } from '@apestaartje/store/Store';

import { container } from '../dependency-injection/container';
import { State } from '../finite-state-machine/global/State';
import { config } from '../finite-state-machine/global/config';
import { Data } from '../store/Data';

import './component/PageContainer';
import './component/Preview';
import './pages/GamePage';
import './pages/HelpPage';
import './pages/HighScorePage';
import './pages/HomePage';

@Component({
  selector: 'tetris-root',
  template: `
    <div class="container">
      <tetris-page-container
        data-page="${State.Home}"
        active="${State.Home === config.initial}"
      >
        <tetris-home-page></tetris-home-page>
      </tetris-page-container>
      <tetris-page-container
        data-page="${State.Game}"
        active="${State.Game === config.initial}"
      >
        <tetris-game-page></tetris-game-page>
      </tetris-page-container>
      <tetris-page-container
        data-page="${State.Help}"
        active="${State.Help === config.initial}"
      >
        <tetris-help-page></tetris-help-page>
      </tetris-page-container>
      <tetris-page-container
        data-page="${State.HighScore}"
        active="${State.HighScore === config.initial}"
      >
        <tetris-high-score-page></tetris-high-score-page>
      </tetris-page-container>
    </div>
  `,
})
export class Root extends HTMLElement {
  @ChildElements('[data-page]')
  public pages: HTMLElement[];

  private _currentState: string = config.initial;
  private readonly _state: Machine;
  private readonly _store: Store<Data>;

  public constructor() {
    super();

    this._state = stateFactory(config);
    this._store = container.resolve<Store<Data>>('store');
  }

  public connectedCallback(): void {
    window.addEventListener(
      'state-change',
      (event: CustomEvent<string>): void => {
        this.handleStateChange(event.detail);
      },
    );
  }

  private handleStateChange(event: string): void {
    const state: string = this._state.transition(event, this._currentState);

    if (state === this._currentState) {
      return;
    }

    this._currentState = state;

    this.pages.forEach((page: HTMLElement): void => {
      if (page.getAttribute('data-page') === this._currentState) {
        page.setAttribute('active', 'true');
      } else {
        page.setAttribute('active', 'false');
      }
    });
  }
}
