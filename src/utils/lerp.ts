import { createLoop } from './createLoop';

export const animateLerp = (
  from: number,
  to: number,
  ms: number,
  cb: (v: number, diff?: number) => void
) => {
  let cancel = createLoop((started?: number, lastFrame?: number) => {
    if (started! >= ms) cancel();
    let d = to - from;
    let v = (d / ms) * started!;
    const diff = (d / ms) * lastFrame!;
    cb(from + v, diff);
  });
};
