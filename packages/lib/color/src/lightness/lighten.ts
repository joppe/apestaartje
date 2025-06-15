import type { RGB } from '../rgb/RGB';

import { adjust } from './adjust';

export function lighten(color: RGB, percentage = 10): RGB {
  if (percentage < 0 || percentage > 100) {
    throw new Error(
      `Please use a percentage between 0-100, instead of "${percentage}"`,
    );
  }

  return adjust(color, percentage);
}
