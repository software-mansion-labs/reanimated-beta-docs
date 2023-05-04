import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const PlaygroundChart: React.FC<{
  easingFunction: (t) => number;
}> = ({ easingFunction }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const initializeCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    drawEquation(ctx);
  };

  const drawEquation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const minX = -10;
    const minY = -10;
    const maxX = 10;
    const maxY = 10;

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const iteration = (maxX - minX) / 1000;
    const scaleX = (ctx.canvas.width / rangeX) * 2;
    const scaleY = (ctx.canvas.height / rangeY) * 2;

    // Move graph to the center of the canvas
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.scale(scaleX, -scaleY);

    ctx.beginPath();
    ctx.moveTo(minX, easingFunction(minX));

    for (let x = minX + iteration; x <= maxX; x += iteration) {
      ctx.lineTo(x, easingFunction(x));
    }

    ctx.restore();
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;

    // var(--swm-navy-light-60)
    ctx.strokeStyle = "#6676aa";
    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    initializeCanvas();
  });

  return (
    <div className={styles.graph}>
      <canvas ref={canvasRef} width={300} height={300}></canvas>
    </div>
  );
};

export default PlaygroundChart;
