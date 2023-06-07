import { StoryFn } from '@storybook/html';

import { container } from '@apestaartje/2048/container/container';
import { Game } from '@apestaartje/2048/game/Game';
import { Grid } from '@apestaartje/2048/grid/Grid';
import { GridOptions } from '@apestaartje/2048/grid/GridOptions';
import { Direction } from '@apestaartje/2048/tiles/Direction';
import { Tiles } from '@apestaartje/2048/tiles/Tiles';

export default {
  title: '2048',
};

export const GameStory = () => {
  const game = new Game({ rows: 4, columns: 4 });

  return game.render();
};
GameStory.storyName = 'Game';

export const GridStory: StoryFn<GridOptions> = ({
  rows,
  columns,
}: GridOptions) => {
  const grid = new Grid({ rows, columns });

  return grid.render();
};
GridStory.args = {
  columns: 4,
  rows: 4,
};
GridStory.storyName = 'Grid';

type TileStoryOptions = {
  column: number;
};

export const TileStory = ((): StoryFn<TileStoryOptions> => {
  const rows = 1;
  const columns = 4;
  const grid = new Grid({ rows, columns });
  const tiles = new Tiles({ rows, columns });
  const tile = tiles.add(4, {
    row: 0,
    column: 0,
  });
  const el = container(grid, tiles);

  return ({ column }: TileStoryOptions) => {
    tile.move({ row: 0, column });

    return el;
  };
})();
TileStory.argTypes = {
  column: {
    control: {
      type: 'range',
      min: 0,
      max: 3,
      step: 1,
    },
  },
};
TileStory.args = {
  column: 2,
};
TileStory.storyName = 'Tile';

type TilesStoryOptions = {
  row: number;
  column: number;
  value: number;
};

export const TilesStory = ({ row, column, value }: TilesStoryOptions) => {
  const rows = 4;
  const columns = 4;
  const grid = new Grid({ rows, columns });
  const tiles = new Tiles({ rows, columns });

  tiles.add(value, {
    row,
    column,
  });

  return container(grid, tiles);
};
TilesStory.storyName = 'Tiles';
TilesStory.argTypes = {
  column: {
    control: {
      type: 'range',
      min: 0,
      max: 3,
      step: 1,
    },
  },
  row: {
    control: {
      type: 'range',
      min: 0,
      max: 3,
      step: 1,
    },
  },
  value: {
    control: 'select',
    options: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1048, 2048, 4096],
  },
};
TilesStory.args = {
  column: 2,
  row: 1,
  value: 2,
};

type MoveStoryOptions = {
  direction: 'up' | 'down' | 'right' | 'left';
};

export const MoveStory = ((): StoryFn<MoveStoryOptions> => {
  const rows = 4;
  const columns = 4;
  const grid = new Grid({ rows, columns });
  const tiles = new Tiles({ rows, columns });

  tiles.add(2, {
    row: 0,
    column: 0,
  });
  tiles.add(4, {
    row: 1,
    column: 0,
  });
  tiles.add(8, {
    row: 2,
    column: 0,
  });

  const el = container(grid, tiles);

  return ({ direction }: MoveStoryOptions) => {
    switch (direction) {
      case 'up':
        tiles.move(Direction.UP);
        break;
      case 'down':
        tiles.move(Direction.DOWN);
        break;
      case 'right':
        tiles.move(Direction.RIGHT);
        break;
      case 'left':
        tiles.move(Direction.LEFT);
        break;
    }

    return el;
  };
})();
MoveStory.storyName = 'Move';
MoveStory.argTypes = {
  direction: {
    control: 'select',
    options: ['up', 'down', 'right', 'left'],
  },
};

type MergeStoryOptions = {
  direction: 'up' | 'down' | 'right' | 'left';
};

export const MergeStory = ((): StoryFn<MergeStoryOptions> => {
  const rows = 4;
  const columns = 4;
  const grid = new Grid({ rows, columns });
  const tiles = new Tiles({ rows, columns });

  tiles.add(2, {
    row: 0,
    column: 0,
  });
  tiles.add(2, {
    row: 0,
    column: 2,
  });

  const el = container(grid, tiles);

  return ({ direction }: MergeStoryOptions) => {
    switch (direction) {
      case 'up':
        tiles.move(Direction.UP);
        break;
      case 'down':
        tiles.move(Direction.DOWN);
        break;
      case 'right':
        tiles.move(Direction.RIGHT);
        break;
      case 'left':
        tiles.move(Direction.LEFT);
        break;
    }

    return el;
  };
})();
MergeStory.storyName = 'Merge';
MergeStory.argTypes = {
  direction: {
    control: 'select',
    options: ['up', 'down', 'right', 'left'],
  },
};
