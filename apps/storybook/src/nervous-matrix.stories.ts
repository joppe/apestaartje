import { app } from '@apestaartje/nervous-matrix/app';

export default {
  title: 'Nervous matrix',
};

export const NervousMatrixStory = () => {
  const div = document.createElement('div');

  app(div);

  return div;
};
NervousMatrixStory.storyName = 'Nervous matrix';
