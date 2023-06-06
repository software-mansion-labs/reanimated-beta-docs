import React, { useState } from "react";
import {
  CheckboxOption,
  Range,
  SelectOption,
} from "@site/src/components/ModifierPlayground";
import Example from "./Example";

export enum ColorSpace {
  RGB,
  HSV,
}

const initialState = {
  colorSpace: ColorSpace.RGB,
  gamma: 2.2,
  correction: true,
  color: {
    leftBoundary: "#FFFFFF",
    rightBoundary: "#000000",
  },
};

export default function useInterpolateColorPlayground() {
  const [colorSpace, setColorSpace] = useState<ColorSpace>(
    initialState.colorSpace
  );
  const [gamma, setGamma] = useState(initialState.gamma);

  const [colorLeftBoundary, setColorLeftBoundary] = useState(
    initialState.color.leftBoundary
  );
  const [colorRightBoundary, setColorRightBoundary] = useState(
    initialState.color.rightBoundary
  );

  const [correction, setCorrection] = useState(initialState.correction);

  const resetOptions = () => {
    setColorSpace(() => initialState.colorSpace);
    setGamma(() => initialState.gamma);

    setCorrection(() => initialState.correction);
  };

  const code = `
    interpolateColor(
        sv.value,
        [0, 1],
        ['red', 'green']
      )
    `;

  const controls = (
    <>
      <SelectOption
        label="Colorspace"
        value={ColorSpace[colorSpace]}
        onChange={(changedString) => setColorSpace(ColorSpace[changedString])}
        options={["RGB", "HSV"]}
      />
      {colorSpace === ColorSpace.RGB && (
        <Range
          label="Gamma"
          min={0}
          max={10}
          step={0.1}
          value={gamma}
          onChange={setGamma}
        />
      )}
      {colorSpace === ColorSpace.HSV && (
        <CheckboxOption
          value={correction}
          onChange={setCorrection}
          label="Use corrected HSV"
        />
      )}
    </>
  );

  const example = (
    <Example
      options={{
        inputRange: [0, 1],
        outputRange: ["red", "green"],
        colorSpace: ColorSpace.RGB,
        cache: null,
      }}
    />
  );

  return {
    example,
    controls,
    code,
    resetOptions,
    additionalComponents: {},
  };
}
