import { createElement, Play } from 'lucide';

import { element } from '@apestaartje/element/element';
import type { Store } from '@apestaartje/store/Store';

import type { Data, State } from '../types/Data';

import styles from './button.module.css';

type PlayProps = {
  store: Store<Data>;
};

export function play({ store }: PlayProps): HTMLElement {
  const button = element([
    'button',
    { class: styles.button },
    [createElement(Play)],
  ]);

  button.addEventListener('click', () => {
    store.set('state', 'play');
  });

  store.subscribe('state', (state: State) => {
    if (state === 'play') {
      button.classList.add(styles.active);
    } else {
      button.classList.remove(styles.active);
    }
  });
  return button;
}
