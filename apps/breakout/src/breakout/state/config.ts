import type { States } from '@apestaartje/finite-state-machine/state/States';

import { EVENT } from './Event';
import { STATE } from './State';

export const config: States = {
  initial: STATE.Land,
  states: {
    [STATE.Land]: {
      on: {
        [EVENT.Play]: STATE.Play,
      },
    },
    [STATE.Play]: {
      on: {
        [EVENT.GameOver]: STATE.GameOver,
      },
    },
    [STATE.GameOver]: {
      on: {
        [EVENT.Restart]: STATE.Land,
      },
    },
  },
};
