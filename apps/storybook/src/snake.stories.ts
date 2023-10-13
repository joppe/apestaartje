import { app } from '@apestaartje/snake/app';

export default {
  title: 'Snake',
};

export const SnakeStory = () => {
  const div = document.createElement('div');
  const template = `
11111111111111111111111111111111111111111111111
1                                             1
1                                             1
1                                             1
1                       c                     1
1                                             1
1                                             1
1                      S                      1
1                                             1
1                                             1
1                                             1
1                                             1
1                                             1
1                                             1
11111111111111111111111111111111111111111111111
`;
  app({
    template,
    wallChar: '1',
    snakeChar: 'S',
    foodChar: 'c',
    container: div,
    blockSize: 20,
  });

  return div;
};
SnakeStory.storyName = 'Snake';
