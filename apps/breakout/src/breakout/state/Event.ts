export const EVENT = {
  Play: 'GAME_EVENT_PLAY',
  GameOver: 'GAME_EVENT_GAME_OVER',
  Restart: 'GAME_EVENT_RESTART',
} as const;

export type Event = (typeof EVENT)[keyof typeof EVENT];
