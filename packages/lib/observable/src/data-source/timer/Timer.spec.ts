import type { DataSourceOptions } from '../DataSourceOptions';

import { Timer } from './Timer';

describe('Timer', (): void => {
  it('emits a given amount of values', (done: () => void): void => {
    const options: DataSourceOptions<number> = {
      onData(): void {
        // nothing
      },
      onComplete(): void {
        // nothing
      },
    };

    const onDataSpy = jest.spyOn(options, 'onData');
    const onCompleteSpy = jest.spyOn(options, 'onComplete');

    new Timer(options, 10, 10);

    window.setTimeout((): void => {
      expect(onDataSpy).toHaveBeenCalledTimes(10);
      expect(onCompleteSpy).toHaveBeenCalled();

      done();
    }, 150);
  });

  describe('destroy', (): void => {
    it('stops the source from emitting new values', (done: () => void): void => {
      const options: DataSourceOptions<number> = {
        onData(): void {
          // nothing
        },
        onComplete(): void {
          // nothing
        },
      };

      const onDataSpy = jest.spyOn(options, 'onData');
      const onCompleteSpy = jest.spyOn(options, 'onComplete');

      new Timer(options, 100, 100);

      window.setTimeout((): void => {
        expect(onDataSpy).toHaveBeenCalledTimes(2);
        expect(onCompleteSpy).not.toHaveBeenCalled();

        done();
      }, 250);
    });
  });
});
