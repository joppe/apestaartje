import { States } from '@apestaartje/finite-state-machine/state/States';

import { Event } from './Event';
import { State } from './State';

export const config: States = {
  initial: State.Land,
  states: {
    [State.Land]: {
      on: {
        [Event.CountDown]: State.CountDown,
      },
    },
    [State.CountDown]: {
      on: {
        [Event.Play]: State.Play,
        [Event.Reset]: State.Land,
      },
    },
    [State.Play]: {
      on: {
        [Event.GameOver]: State.GameOver,
        [Event.Reset]: State.Land,
      },
    },
    [State.GameOver]: {
      on: {
        [Event.Restart]: State.Land,
        [Event.Reset]: State.Land,
      },
    },
  },
};
