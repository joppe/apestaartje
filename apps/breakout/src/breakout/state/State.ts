export const STATE = {
  Land: 'GAME_LAND',
  Play: 'GAME_PLAY',
  GameOver: 'GAME_OVER',
} as const;

export type State = (typeof STATE)[keyof typeof STATE];
