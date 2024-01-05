import { range } from '@apestaartje/iterator/range/range';

export type Input = {
  values(): number[];
};

export function createInput(root: HTMLElement, preset?: number[]): Input {
  const container = document.createElement('div');
  container.classList.add('input');

  for (const index of range(0, 80)) {
    const input = document.createElement('input');

    input.type = 'number';
    input.min = '1';
    input.max = '9';
    input.name = `cell-${index}`;
    input.dataset.index = index.toString();

    if (preset && preset[index] !== 0) {
      input.value = preset[index].toString();
    }

    container.appendChild(input);
  }

  root.appendChild(container);

  return {
    values(): number[] {
      const inputs = Array.from(container.querySelectorAll('input'));
      const values = [];

      for (const input of inputs) {
        const value = parseInt(input.value, 10);

        if (Number.isNaN(value)) {
          values.push(0);
        } else {
          values.push(value);
        }
      }

      return values;
    },
  };
}
