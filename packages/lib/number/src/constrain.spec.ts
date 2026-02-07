import { constrain } from './constrain';

describe('constrain', (): void => {
  it('constrains a value within a given range', (): void => {
    expect(constrain({ value: 5, min: 0, max: 10 })).toBe(5);
    expect(constrain({ value: -5, min: 0, max: 10 })).toBe(0);
    expect(constrain({ value: 15, min: 0, max: 10 })).toBe(10);
    expect(constrain({ value: 0, min: 0, max: 10 })).toBe(0);
    expect(constrain({ value: 10, min: 0, max: 10 })).toBe(10);
  });
});
