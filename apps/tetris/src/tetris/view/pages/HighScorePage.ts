import { ChildElement } from '@apestaartje/dom/custom-element/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Input } from '@apestaartje/dom/custom-element/input/Input';
import { InputType } from '@apestaartje/dom/custom-element/input/InputType';

import { container } from '../../dependency-injection/container';
import { Event } from '../../finite-state-machine/global/Event';
import { Entry } from '../../game/high-score/Entry';
import { HighScore } from '../../game/high-score/HighScore';
import '../component/NavigationLink';

@Component({
  selector: 'tetris-high-score-page',
  template: `
    <h1>High Score</h1>

    <table class="c-high-score-table"></table>

    <nav>
      <tetris-navigation-link
        event-name="${Event.Home}"
        title="Home"
      ></tetris-navigation-link>
    </nav>
  `,
})
export class HighScorePage extends HTMLElement {
  @Input({
    attribute: 'active',
    watch: true,
    type: InputType.Bool,
  })
  declare public active: boolean;

  @ChildElement('table')
  declare public table: HTMLOListElement;

  private readonly _highScore: HighScore;
  private _isConnected: boolean = false;

  constructor() {
    super();

    this._highScore = container.resolve<HighScore>('high-score');
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
    if (!this.active) {
      return;
    }

    this.table.innerHTML = '';

    this._highScore.getAll().forEach((entry: Entry): void => {
      const tr: HTMLElement = document.createElement('tr');

      tr.innerHTML = `
                    <td>${String(entry.score)}</td>
                    <td>${String(entry.name)}</td>
                `;

      this.table.append(tr);
    });
  }
}
