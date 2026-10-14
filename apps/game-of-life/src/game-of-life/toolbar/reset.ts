import { createElement, RotateCcw } from 'lucide';

import { element } from '@apestaartje/element/element';
import type { Store } from '@apestaartje/store/Store';

import type { Data } from '../types/Data';

import styles from './button.module.css';

type ResetProps = {
  store: Store<Data>;
};

export function reset({ store }: ResetProps): HTMLElement {
  const button = element([
    'button',
    { class: styles.button },
    [createElement(RotateCcw)],
  ]);

  button.addEventListener('click', () => {
    store.set('state', 'reset');
  });

  return button;
}
