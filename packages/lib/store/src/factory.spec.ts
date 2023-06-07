import { Store } from './Store';
import { factory } from './factory';

type Data = {
  prop: string;
};

describe('factory', (): void => {
  it('returns always the same store', (): void => {
    const s1: Store<Data> = factory({ prop: '1' });
    const s2: Store<Data> = factory({ prop: '2' });

    expect(s1.get('prop')).toBe('1');
    expect(s1).toBe(s2);
  });
});
