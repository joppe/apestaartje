export const ACTION = {
  Left: 'left',
  Right: 'right',
} as const;

export type Action = (typeof ACTION)[keyof typeof ACTION];
