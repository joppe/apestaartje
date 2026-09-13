export const ACTION = {
  Start: 'start',
  Reset: 'reset',
} as const;

export type Action = (typeof ACTION)[keyof typeof ACTION];
