import { FPS } from './FPS';

describe('FPS', (): void => {
  it('constructor', (): void => {
    const fps: FPS = new FPS();

    expect(fps).toBeDefined();
    expect(fps.count()).toBe(0);
  });

  describe('tick', (): void => {
    it('increment the frame property', (): void => {
      const fps: FPS = new FPS();

      fps.tick();
      fps.tick();

      expect(fps.count()).toBe(2);
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    it('frames will be measured over the past second', (done: Function): void => {
      const fps: FPS = new FPS();

      fps.tick();
      fps.tick();

      expect(fps.count()).toBe(2);

      window.setTimeout((): void => {
        expect(fps.count()).toBe(0);
        done();
      }, 1200);
    });
  });
});
