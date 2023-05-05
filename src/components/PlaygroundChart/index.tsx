import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import useScreenSize from "@site/src/hooks/useScreenSize";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const PlaygroundChart: React.FC<{
  easingFunctionName: string;
  easingFunction: (t) => number;
  enlargeCanvasSpace?: boolean;
}> = ({ easingFunctionName, easingFunction, enlargeCanvasSpace = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const { windowWidth } = useScreenSize();
  const isMobile = ExecutionEnvironment.canUseViewport && windowWidth < 768;

  const initializeCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    if (enlargeCanvasSpace) prepareAdditionalSpace(ctx);
    drawEquation(ctx);
  };

  const chooseMinMaxCoordinates = (canvas: HTMLCanvasElement) => {
    // Initial values for all charts
    const minX = 0;
    const minY = -1;
    const maxX = 1;
    const maxY = 1;
    const translate = {
      x: enlargeCanvasSpace ? (!isMobile ? 50 : 25) : 0,
      y: enlargeCanvasSpace
        ? canvas.height - (!isMobile ? 50 : 25)
        : canvas.height,
      scaleX: 1,
      scaleY: 2,
    };

    if (easingFunctionName === "elastic") {
      return {
        minX,
        minY,
        maxX,
        maxY,
        translate: {
          x: 0,
          y: canvas.height,
          scaleX: 1,
          scaleY: 1,
        },
      };
    }

    return {
      minX,
      minY,
      maxX,
      maxY,
      translate,
    };
  };

  const additionalSpaceValues = {
    lineWidth: 1,
    // var(--swm-navy-light-20)
    strokeStyle: "#c1c6e5",
    rect: {
      x: !isMobile ? 50 : 25,
      y: !isMobile ? 50 : 25,
      scaleFactor: !isMobile ? 100 : 50,
    },
  };

  const prepareAdditionalSpace = (ctx: CanvasRenderingContext2D) => {
    const { lineWidth, strokeStyle, rect } = additionalSpaceValues;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.strokeRect(
      rect.x,
      rect.y,
      ctx.canvas.width - rect.scaleFactor,
      ctx.canvas.height - rect.scaleFactor
    );
  };

  const drawEquation = (ctx: CanvasRenderingContext2D) => {
    const { minX, minY, maxX, maxY, translate } = chooseMinMaxCoordinates(
      ctx.canvas
    );

    const canvasWidth = !enlargeCanvasSpace
      ? ctx.canvas.width
      : ctx.canvas.width - (!isMobile ? 100 : 50);

    const canvasHeight = !enlargeCanvasSpace
      ? ctx.canvas.height
      : ctx.canvas.height - (!isMobile ? 100 : 50);

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const iteration = (maxX - minX) / 1000;
    const scaleX = (canvasWidth / rangeX) * translate.scaleX;
    const scaleY = (canvasHeight / rangeY) * translate.scaleY;

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

    // var(--swm-navy-light-80)
    ctx.strokeStyle = "#b58df1";
    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    initializeCanvas();
  });

  return (
    <div className={styles.graph}>
      <canvas
        ref={canvasRef}
        width={!isMobile ? 250 : 175}
        height={!isMobile ? 250 : 175}
      ></canvas>
    </div>
  );
};

export default PlaygroundChart;
