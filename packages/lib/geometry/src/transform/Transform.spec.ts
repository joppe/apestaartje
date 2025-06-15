import type { Point } from '../point/Point';

import { Transform } from './Transform';

describe('Transform', () => {
  it('initially return the same point', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 2, y: 0 };
    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBe(p.x);
    expect(pp.y).toBe(p.y);
  });

  it('scale', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 2, y: 3 };

    transform.scale(3, 6);

    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBe(6);
    expect(pp.y).toBe(18);
  });

  it('translate', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 2, y: 0 };

    transform.translate(3, -1);

    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBe(5);
    expect(pp.y).toBe(-1);
  });

  it('scale and translation', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 2, y: 1 };

    transform.scale(2, 0.5);
    transform.translate(6, 3);

    const pp: Point = transform.transformPoint(p);

    // The x after scale is 4, translate is 6 and with scale applied to it is 12
    expect(pp.x).toBe(16);
    expect(pp.y).toBe(2);
  });

  it('rescale', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 2, y: 1 };

    transform.scale(2, 0.5);
    transform.scale(2, 2);

    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBe(8);
    expect(pp.y).toBe(1);
  });

  it('retranslate', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 2, y: 1 };

    transform.translate(10, 10);
    transform.translate(15, 2);

    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBe(27);
    expect(pp.y).toBe(13);
  });

  it('rotate', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 1, y: 1 };

    transform.rotate(Math.PI);

    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBeCloseTo(-1);
    expect(pp.y).toBeCloseTo(-1);
  });

  it('rotate and scale', (): void => {
    const transform: Transform = new Transform();
    const p: Point = { x: 1, y: 1 };

    transform.rotate(Math.PI); // -1, -1
    transform.scale(10, 1); // -10, -1
    transform.rotate(Math.PI); // 10, 1
    transform.translate(3, 9); // 40, 10
    transform.rotate(Math.PI); // 20, 8

    const pp: Point = transform.transformPoint(p);

    expect(pp.x).toBeCloseTo(20);
    expect(pp.y).toBeCloseTo(8);
  });

  it('translate scale translate', (): void => {
    const transform: Transform = new Transform();
    const p1: Point = { x: 0, y: 0 };
    const p2: Point = { x: 50, y: 100 };
    const p3: Point = { x: 400, y: 400 };

    transform.translate(30, 30);
    transform.scale(1, -1);
    transform.translate(0, -400);

    const pp1: Point = transform.transformPoint(p1);
    expect(pp1.x).toBe(30);
    expect(pp1.y).toBe(430);

    const pp2: Point = transform.transformPoint(p2);
    expect(pp2.x).toBe(80);
    expect(pp2.y).toBe(330);

    const pp3: Point = transform.transformPoint(p3);
    expect(pp3.x).toBe(430);
    expect(pp3.y).toBe(30);
  });
});
