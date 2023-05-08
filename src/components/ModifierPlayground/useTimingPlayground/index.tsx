import React, { useState } from "react";
import Example from "./Example";

import { Range, SelectOption } from "..";

import { Easing } from "react-native-reanimated";
import PlaygroundChart from "@site/src/components/PlaygroundChart";
import useChartPoint from "@site/src/components/PlaygroundChart/PlaygroundChartPoint";

const initialState = {
  duration: 1000,
  easing: "inOut",
  nestedEasing: "quad",

  x1: 0.25,
  y1: 0.1,
  x2: 0.25,
  y2: 1,

  stepToBack: 3,
  power: 4,
  bounciness: 2,
  steps: 5,
  roundToNextStep: true,
};

export default function useTimingPlayground() {
  const [duration, setDuration] = useState(initialState.duration);
  const [easing, setEasing] = useState(initialState.easing);
  const [nestedEasing, setNestedEasing] = useState(initialState.nestedEasing);

  // bezier
  const [x1, setX1] = useState(initialState.x1);
  const [y1, setY1] = useState(initialState.y1);
  const [x2, setX2] = useState(initialState.x2);
  const [y2, setY2] = useState(initialState.y2);

  // back
  const [stepToBack, setStepToBack] = useState(initialState.stepToBack);

  // poly
  const [power, setPower] = useState(initialState.power);

  // elastic
  const [bounciness, setBounciness] = useState(initialState.bounciness);

  // steps
  const [steps, setSteps] = useState(initialState.steps);
  const [roundToNextStep, setRoundToNextStep] = useState(
    initialState.roundToNextStep
  );

  const resetOptions = () => {
    setDuration(() => initialState.duration);

    setX1(() => initialState.x1);
    setY1(() => initialState.y1);
    setX2(() => initialState.x2);
    setY2(() => initialState.y2);

    setStepToBack(() => initialState.stepToBack);
    setPower(() => initialState.power);
    setBounciness(() => initialState.bounciness);
    setSteps(() => initialState.steps);
    setRoundToNextStep(() => initialState.roundToNextStep);
  };

  const canNestEasing = (easing: string) => {
    return easing === "inOut" || easing === "in" || easing === "out";
  };

  const formatEasing = (easing: string) => {
    if (canNestEasing(easing)) {
      return {
        fn: Easing[easing](formatEasing(nestedEasing).fn),
        code: `Easing.${easing}(${formatEasing(nestedEasing).code})`,
      };
    }
    switch (easing) {
      case "back":
        return {
          fn: Easing.back(stepToBack),
          code: `Easing.back(${stepToBack})`,
        };
      case "bezierFn":
        return {
          fn: Easing.bezierFn(x1, y1, x2, y2),
          code: `Easing.bezierFn(${x1}, ${y1}, ${x2}, ${y2})`,
        };
      case "bezier":
        return {
          fn: Easing.bezier(x1, y1, x2, y2),
          code: `Easing.bezier(${x1}, ${y1}, ${x2}, ${y2})`,
        };
      case "poly":
        return {
          fn: Easing.poly(power),
          code: `Easing.poly(${power})`,
        };
      case "elastic":
        return {
          fn: Easing.elastic(bounciness),
          code: `Easing.elastic(${bounciness})`,
        };
      case "steps":
        return {
          fn: Easing.steps(steps, roundToNextStep),
          code: `Easing.steps(${steps}, ${roundToNextStep})`,
        };
    }
    return {
      fn: Easing[easing],
      code: `Easing.${easing}`,
    };
  };

  const code = `
    withTiming(sv.value, {
      duration: ${duration},
      easing: ${formatEasing(easing).code}
    })
  `;

  const controls = (
    <>
      <Range
        label="Duration"
        min={100}
        max={2000}
        step={10}
        value={duration}
        onChange={setDuration}
      />
      <SelectOption
        label="Easing"
        value={easing}
        onChange={setEasing}
        options={[
          "back",
          "bezier",
          "bounce",
          "circle",
          "cubic",
          "ease",
          "elastic",
          "exp",
          "linear",
          "poly",
          "quad",
          "sin",
          "steps",
          "in",
          "inOut",
          "out",
        ]}
      />
      {canNestEasing(easing) && (
        <SelectOption
          label="Easing"
          value={nestedEasing}
          onChange={setNestedEasing}
          disabled={!canNestEasing(easing)}
          options={[
            "back",
            "bezierFn",
            "bounce",
            "circle",
            "cubic",
            "ease",
            "elastic",
            "exp",
            "linear",
            "poly",
            "quad",
            "sin",
            "steps",
          ]}
        />
      )}
      {(easing === "back" || nestedEasing === "back") && (
        <Range
          label="Step to back"
          min={0}
          max={10}
          step={0.1}
          value={stepToBack}
          onChange={setStepToBack}
        />
      )}
      {(easing === "bezier" ||
        (nestedEasing === "bezierFn" && canNestEasing(easing))) && (
        <>
          <Range
            label="x1"
            min={0}
            max={1}
            step={0.01}
            value={x1}
            onChange={setX1}
          />
          <Range
            label="y1"
            min={-1}
            max={2}
            step={0.01}
            value={y1}
            onChange={setY1}
          />
          <Range
            label="x2"
            min={0}
            max={1}
            step={0.01}
            value={x2}
            onChange={setX2}
          />
          <Range
            label="y2"
            min={-1}
            max={2}
            step={0.01}
            value={y2}
            onChange={setY2}
          />
        </>
      )}
      {(easing === "poly" || nestedEasing === "poly") && (
        <Range
          label="Power"
          min={1}
          max={10}
          step={1}
          value={power}
          onChange={setPower}
        />
      )}
      {(easing === "elastic" || nestedEasing === "elastic") && (
        <Range
          label="Bounciness"
          min={0}
          max={10}
          step={0.1}
          value={bounciness}
          onChange={setBounciness}
        />
      )}
      {(easing === "steps" || nestedEasing === "steps") && (
        <>
          <Range
            label="Steps"
            min={1}
            max={15}
            step={1}
            value={steps}
            onChange={setSteps}
          />
          <SelectOption
            label="Round to next step"
            value={"" + roundToNextStep}
            onChange={(option) => setRoundToNextStep(option === "true")}
            options={["true", "false"]}
          />
        </>
      )}
    </>
  );

  const handleFirstPointMove = (x, y, canvasWidth, canvasHeight) => {
    setX1(() => parseFloat((x / (canvasWidth - 24)).toFixed(2)));
    setY1(() => parseFloat(((1 - y / (canvasHeight - 24)) * 3 - 1).toFixed(2)));
  };

  const handleSecondPointMove = (x, y, canvasWidth, canvasHeight) => {
    setX2(() => parseFloat((x / (canvasWidth - 24)).toFixed(2)));
    setY2(() => parseFloat(((1 - y / (canvasHeight - 24)) * 3 - 1).toFixed(2)));
  };

  const example = (
    <Example
      options={{
        duration,
        easing: formatEasing(easing).fn,
      }}
    />
  );

  const functionName = canNestEasing(easing) ? nestedEasing : easing;
  const overflowingEasings = ["back", "bezier", "bezierFn"];

  const chart = (
    <PlaygroundChart
      easingFunctionName={functionName}
      easingFunction={
        easing !== "bezier"
          ? formatEasing(easing).fn
          : formatEasing(easing).fn.factory()
      }
      enlargeCanvasSpace={overflowingEasings.includes(functionName)}
      bezierPointsMoveHandler={{
        firstPointMoveHandler: handleFirstPointMove,
        secondPointMoveHandler: handleSecondPointMove,
      }}
      bezierControlsValues={{
        x1,
        y1,
        x2,
        y2,
      }}
    />
  );

  return {
    code,
    controls,
    example,
    resetOptions,
    additionalComponents: { chart },
  };
}
