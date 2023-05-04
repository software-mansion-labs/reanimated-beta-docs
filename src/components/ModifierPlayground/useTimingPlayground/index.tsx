import React, { useState } from "react";
import Example from "./Example";

import { Range, SelectOption } from "..";

import { Easing } from "react-native-reanimated";
import PlaygroundChart from "@site/src/components/PlaygroundChart";

export default function useTimingPlayground() {
  const [duration, setDamping] = useState(1000);
  const [easing, setEasing] = useState("inOut");
  const [nestedEasing, setNestedEasing] = useState("quad");

  // back
  const [stepToBack, setStepToBack] = useState(3);

  // bezier
  const [x1, setX1] = useState(0.25);
  const [y1, setY1] = useState(0.1);
  const [x2, setX2] = useState(0.25);
  const [y2, setY2] = useState(1);

  // poly
  const [power, setPower] = useState(4);

  // elastic
  const [bounciness, setBounciness] = useState(2);

  // steps
  const [steps, setSteps] = useState(5);
  const [roundToNextStep, setRoundToNextStep] = useState(true);

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
        onChange={setDamping}
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

  const example = (
    <Example
      options={{
        duration,
        easing: formatEasing(easing).fn,
      }}
    />
  );

  const chart = (
    <PlaygroundChart
      easingFunctionName={canNestEasing(easing) ? nestedEasing : easing}
      easingFunction={
        easing !== "bezier"
          ? formatEasing(easing).fn
          : formatEasing(easing).fn.factory()
      }
    />
  );

  return {
    code,
    controls,
    example,
    additionalComponents: { chart },
  };
}
