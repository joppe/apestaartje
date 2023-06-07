import { generate } from './generate';

describe('generate', (): void => {
  it('Create a string following the rules for UUID', (): void => {
    const uuid: string = generate('........-....-....-....-............', '.');

    expect(uuid.length).toBe(36);
    expect(
      /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/.test(uuid),
    ).toBe(true);
  });
});
