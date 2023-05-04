import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const PlaygroundChart: React.FC<{
  easingFunctionName: string;
  easingFunction: (t) => number;
}> = ({ easingFunctionName, easingFunction }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const initializeCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    drawEquation(ctx);
  };

  const chooseMinMaxCoordinates = (canvas: HTMLCanvasElement) => {
    // Default translate parameters for most of the charts
    let translate = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      scaleX: 2,
      scaleY: 2,
    };

    if (easingFunctionName === "elastic") {
      return {
        minX: 0,
        minY: -1,
        maxX: 1,
        maxY: 1,
        translate: {
          x: 0,
          y: canvas.height,
          scaleX: 1,
          scaleY: 1,
        },
      };
    }

    return {
      minX: 0,
      minY: -1,
      maxX: 1,
      maxY: 1,
      translate: {
        x: 0,
        y: canvas.height,
        scaleX: 1,
        scaleY: 2,
      },
    };
  };

  const drawEquation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const { minX, minY, maxX, maxY, translate } = chooseMinMaxCoordinates(
      ctx.canvas
    );

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const iteration = (maxX - minX) / 1000;
    const scaleX = (ctx.canvas.width / rangeX) * translate.scaleX;
    const scaleY = (ctx.canvas.height / rangeY) * translate.scaleY;

    // Move graph to the center of the canvas
    ctx.translate(translate.x, translate.y);
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
