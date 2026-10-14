import { createElement, Pencil } from 'lucide';

import { element } from '@apestaartje/element/element';
import type { Store } from '@apestaartje/store/Store';

import type { Data, State } from '../types/Data';

import styles from './button.module.css';

type PencilProps = {
  store: Store<Data>;
};

export function pencil({ store }: PencilProps): HTMLElement {
  const button = element([
    'button',
    { class: styles.button },
    [createElement(Pencil)],
  ]);

  button.addEventListener('click', () => {
    store.set('state', 'draw');
  });

  store.subscribe('state', (state: State) => {
    if (state === 'draw') {
      button.classList.add(styles.active);
    } else {
      button.classList.remove(styles.active);
    }
  });

  return button;
}
