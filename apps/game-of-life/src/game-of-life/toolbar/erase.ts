import { createElement, Eraser } from 'lucide';

import { element } from '@apestaartje/element/element';
import type { Store } from '@apestaartje/store/Store';

import type { Data, State } from '../types/Data';

import styles from './button.module.css';

type EraseProps = {
  store: Store<Data>;
};

export function erase({ store }: EraseProps): HTMLElement {
  const button = element([
    'button',
    { class: styles.button },
    [createElement(Eraser)],
  ]);

  button.addEventListener('click', () => {
    store.set('state', 'erase');
  });

  store.subscribe('state', (state: State) => {
    if (state === 'erase') {
      button.classList.add(styles.active);
    } else {
      button.classList.remove(styles.active);
    }
  });

  return button;
}
