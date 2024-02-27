import { Vector } from "../utils/types";
import { ObjectTypes } from "./objectTypes";

export type Entity = {
  _type: typeof ObjectTypes[keyof typeof ObjectTypes];
  x: number;
  y: number;
  setPosition: (x: number, y: number) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export type Square = Entity & {
  h: number;
  w: number;
};

export type Lightning = Entity & {
  segments: Vector[]
  toX: number;
  toY: number;
  redraw: () => void;
  setToPosition: (x: number, y: number) => void;
};
