import * as wasm from '../wasm/index.js';

export function greet() {
  return wasm.greet();
}

greet();
