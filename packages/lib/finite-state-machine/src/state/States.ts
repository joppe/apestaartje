import { State } from './State';

export type States = {
  initial: string;
  states: { [state: string]: State };
};
