import { Component } from '@apestaartje/dom/custom-element/component/Component';

import { Event } from '../../finite-state-machine/global/Event';
import '../component/NavigationLink';

@Component({
  selector: 'tetris-home-page',
  template: `
    <h1>TETЯIS</h1>

    <p>This is just an experiment :)</p>

    <nav>
      <tetris-navigation-link
        event-name="${Event.Game}"
        title="Start"
      ></tetris-navigation-link>
      <tetris-navigation-link
        event-name="${Event.Help}"
        title="Help"
      ></tetris-navigation-link>
      <tetris-navigation-link
        event-name="${Event.HighScore}"
        title="High Score"
      ></tetris-navigation-link>
    </nav>
  `,
})
export class HomePage extends HTMLElement {}
