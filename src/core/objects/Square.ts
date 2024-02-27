import { ObjectTypes } from "./objectTypes";
import { Square } from "./types";

export const createSquare = (
  x: number,
  y: number,
  w: number,
  h: number
): Square => ({
  _type: ObjectTypes.Square,
  x,
  y,
  w,
  h,
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  },
  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f09933";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
});
