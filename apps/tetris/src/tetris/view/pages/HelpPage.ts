import { Component } from '@apestaartje/dom/custom-element/component/Component';

import { Event } from '../../finite-state-machine/global/Event';
import '../component/NavigationLink';

@Component({
  selector: 'tetris-help-page',
  template: `
    <h1>HELP</h1>

    <p>
      Use <b>left</b> and <b>right</b> arrow keys to move tetromino
      horizontally. Use <b>S</b> to rotate clockwise and <b>A</b> to rotate
      counter clockwise.
    </p>

    <nav>
      <tetris-navigation-link
        event-name="${Event.Home}"
        title="Home"
      ></tetris-navigation-link>
      <tetris-navigation-link
        event-name="${Event.HighScore}"
        title="High Score"
      ></tetris-navigation-link>
    </nav>
  `,
})
export class HelpPage extends HTMLElement {}
