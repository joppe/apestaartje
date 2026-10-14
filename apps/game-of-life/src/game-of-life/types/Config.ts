export type ColorConfig = {
  grid: string;
  dead: string;
  alive: string;
};

export type CellConfig = {
  size: number;
  border: number;
};

export type Config = {
  cell: CellConfig;
  colors: ColorConfig;
};
