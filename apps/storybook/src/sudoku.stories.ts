import { app } from '@apestaartje/sudoku/app';

export default {
  title: 'Sudoku',
};

export const SudokuStory = () => {
  const div = document.createElement('div');

  app({ container: div });

  return div;
};
SudokuStory.storyName = 'Sudoku';
