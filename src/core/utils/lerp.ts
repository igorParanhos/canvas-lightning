import { createLoop } from './createLoop';

export const animateLerp = (
  from: number,
  to: number,
  ms: number,
  cb: (v: number, diff?: number) => void
) => {
  const cancel = createLoop((started?: number, lastFrame?: number) => {
    if (started! >= ms) cancel();
    const d = to - from;
    const v = (d / ms) * started!;
    const diff = (d / ms) * lastFrame!;
    cb(from + v, diff);
  });
};
