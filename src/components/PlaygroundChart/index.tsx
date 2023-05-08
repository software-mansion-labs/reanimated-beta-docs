import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import useScreenSize from "@site/src/hooks/useScreenSize";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import PlaygroundChartPoint from "@site/src/components/PlaygroundChart/PlaygroundChartPoint";

const PlaygroundChart: React.FC<{
  easingFunctionName: string;
  easingFunction: (t) => number;
  enlargeCanvasSpace?: boolean;
  bezierPointsMoveHandler: {
    firstPointMoveHandler: (x, y, canvasWidth, canvasHeight) => void;
    secondPointMoveHandler: (x, y, canvasWidth, canvasHeight) => void;
  };
  bezierControlsValues: { x1: number; y1: number; x2: number; y2: number };
}> = ({
  easingFunctionName,
  easingFunction,
  enlargeCanvasSpace = false,
  bezierPointsMoveHandler,
  bezierControlsValues,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const { windowWidth } = useScreenSize();
  const isMobile = ExecutionEnvironment.canUseViewport && windowWidth < 768;

  const initializeCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    if (enlargeCanvasSpace) prepareAdditionalSpace(ctx);
    drawEquation(ctx);

    // Draw lines to points only if current easing is a cubic bezier function
    if (easingFunctionName === "bezier" || easingFunctionName === "bezierFn")
      bezierDrawLineToPoints(ctx);
  };

  const prepareChartValues = (canvas: HTMLCanvasElement) => {
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

    /* For elastic easing, it would be better to decrease the scaling
     * of the Y-axis, as the bouncing segments could overflow beyond the canvas.
     */
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
    const { minX, minY, maxX, maxY, translate } = prepareChartValues(
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

  const canvasSize = !isMobile ? 250 : 175;

  const x1 = bezierControlsValues.x1 * (canvasSize - 24);
  const y1 = (1 - (bezierControlsValues.y1 + 1) / 3) * (canvasSize - 24);

  const x2 = bezierControlsValues.x2 * (canvasSize - 24);
  const y2 = (1 - (bezierControlsValues.y2 + 1) / 3) * (canvasSize - 24);

  const bezierDrawLineToPoint = (
    ctx: CanvasRenderingContext2D,
    startX,
    startY,
    endX,
    endY
  ) => {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX + 12, endY + 12);
    ctx.lineWidth = 1;
    // var(--swm-navy-light-60) in rgba
    ctx.strokeStyle = "rgba(102, 118, 170, 0.3)";
    ctx.stroke();
  };

  const bezierDrawLineToPoints = (ctx: CanvasRenderingContext2D) => {
    const { rect } = additionalSpaceValues;
    bezierDrawLineToPoint(ctx, rect.x, ctx.canvas.height - rect.y, x1, y1);
    bezierDrawLineToPoint(ctx, ctx.canvas.width - rect.x, rect.y, x2, y2);
  };

  return (
    <div className={styles.graph}>
      <div
        className={styles.pointArea}
        style={{ width: canvasSize + 2, height: canvasSize + 2 }}
      >
        {(easingFunctionName === "bezier" ||
          easingFunctionName === "bezierFn") && (
          <>
            <PlaygroundChartPoint
              label="L"
              startingPoint={{
                x: 0,
                y: 0,
              }}
              bounds={{ x: canvasSize, y: canvasSize }}
              pointMoveHandler={(x, y) =>
                bezierPointsMoveHandler.firstPointMoveHandler(
                  x,
                  y,
                  canvasSize,
                  canvasSize
                )
              }
              pointControls={{
                x: x1,
                y: y1,
              }}
            />

            <PlaygroundChartPoint
              label="R"
              startingPoint={{
                x: canvasSize - 24,
                y: canvasSize - 24,
              }}
              bounds={{ x: canvasSize, y: canvasSize }}
              pointMoveHandler={(x, y) =>
                bezierPointsMoveHandler.secondPointMoveHandler(
                  x,
                  y,
                  canvasSize,
                  canvasSize
                )
              }
              pointControls={{
                x: x2,
                y: y2,
              }}
            />
          </>
        )}

        <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
      </div>
    </div>
  );
};

export default PlaygroundChart;
