export type State = 'idle' | 'play' | 'draw' | 'erase' | 'reset' | 'blank';

export type Data = {
  state: State;
};
