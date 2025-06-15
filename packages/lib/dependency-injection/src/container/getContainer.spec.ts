import type { Container } from './Container';
import { getContainer } from './getContainer';

describe('getContainer', (): void => {
  it('create only once a container', (): void => {
    const a: Container = getContainer();
    const b: Container = getContainer();

    expect(a).toBeDefined();
    expect(b).toBeDefined();
    expect(a).toBe(b);
  });
});
