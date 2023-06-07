export type Machine = {
  initial(): string;
  history(): string[];
  transition(event: string, current: string): string;
};
