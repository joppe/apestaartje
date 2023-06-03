import { args } from './args';

describe('function args', (): void => {
  it('return an array with all argument names', (): void => {
    expect(
      args(function foo(one: number, two: number): number {
        return one + two;
      }),
    ).toEqual(['one', 'two']);
  });

  it('return an empty array when there are no arguments', (): void => {
    expect(
      args(() => {
        return '?';
      }),
    ).toEqual([]);
  });

  describe('function definitions', (): void => {
    it('with name', (): void => {
      expect(
        args(function foobar21(one: number, bar: number): number {
          return one + bar;
        }),
      ).toEqual(['one', 'bar']);
    });

    it('without name', (): void => {
      expect(
        args(function (one: number, bar: number): number {
          return one + bar;
        }),
      ).toEqual(['one', 'bar']);
    });
  });

  describe('fat arrow definitions', (): void => {
    it('with parenthesis', (): void => {
      expect(
        args((one: number, bar: number): number => {
          return one + bar;
        }),
      ).toEqual(['one', 'bar']);
    });

    it('without parenthesis', (): void => {
      expect(
        args((one: string): string => {
          return one + 'foo';
        }),
      ).toEqual(['one']);
    });
  });

  describe('constructor', (): void => {
    it('return an array with all argument names', (): void => {
      expect(
        args(
          class Foo {
            a: number;
            b: string;
            c: boolean;

            constructor(a: number, b: string, c: boolean) {
              this.a = a;
              this.b = b;
              this.c = c;
            }
          },
        ),
      ).toEqual(['a', 'b', 'c']);
    });

    it('return an empty array when there are no arguments', (): void => {
      expect(
        args(
          class Foo {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            constructor() {}
          },
        ),
      ).toEqual([]);
    });

    it('return an empty array when there is no constructor', (): void => {
      expect(args(class Foo {})).toEqual([]);
    });
  });
});
