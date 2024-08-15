import { app } from '@apestaartje/pacman/app';

export default {
  title: 'Pacman',
};

export const PacmanStory = () => {
  const div = document.createElement('div');

  app({
    container: div,
  });

  document.body.style.backgroundColor = '#1e1e2e';

  return div;
};
PacmanStory.storyName = 'Pacman';
