import { element } from '@apestaartje/element/element';
import type { Store } from '@apestaartje/store/Store';

import type { Data } from '../types/Data';

import { blank } from './blank';
import { erase } from './erase';
import { pause } from './pause';
import { pencil } from './pen';
import { play } from './play';
import { reset } from './reset';
import styles from './toolbar.module.css';

type ToolbarProps = {
  store: Store<Data>;
};

export function toolbar({ store }: ToolbarProps): HTMLElement {
  const toolbar = element([
    'div',
    { class: styles.toolbar },
    [
      play({ store }),
      pause({ store }),
      pencil({ store }),
      erase({ store }),
      blank({ store }),
      reset({ store }),
    ],
  ]);

  return toolbar;
}
