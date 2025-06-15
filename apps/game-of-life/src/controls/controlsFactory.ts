import type { FactoryFunction } from '@apestaartje/types/FactoryFunction';

import type { ControlsFactoryOptions } from './ControlsFactoryOptions';

export const controlsFactory: FactoryFunction<void, ControlsFactoryOptions> = (
  options: ControlsFactoryOptions,
): void => {
  let interval: number;
  let delay = options.delay;

  function run(): void {
    window.clearInterval(interval);

    interval = window.setInterval((): void => {
      options.api.redraw();
    }, delay);
  }

  const wrapper: HTMLDivElement = document.createElement('div');
  options.container.appendChild(wrapper);

  const next: HTMLButtonElement = document.createElement('button');
  next.innerText = 'next';
  wrapper.appendChild(next);
  next.addEventListener('click', (): void => {
    window.clearInterval(interval);

    options.api.redraw();
  });

  const speed: HTMLInputElement = document.createElement('input');
  speed.setAttribute('type', 'range');
  speed.setAttribute('min', '20');
  speed.setAttribute('step', '10');
  speed.setAttribute('max', '1000');

  speed.value = String(options.delay);

  wrapper.appendChild(speed);
  speed.addEventListener('change', (): void => {
    delay = parseInt(<string>speed.value, 10);

    run();
  });

  const reset: HTMLButtonElement = document.createElement('button');
  reset.innerText = 'reset';
  wrapper.appendChild(reset);
  reset.addEventListener('click', (): void => {
    window.clearInterval(interval);

    options.api.reset();
  });

  const auto: HTMLButtonElement = document.createElement('button');
  auto.innerText = 'auto';
  wrapper.appendChild(auto);
  auto.addEventListener('click', run);

  options.container.addEventListener('click', (event: MouseEvent): void => {
    options.api.addCell(event.clientX, event.clientY);
  });
};
