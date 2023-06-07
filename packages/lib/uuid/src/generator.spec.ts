import { generator } from './generator';

describe('createGenerator', (): void => {
  it('Should never generate the same UUID', (): void => {
    const store: { [id: string]: boolean } = {};
    const uuidGenerator: () => string = generator();

    for (let i = 0; i < 50; i += 1) {
      const uuid: string = uuidGenerator();

      expect(store[uuid]).toBe(undefined);
      store[uuid] = true;
    }
  });
});
