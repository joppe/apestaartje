import type { Grid } from '../grid/Grid';

export type Generator = (factory: () => Grid) => Grid;
