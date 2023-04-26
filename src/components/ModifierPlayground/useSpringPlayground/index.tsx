import React, { useState } from "react";
import Example from "./Example";

import { Range, CheckboxOption } from "..";

export default function useSpringPlayground() {
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [stiffness, setStiffness] = useState(100);
  // const [velocity, setVelocity] = useState(0);
  const [overshootClamping, setOvershootClamping] = useState(false);
  const [restDisplacementThreshold, setRestDisplacementThreshold] =
    useState(0.01);
  const [restSpeedThreshold, setRestSpeedThreshold] = useState(2);

  const code = `
    withSpring(sv.value, {
      damping: ${damping},
      mass: ${mass},
      stiffness: ${stiffness},
      overshootClamping: ${overshootClamping},
      restDisplacementThreshold: ${restDisplacementThreshold},
      restSpeedThreshold: ${restSpeedThreshold},
    })
    `;
  // velocity: ${velocity},

  const controls = (
    <>
      <Range
        label="Damping"
        min={1}
        max={100}
        value={damping}
        onChange={setDamping}
      />
      <Range
        label="Mass"
        min={1}
        max={20}
        step={0.1}
        value={mass}
        onChange={setMass}
      />
      <Range
        label="Stiffness"
        min={1}
        max={500}
        value={stiffness}
        onChange={setStiffness}
      />
      {/* <Range
        label="Velocity"
        min={-50}
        max={50}
        value={velocity}
        onChange={setVelocity}
      /> */}
      <CheckboxOption
        label="Clamp"
        value={overshootClamping}
        onChange={setOvershootClamping}
      />
      <Range
        label="Displacement threshold"
        min={0.01}
        max={150}
        step={0.01}
        value={restDisplacementThreshold}
        onChange={setRestDisplacementThreshold}
      />
      <Range
        label="Speed threshold"
        min={0.01}
        max={150}
        step={0.01}
        value={restSpeedThreshold}
        onChange={setRestSpeedThreshold}
      />
    </>
  );

  const example = (
    <Example
      options={{
        damping,
        mass,
        stiffness,
        // velocity,
        overshootClamping,
        restDisplacementThreshold,
        restSpeedThreshold,
      }}
    />
  );

  return {
    example,
    controls,
    code,
  };
}
