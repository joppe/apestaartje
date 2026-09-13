import { Stage } from '@apestaartje/animation/stage/Stage';
import { factory as stateFactory } from '@apestaartje/finite-state-machine/machine/factory';

import type { Action } from './control/Action';

import { keyboard } from './control/keyboard';
import { GameOver } from './game-over/GameOver';
import { Game } from './game/Game';
import { Score } from './score/Score';
import { Start } from './start/Start';
import { config } from './state/config';
import { type Event, EVENT } from './state/Event';
import { STATE } from './state/State';

type AppOptions = {
  width: number;
  height: number;
  wallOffset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  wallSize: number;
  container: HTMLElement;
};

export function app({
  container,
  width,
  height,
  wallOffset,
  wallSize,
}: AppOptions) {
  const stage = new Stage({
    width,
    height,
  });
  const controls = keyboard();
  const stateHandler = stateFactory(config);
  const background = stage.createLayer('background', 10);
  const texts = stage.createLayer('background', 10);
  const score = new Score({ position: { x: wallOffset.left, y: 30 } });
  const start = new Start({ position: { x: width / 2 - 200, y: height / 2 } });
  const gameOver = new GameOver({
    position: { x: width / 2 - 200, y: height / 2 },
  });

  texts.addAsset(score, 'score', 100);
  texts.addAsset(start, 'start', 200);
  texts.addAsset(gameOver, 'game-over', 300);

  const game = new Game({
    stage,
    width,
    height,
    wallOffset,
    wallSize,
  });

  game.score.subscribe({
    next: (points: number) => {
      score.update(points);
    },
  });
  game.gameOver.subscribe({
    next: () => {
      handleState(EVENT.GameOver);
    },
  });

  background.freeze(true);
  stage.render();
  stage.element.style.backgroundColor = '#000000';

  const handleState = (() => {
    let state = stateHandler.initial();

    return function (event: Event): void {
      const oldState = state;
      const newState = stateHandler.transition(event, state);

      if (oldState === newState) {
        return;
      }

      state = newState;

      switch (state) {
        case STATE.Play:
          start.hide();
          gameOver.hide();
          game.start();
          break;
        case STATE.Land:
          start.show();
          gameOver.hide();
          game.stop();
          break;
        case STATE.GameOver:
          start.hide();
          gameOver.show();
          game.stop();
          break;
      }

      stage.render();
    };
  })();

  controls.subscribe({
    next: (action: Action): void => {
      switch (action) {
        case 'start':
          handleState(EVENT.Play);
          break;
        case 'reset':
          handleState(EVENT.Restart);
          break;
      }
    },
  });

  container.appendChild(stage.element);
}
