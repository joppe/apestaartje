import { StoryFn } from '@storybook/html';

import { app } from '@apestaartje/sudoku/app';

export default {
  title: 'Sudoku',
};

type TemplateProps = {
  preset: number[];
};

const Template = ({ preset }: TemplateProps) => {
  const container = document.createElement('div');

  app({ container, preset });

  return container;
};

export const Default = Template.bind({});

export const EasySudoku: StoryFn<TemplateProps> = Template.bind({});
EasySudoku.storyName = 'Sudoku easy';
EasySudoku.args = {
  preset: [
    0, 3, 0, 0, 0, 5, 1, 6, 0, 0, 5, 7, 0, 0, 0, 0, 2, 8, 0, 0, 8, 4, 0, 0, 0,
    0, 0, 3, 0, 5, 0, 8, 2, 6, 9, 7, 2, 0, 6, 7, 0, 0, 0, 0, 0, 1, 0, 9, 6, 5,
    4, 0, 8, 3, 0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 4, 0, 8, 7, 0, 0, 0, 3,
    0, 1, 8, 0, 0, 0,
  ],
};
EasySudoku.argTypes = {
  preset: {
    table: {
      disable: true,
    },
  },
};

export const MediumSudoku: StoryFn<TemplateProps> = Template.bind({});
MediumSudoku.storyName = 'Sudoku medium';
MediumSudoku.args = {
  preset: [
    0, 0, 0, 2, 4, 8, 6, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 8, 0, 0, 0, 1, 6, 0, 7,
    0, 0, 6, 1, 0, 0, 7, 0, 2, 0, 5, 2, 0, 4, 8, 0, 1, 3, 0, 6, 5, 0, 9, 0, 2,
    0, 0, 7, 4, 0, 0, 2, 0, 9, 5, 0, 0, 0, 1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 5,
    6, 1, 2, 0, 0, 0,
  ],
};
MediumSudoku.argTypes = {
  preset: {
    table: {
      disable: true,
    },
  },
};

export const HardSudoku: StoryFn<TemplateProps> = Template.bind({});
HardSudoku.storyName = 'Sudoku hard';
HardSudoku.args = {
  preset: [
    0, 6, 4, 0, 0, 2, 0, 0, 8, 0, 0, 0, 0, 0, 6, 0, 3, 0, 0, 1, 0, 0, 0, 4, 0,
    5, 0, 0, 9, 0, 0, 0, 1, 2, 0, 0, 0, 4, 0, 5, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 6, 0, 3, 0, 0, 0, 0, 0, 0, 0, 8, 0, 7, 0, 0, 0, 9, 0, 9, 0, 0,
    1, 0, 0, 0, 0, 3,
  ],
};
HardSudoku.argTypes = {
  preset: {
    table: {
      disable: true,
    },
  },
};

export const ExpertSudoku: StoryFn<TemplateProps> = Template.bind({});
ExpertSudoku.storyName = 'Sudoku expert';
ExpertSudoku.args = {
  preset: [
    0, 0, 7, 0, 0, 0, 0, 0, 3, 1, 5, 9, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2,
    0, 7, 0, 0, 0, 2, 0, 0, 0, 4, 6, 0, 4, 0, 0, 0, 7, 0, 0, 0, 5, 0, 0, 8, 0,
    0, 0, 0, 0, 0, 8, 0, 0, 5, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 9, 1, 0, 7, 0,
  ],
};
ExpertSudoku.argTypes = {
  preset: {
    table: {
      disable: true,
    },
  },
};
