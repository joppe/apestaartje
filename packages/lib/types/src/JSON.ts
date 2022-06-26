export type JSON =
  | string
  | number
  | boolean
  | null
  | { [property: string]: JSON }
  | JSON[];
