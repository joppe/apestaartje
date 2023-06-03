// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(threshhold: number, fn: Function): Function {
  let last: number | undefined;
  let timeout: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function invoke(now: number, args: any[]): void {
    last = now;

    fn.call(null, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]): void => {
    const now: number = Date.now();

    if (last !== undefined && last + threshhold > now) {
      window.clearTimeout(timeout);
      timeout = window.setTimeout((): void => {
        invoke(now, args);
      }, threshhold);
    } else {
      invoke(now, args);
    }
  };
}
