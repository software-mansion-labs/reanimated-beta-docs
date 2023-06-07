import React, { useState } from "react";
import {
  CheckboxOption,
  Range,
  SelectOption,
} from "@site/src/components/ModifierPlayground";
import Example from "./Example";
import styles from "./styles.module.css";
import ColorPicker from "@site/src/components/ModifierPlayground/useInterpolateColorPlayground/ColorPicker";

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
        ['${colorLeftBoundary.toUpperCase()}', '${colorRightBoundary.toUpperCase()}']
        '${ColorSpace[colorSpace]}',
        {
          ${
            colorSpace === ColorSpace.RGB
              ? `gamma: ${gamma},`
              : `useCorrectedHSVInterpolation: ${correction},`
          }
        }
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
    <div className={styles.example}>
      <ColorPicker color={colorLeftBoundary} setColor={setColorLeftBoundary} />
      <Example
        baseOptions={{
          inputRange: [0, 1],
          outputRange: [colorLeftBoundary, colorRightBoundary],
          colorSpace: colorSpace,
          cache: null,
        }}
        interpolationOptions={{
          gamma,
          useCorrectedHSVInterpolation: correction,
        }}
      />
      <ColorPicker
        color={colorRightBoundary}
        setColor={setColorRightBoundary}
      />
    </div>
  );

  return {
    example,
    controls,
    code,
    resetOptions,
    additionalComponents: {},
  };
}
