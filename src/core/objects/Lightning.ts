import { createVector } from "../utils";
import { Vector } from "../utils/types";
import { Lightning } from "./types";

function createLightningSegments(vector1: Vector, vector2: Vector): Vector[] {
  const segments = [vector1, vector2];
  const distance = Math.sqrt(
    Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2)
  );
  const dX = vector2.x - vector1.x;
  const dY = vector2.y - vector1.y;
  const minSegmentLength = distance * 0.1;
  const maxDeviation = distance / 10;
  const maxSegments = distance / minSegmentLength;
  const deviation = distance / maxSegments;

  for (let i = 0; i < maxSegments; i++) {
    const lastSegment = segments[segments.length - 1];
    const xVariance =
      (dX / maxSegments) * i + (Math.random() * maxDeviation - deviation / 2);

    let yVariance =
      (dY / maxSegments) * i + (Math.random() * maxDeviation - deviation / 2);

    if (i >= maxSegments - 2) {
      yVariance = Math.min(yVariance, vector2.y);
    }

    const newSegment = createVector(
      vector1.x + xVariance,
      vector1.y + yVariance,
      lastSegment.y + Math.random() * deviation - deviation / 2
    );
    segments.splice(segments.length - 1, 0, newSegment);
  }

  return segments;
}

export const createLightning = (
  x: number,
  y: number,
  toX: number,
  toY: number
) => {
  const segments = createLightningSegments(
    createVector(x, y),
    createVector(toX, toY)
  );

  const obj = {
    x,
    y,
    toX,
    toY,
    segments,
    _counter: 0,
    _frameLimit: 100,
    setPosition(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.redraw();
    },
    setToPosition(x: number, y: number) {
      this.toX = x;
      this.toY = y;
      this.redraw();
    },
    draw(ctx: CanvasRenderingContext2D) {
      // draw segments
      ctx.strokeStyle = "rgba(220, 220, 255, 1)";
      ctx.shadowColor = "white";
      ctx.shadowBlur = Math.random() * 100;
      ctx.lineWidth = (Math.random() * 7) | 1;

      ctx.beginPath();
      ctx.moveTo(x, y);
      this.segments.forEach((segment) => {
        ctx.lineTo(segment.x, segment.y);
      });
      ctx.stroke();

      // draw segments
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.shadowColor = "white";
      ctx.shadowBlur = Math.random() * 100;
      ctx.lineWidth = 100;
      ctx.beginPath();
      ctx.moveTo(x, y);
      this.segments.forEach((segment) => {
        ctx.lineTo(segment.x, segment.y);
      });

      // points
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.toX, this.toY, 5, 0, Math.PI * 2);
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // reset
      ctx.shadowBlur = 0;
    },
    redraw() {
      this.segments = createLightningSegments(
        createVector(this.x, this.y),
        createVector(this.toX, this.toY)
      );
    },
    handleCounter() {
      this._counter++;
      if (this._counter >= this._frameLimit) {
        this.redraw();
        this._counter = 0;
        this._frameLimit = Math.random() * 100;
      }
    },
    render(ctx: CanvasRenderingContext2D) {
      this.handleCounter();
      this.draw(ctx);
    },
  };

  return obj as unknown as Lightning;
};
