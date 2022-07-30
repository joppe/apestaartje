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

    it('frames will be measured over the past second', async (): Promise<void> => {
      const fps: FPS = new FPS();

      fps.tick();
      fps.tick();

      expect(fps.count()).toBe(2);

      await new Promise((resolve) => window.setTimeout(resolve, 1200));

      expect(fps.count()).toBe(0);
    });
  });
});
