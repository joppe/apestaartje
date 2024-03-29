import { Container } from './Container';

/**
 * Factory function to create (and cache) dependencies.
 */

export const getContainer: () => Container = ((): (() => Container) => {
  let container: Container | undefined;

  return (): Container => {
    if (container === undefined) {
      container = new Container();
    }

    return container;
  };
})();
