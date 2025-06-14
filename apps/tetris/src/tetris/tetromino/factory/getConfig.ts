import { Type } from '../Type';

const CONFIG: { [type: string]: number } = {
  [Type.I]: 0x00f0,
  [Type.O]: 0xcc00,
  [Type.T]: 0x0e40,
  [Type.L]: 0x0e80,
  [Type.S]: 0x06c0,
  [Type.J]: 0x0e20,
  [Type.Z]: 0x0c60,
};

export function getConfig(type: Type): number {
  const config: number | undefined = CONFIG[type];

  if (config === undefined) {
    throw new Error(`Type not supported "${type}`);
  }

  return config;
}
