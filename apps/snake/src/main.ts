import { app } from './app.js';

const root = document.body;
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
  container: root,
  blockSize: 20,
  colors: {
    wall: '#89b4fa',
    snake: '#f38ba8',
    candy: '#94e2d5',
    text: '#cdd6f4',
    background: '#1e1e2e',
  },
});

document.body.style.backgroundColor = '#1e1e2e';
