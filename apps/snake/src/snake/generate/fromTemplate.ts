import { Candy } from '../candy/Candy';
import { Map } from '../map/Map';
import { Direction } from '../move/Direction';
import { Renderer } from '../render/Renderer';
import { Snake } from '../snake/Snake';

export type FromTemplateOptions = {
  renderer: Renderer;
  template: string;
  wallChar: string;
  snakeChar: string;
  foodChar: string;
};

export type FromTemplateResult = {
  map: Map;
  snake?: Snake;
  candy?: Candy;
};

export function fromTemplate({
  renderer,
  template,
  wallChar,
  snakeChar,
  foodChar,
}: FromTemplateOptions): FromTemplateResult {
  const lines = template.trim().split('\n');
  const rows = lines.length;
  const columns = lines[0].length;
  const result: FromTemplateResult = {
    map: new Map({ rows, columns, renderer }),
    snake: undefined,
    candy: undefined,
  };

  lines.forEach((row: string, rowIndex: number): void => {
    row.split('').forEach((char: string, columnIndex: number): void => {
      const position = { row: rowIndex, column: columnIndex };

      switch (char) {
        case foodChar:
          result.candy = new Candy({ renderer, position });
          break;
        case snakeChar:
          result.snake = new Snake({
            renderer,
            position,
            size: 3,
            direction: Direction.Left,
          });
          break;
        case wallChar:
          result.map.addWall(position);
          break;
      }
    });
  });

  return result;
}
