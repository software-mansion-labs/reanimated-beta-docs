interface ChartValuesProperties {
  canvas: HTMLCanvasElement;
  easingFunctionName: string;
  easingNestType: string | undefined;
  enlargeCanvasSpace: boolean;
  isMobile: boolean;
}

const useChartValues = ({
  canvas,
  easingFunctionName,
  easingNestType,
  enlargeCanvasSpace,
  isMobile,
}: ChartValuesProperties) => {
  // Initial values for all charts
  const minX = 0;
  const minY = -1;
  const maxX = 1;
  const maxY = 1;
  let translate = {
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
    let elasticEasingTranslate = {
      x: 0,
      y: canvas.height,
      scaleX: 1,
      scaleY: 1,
    };

    if (easingNestType === "inOut")
      /* The midpoint between numbers 1.25 and 1.5 that represents starting points
       * on the y-axis of the left and right side of the elastic easing function. */
      elasticEasingTranslate.y = canvas.height / 1.375;
    else if (easingNestType === "out")
      elasticEasingTranslate.y = canvas.height / 2;

    translate = elasticEasingTranslate;
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    translate,
  };
};

export default useChartValues;
