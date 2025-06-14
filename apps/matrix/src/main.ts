import './MatrixRain';

const root = document.body;

const matrix = document.createElement('matrix-rain');
matrix.setAttribute('width', '800');
matrix.setAttribute('height', '800');
matrix.setAttribute('blur-factor', '2');

root.appendChild(matrix);
