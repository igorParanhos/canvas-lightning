import { useEffect, useRef } from 'react';
import './App.css';
import { Controller } from './core/Controller';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    console.log('initializing canvas');
    const controller = new Controller(canvasRef.current);
    controller.run();
    return () => {
      controller.destroy();
    };
  }, []);

  return (
    <>
      <div>
        <h1>Canvas Lightning</h1>
        <canvas ref={canvasRef} />
        <p>Click on the canvas to see an awesome effect.</p>
      </div>
    </>
  );
}

export default App;
