import { gameOfLife } from './game-of-life/gameOfLife';
import '../style/global.css';

const container = document.querySelector<HTMLDivElement>('#app');

if (!container) {
  throw new Error('No container element found');
}

gameOfLife({
  container,
  config: {
    cell: {
      size: 5,
      border: 1,
    },
    colors: {
      grid: '#CCCCCC',
      alive: '#000000',
      dead: '#FFFFFF',
    },
  },
});
