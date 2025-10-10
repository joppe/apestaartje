import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';
import type { Vector } from '@apestaartje/geometry/vector/Vector';
import { add } from '@apestaartje/geometry/vector/add';

import { hitWall } from './collision-detection/hitWall';
import { keyboard } from './controls/keyboard';
import { loadFromTemplate } from './helpers/loadFromTemplate';
import { Maze } from './maze/Maze';
import { MazeRenderer } from './maze/MazeRenderer';
import { Pacman } from './pacman/Pacman';
import { PacmanRenderer } from './pacman/PacmanRenderer';
import { getPacmanPositionFromGrid } from './pacman/getPacmanPositionFromGrid';

const unitSize = 10;
const stepsPerUnit = 5;
const template = `****************************
*C...........**............*
*.****.*****.**.*****.****.*
*.****.*****.**.*****.****.*
*.****.*****.**.*****.****.*
*..........................*
*.****.**.********.**.****.*
*.****.**.********.**.****.*
*......**....**....**......*
******.***** ** *****.******
     *.***** ** *****.*     
     *.**          **.*     
     *.** ******** **.*     
******.** *      * **.******
      .   *      *   .      
******.** *      * **.******
     *.** ******** **.*     
     *.**          **.*     
     *.** ******** **.*     
******.** ******** **.******
*............**............*
*.****.*****.**.*****.****.*
*.****.*****.**.*****.****.*
*...**................**...*
***.**.** ********.**.**.***
***.**.** ********.**.**.***
*......**....**....**......*
*.**********.**.**********.*
*.**********.**.**********.*
*..........................*
****************************`;

type AppOptions = {
  container: HTMLElement;
};

export function app({ container }: AppOptions) {
  const grid = loadFromTemplate(template);
  const maze = new Maze({ grid, wallChar: '*' });
  const pacman = new Pacman({
    position: getPacmanPositionFromGrid({
      grid,
      pacmanChar: 'C',
      stepsPerUnit,
    }),
    direction: { x: 1, y: 0 },
  });
  const stage = new Stage({
    width: unitSize * grid.columns,
    height: unitSize * grid.rows,
  });
  const background = stage.createLayer('background', 10);
  const foreground = stage.createLayer('foreground', 20);

  background.freeze(true);
  background.addAsset(
    new MazeRenderer({ maze, unitSize, color: 'blue' }),
    'maze',
    10,
  );

  foreground.addAsset(
    new PacmanRenderer({ pacman, unitSize, stepsPerUnit }),
    'pacman',
    10,
  );

  function movePacman(direction: Vector): void {
    if (
      !hitWall({
        maze,
        position: add(pacman.position, direction),
        stepsPerUnit,
      })
    ) {
      pacman.direction = direction;
    }
  }

  keyboard({
    ArrowUp: (): void => {
      movePacman({ x: 0, y: -1 });
    },
    ArrowRight: (): void => {
      movePacman({ x: 1, y: 0 });
    },
    ArrowDown: (): void => {
      movePacman({ x: 0, y: 1 });
    },
    ArrowLeft: (): void => {
      movePacman({ x: -1, y: 0 });
    },
  });

  const animator = new Animator((time: Chronometer): boolean => {
    stage.tick(time);

    if (
      hitWall({
        maze,
        position: pacman.position,
        stepsPerUnit,
      })
    ) {
      pacman.revert();
    }

    stage.render();

    return true;
  });

  container.appendChild(stage.element);

  animator.start();

  /*/
  setTimeout(() => {
    for (let i = 0; i < 20; i += 1) {
      stage.tick({
        start: 0,
        current: 0,
        offset: 0,
        elapsed: 0,
      });
      console.log(
        i,
        {
          column:
            pacman.origin.x + Math.floor(pacman.position.x / stepsPerUnit),
          row: pacman.origin.y + Math.floor(pacman.position.y / stepsPerUnit),
        },
        pacman.position.x,
      );
      stage.render();
    }
  }, 1000);
  /**/
}
