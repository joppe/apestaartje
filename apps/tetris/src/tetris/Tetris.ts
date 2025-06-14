import { Store } from '@apestaartje/store/Store';
import { factory } from '@apestaartje/store/factory';

import { keyboard } from './control/keyboard';
import { container } from './dependency-injection/container';
import { Engine } from './game/Engine';
import { HighScore } from './game/high-score/HighScore';
import { Local } from './storage/Local';
import { Storage } from './storage/Storage';
import { Data } from './store/Data';
import { initial } from './store/initial';
import './view/Root';

export class Tetris {
  public constructor() {
    container.register('storage', (): Storage => {
      return new Local();
    });
    container.register('store', (): Store<Data> => {
      return factory(initial);
    });
    container.register('engine', (store: Store<Data>): Engine => {
      return new Engine(store.get('size'), keyboard());
    });
    container.register('high-score', (): HighScore => {
      return new HighScore(10);
    });
  }

  public render(root: HTMLElement): void {
    root.appendChild(document.createElement('tetris-root'));
  }
}
