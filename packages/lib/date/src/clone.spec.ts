import { clone } from './clone';

describe('clone', (): void => {
  it('create a copy of a date', (): void => {
    const a = new Date(2002, 4, 8);
    const b = clone(a);

    expect(a.getTime()).toBe(b.getTime());
  });
});
