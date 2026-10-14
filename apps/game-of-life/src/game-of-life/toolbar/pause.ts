import { createElement, Pause } from 'lucide';

import { element } from '@apestaartje/element/element';
import type { Store } from '@apestaartje/store/Store';

import type { Data, State } from '../types/Data';

import styles from './button.module.css';

type PauseProps = {
  store: Store<Data>;
};

export function pause({ store }: PauseProps): HTMLElement {
  const button = element([
    'button',
    { class: styles.button },
    [createElement(Pause)],
  ]);

  button.addEventListener('click', () => {
    store.set('state', 'idle');
  });

  store.subscribe('state', (state: State) => {
    if (state === 'idle') {
      button.classList.add(styles.active);
    } else {
      button.classList.remove(styles.active);
    }
  });

  return button;
}
