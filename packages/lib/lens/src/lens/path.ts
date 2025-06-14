export type Path<Obj extends object> = {
  [Key in keyof Obj & string]: Obj[Key] extends object
    ? `${Key}` | `${Key}.${Path<Obj[Key]>}`
    : `${Key}`;
}[keyof Obj & string];

export type PathArray<Obj> = {
  [Key in keyof Obj & string]: Obj[Key] extends object
    ? [`${Key}`] | [`${Key}`, ...PathArray<Obj[Key]>]
    : [`${Key}`];
}[keyof Obj & string];

export type PathArrayValue<Obj, Path extends PathArray<Obj>> = Path extends [
  infer Key,
  ...infer Rest,
]
  ? Key extends keyof Obj
    ? Rest extends PathArray<Obj[Key]>
      ? Obj[Key] extends object
        ? PathArrayValue<Obj[Key], Rest>
        : never
      : Obj[Key]
    : never
  : never;

const address = {
  street: {
    name: 'Fake St',
    number: {
      digits: 123,
      addition: 'b',
    },
  },
  city: 'Nowhere',
  state: 'NY',
  zip: '12345',
};

export function path<Obj>(path: PathArray<Obj>) {
  return (target: Obj): PathArrayValue<Obj, PathArray<Obj>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (path as string[]).reduce((acc: any, key: string): any => {
      return acc[key];
    }, target);
  };
}

const streetName = path<typeof address>(['street', 'name'])(address);

console.log(streetName);
