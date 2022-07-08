import '@apestaartje/matrix/MatrixRain';

export default {
  title: 'Matrix',
};

export const MatrixStory = ({
  width,
  height,
  blur,
}: {
  width: number;
  height: number;
  blur: number;
}) => {
  const div = document.createElement('div');

  div.innerHTML = `<matrix-rain width="${width}" height="${height}" blur-factor="${blur}"></matrix-rain>`;

  return div;
};
MatrixStory.storyName = 'Matrix';
MatrixStory.argTypes = {
  width: {
    control: {
      type: 'range',
      min: 400,
      max: 800,
      step: 10,
    },
  },
  height: {
    control: {
      type: 'range',
      min: 400,
      max: 800,
      step: 10,
    },
  },
  blur: {
    control: {
      type: 'range',
      min: 0,
      max: 10,
      step: 1,
    },
  },
};
MatrixStory.args = {
  width: 800,
  height: 800,
  blur: 2,
};
