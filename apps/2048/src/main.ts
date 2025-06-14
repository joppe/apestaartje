import { Game } from './game/Game';

const game = new Game({ rows: 4, columns: 4 });
const root = document.body;

root.appendChild(game.render());
