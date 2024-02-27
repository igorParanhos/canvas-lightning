export type CreateLoopCallback = (
  timeSinceStarted?: number,
  timeSinceLastFrame?: number
) => void;

export const createLoop = (callback: CreateLoopCallback) => {
  let frame: any;
  let abortSignal = false;
  let initialTime = performance.now();
  let timeSinceLastFrame = performance.now();

  const loop = () => {
    if (!abortSignal) frame = requestAnimationFrame(loop);
    const lastFrame = performance.now() - timeSinceLastFrame;
    timeSinceLastFrame = performance.now();
    callback(performance.now() - initialTime, lastFrame);
  };
  loop();

  return () => {
    abortSignal = true;
    cancelAnimationFrame(frame);
  };
};
