import { Candy } from '../candy/Candy';
import { Map } from '../map/Map';
import { Direction } from '../move/Direction';
import { Renderer } from '../render/Renderer';
import { Score } from '../score/Score';
import { Snake } from '../snake/Snake';
import { Status } from '../status/Status';

export type FromTemplateOptions = {
  renderer: Renderer;
  template: string;
  wallChar: string;
  snakeChar: string;
  foodChar: string;
  scoreChar: string;
  statusChar: string;
};

export type FromTemplateResult = {
  map: Map;
  snake?: Snake;
  candy?: Candy;
  score?: Score;
  status?: Status;
};

export function fromTemplate({
  renderer,
  template,
  wallChar,
  snakeChar,
  foodChar,
  scoreChar,
  statusChar,
}: FromTemplateOptions): FromTemplateResult {
  const lines = template.trim().split('\n');
  const rows = lines.length;
  const columns = lines[0].length;
  const result: FromTemplateResult = {
    map: new Map({ rows, columns, renderer }),
    snake: undefined,
    candy: undefined,
    score: undefined,
    status: undefined,
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
        case scoreChar:
          result.score = new Score({ renderer, position });
          break;
        case statusChar:
          result.status = new Status({ renderer, position });
          break;
      }
    });
  });

  return result;
}
