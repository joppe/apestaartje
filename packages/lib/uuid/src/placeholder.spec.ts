import { placeholder } from './placeholder';

describe('placeholder', (): void => {
  it('Generate a placeholder string with the default config', (): void => {
    expect(placeholder([2, 4, 2], '*', '_')).toBe('**_****_**');
  });
});
