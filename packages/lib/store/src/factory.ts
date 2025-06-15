import { Store } from './Store';
import type { StoreFactory } from './StoreFactory';

export const factory: StoreFactory = ((): StoreFactory => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: Store<any>;

  return <T extends object>(initial: T): Store<T> => {
    if (store === undefined) {
      store = new Store<T>(initial);
    }

    return store;
  };
})();
