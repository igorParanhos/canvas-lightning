import { animateLerp } from './utils/lerp';
import { createLoop } from './utils/createLoop';
import {
  clearCanvas,
  getMousePositionOnCanvas,
} from './utils';

import {
  createLightning,
  createSquare,
} from './objects';

import {
  Lightning,
  Entity,
} from './objects/types';

export class Controller {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #_clearLoop: () => void = () => null;
  #objects: Entity[] = [];
  #_mousePressed = false;

  get width() {
    return this.#canvas.clientWidth;
  }

  get height() {
    return this.#canvas.clientWidth;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#canvas.width = this.#canvas.clientWidth;
    this.#canvas.height = this.#canvas.clientHeight;
    this.#ctx = this.#canvas.getContext('2d')!;
  }

  handleMouseMove = (event: MouseEvent) => {
    const pos = getMousePositionOnCanvas(this.#canvas, event);

    const obj = this.#objects[this.#objects.length - 1] as Lightning;
    const obj2 = this.#objects[this.#objects.length - 2] as Lightning;
    obj.setToPosition(pos.x, pos.y);
    obj2.setToPosition(pos.x, pos.y);
  };

  handleMouseClick = () => {
    if (this.#_mousePressed) {
      this.#canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.#_mousePressed = false;
    } else {
      this.#canvas.addEventListener('mousemove', this.handleMouseMove);
      this.#_mousePressed = true;
    }
  };

  setupScene = () => {
    this.#objects.push(createSquare(100, 100, 100, 100));
    const lightning = createLightning(
      this.width / 2,
      this.height / 3,
      500,
      500
    );
    const lightning2 = createLightning(
      this.width / 2,
      this.height / 3,
      500,
      500
    );
    this.#objects.push(lightning);
    this.#objects.push(lightning2);

    this.#canvas.addEventListener('click', this.handleMouseClick);

    setTimeout(() => {
      animateLerp(this.#objects[0].x, this.#objects[0].x + 500, 2000, (v) => {
        this.#objects[0].x = v;
      });
    }, 1000);
  };

  tick = () => {
    clearCanvas(this.#ctx);
    this.#objects.forEach((obj) => {
      obj.render(this.#ctx);
    });
  };

  run = () => {
    this.setupScene();
    this.#_clearLoop = createLoop(this.tick);
  };

  destroy = () => {
    this.#_clearLoop();
    this.#canvas.removeEventListener('click', this.handleMouseClick);
  };
}
