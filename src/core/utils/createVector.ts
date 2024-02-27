import { Vector } from "./types";

export const createVector = (x: number, y: number, z: number = 0): Vector => ({
  x,
  y,
  z,
});
