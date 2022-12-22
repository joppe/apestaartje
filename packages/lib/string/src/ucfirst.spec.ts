import { ucfirst } from './ucfirst';

describe('ucfirst', (): void => {
  it('Makes the first char of a string uppercase', (): void => {
    expect(ucfirst('joppe')).toBe('Joppe');
    expect(ucfirst('a')).toBe('A');
    expect(ucfirst('')).toBe('');
    expect(ucfirst('2018')).toBe('2018');
    expect(ucfirst(' Hello')).toBe(' Hello');
    expect(ucfirst('Hello')).toBe('Hello');
  });
});
