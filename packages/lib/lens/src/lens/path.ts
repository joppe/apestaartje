/**
 * https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
 * https://stackoverflow.com/questions/49005179/typescript-infer-type-of-nested-keyof-properties
 * https://stackoverflow.com/questions/52417131/what-does-mean-in-typescript
 */

export function path<T extends Object>() {
  function inner<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
  >(p: [K1] | [K1, K2] | [K1, K2, K3] | [K1, K2, K3, K4]) {
    function loop(p, obj) {
      const prop: string = p[0];

      if (p.length === 1) {
        return obj[prop];
      }

      return loop(p.slice(1), obj[prop]);
    }

    return (
      target: T,
    ): T[K1] | T[K1][K2] | T[K1][K2][K3] | T[K1][K2][K3][K4] => {
      return loop(p, target);
    };
  }

  return inner;
}
