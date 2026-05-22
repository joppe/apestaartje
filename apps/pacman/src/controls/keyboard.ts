export type KeyboardOptions = Record<string, () => void>;

export function keyboard(optons: KeyboardOptions): void {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (optons[event.code]) {
      optons[event.code]();
    } else {
      console.log(`Unknown key: ${event.code}`);
    }
  });
}
