import { RGB } from './RGB';
import { isValid } from './isValid';

function getPart(color: string, index: number, length: number): number {
  return parseInt(color.substr(index * length, length), 16);
}

export function fromString(color: string): RGB {
  const clean: string = color.replace(/^#/, '');

  if (clean.length !== 3 && clean.length !== 6) {
    throw new Error(`Could not create color from "${color}"`);
  }

  const length: number = clean.length === 3 ? 1 : 2;
  const rgb: RGB = {
    r: getPart(clean, 0, length),
    g: getPart(clean, 1, length),
    b: getPart(clean, 2, length),
  };

  if (!isValid(rgb)) {
    throw new Error(
      `Error creating RGB from "${color}" -> "${rgb.toString()}"`,
    );
  }

  return rgb;
}
