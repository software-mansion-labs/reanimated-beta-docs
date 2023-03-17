import React, { useState } from "react";
import Example from "./Example";

import { Range, Select } from "..";

import { Easing } from "react-native-reanimated";

export default function useTimingPlayground() {
  const [duration, setDamping] = useState(1000);
  const [easing, setEasing] = useState("inOut");
  const [nestedEasing, setNestedEasing] = useState("quad");

  // bezier
  const [x1, setX1] = useState(0.25);
  const [y1, setY1] = useState(0.1);
  const [x2, setX2] = useState(0.25);
  const [y2, setY2] = useState(1);

  // poly
  const [power, setPower] = useState(4);

  // elastic
  const [bounciness, setBounciness] = useState(1);

  function canNestEasing(easing: string) {
    return easing === "inOut" || easing === "in" || easing === "out";
  }

  const formattedEasing = (() => {
    if (canNestEasing(easing)) {
      return {
        fn: Easing[easing](Easing[nestedEasing]),
        code: `Easing.${easing}(Easing.${nestedEasing})`,
      };
    }
    if (easing === "bezier") {
      return {
        fn: Easing.bezier(x1, y1, x2, y2),
        code: `Easing.bezier(${x1}, ${y1}, ${x2}, ${y2})`,
      };
    }
    if (easing === "poly") {
      return {
        fn: Easing.poly(power),
        code: `Easing.poly(${power})`,
      };
    }
    if (easing === "elastic") {
      return {
        fn: Easing.elastic(bounciness),
        code: `Easing.elastic(${bounciness})`,
      };
    }
    return {
      fn: Easing[easing],
      code: `Easing.${easing}`,
    };
  })();

  const code = `
    withTiming(sv.value, {
      duration: ${duration},
      easing: ${formattedEasing.code}
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
      <Select
        label="Easing"
        value={easing}
        onChange={setEasing}
        options={[
          "linear",
          "ease",
          "quad",
          "cubic",
          "poly",
          "sin",
          "circle",
          "exp",
          "elastic",
          "back",
          "bounce",
          "bezier",
          "in",
          "out",
          "inOut",
        ]}
      />
      {easing === "bezier" && (
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
            min={0}
            max={1}
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
            min={0}
            max={1}
            step={0.01}
            value={y2}
            onChange={setY2}
          />
        </>
      )}
      {easing === "poly" && (
        <Range
          label="Power"
          min={1}
          max={10}
          step={1}
          value={power}
          onChange={setPower}
        />
      )}
      {easing === "elastic" && (
        <Range
          label="Bounciness"
          min={0}
          max={10}
          step={0.1}
          value={bounciness}
          onChange={setBounciness}
        />
      )}
      {canNestEasing(easing) && (
        <Select
          label="Easing"
          value={nestedEasing}
          onChange={setNestedEasing}
          disabled={!canNestEasing(easing)}
          options={[
            "linear",
            "ease",
            "quad",
            "cubic",
            "poly",
            "sin",
            "circle",
            "exp",
            "elastic",
            "back",
            "bounce",
            "bezier",
          ]}
        />
      )}
    </>
  );

  const example = (
    <Example
      options={{
        duration,
        easing: formattedEasing.fn,
      }}
    />
  );

  return {
    code,
    controls,
    example,
  };
}
