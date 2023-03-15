import React, { Dispatch } from "react";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Spring from "./Spring";

export default function ModifierPlayground(props: any) {
  const [key, setKey] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const [damping, setDamping] = React.useState(10);
  const [mass, setMass] = React.useState(1);
  const [stiffness, setStiffness] = React.useState(100);
  const [overshootClamping, setOvershootClamping] = React.useState(false);
  const [restDisplacementThreshold, setRestDisplacementThreshold] =
    React.useState(0.01);
  const [restSpeedThreshold, setRestSpeedThreshold] = React.useState(2);

  const resetExample = () => {
    setKey(key + 1);
    setCopied(false);
  };

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

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button onClick={resetExample}>Reset</button>
          </div>
          <React.Fragment key={key}>
            <Spring
              options={{
                damping,
                mass,
                stiffness,
                overshootClamping,
                restDisplacementThreshold,
                restSpeedThreshold,
              }}
            />
          </React.Fragment>
          <div className={styles.wrapper}>
            <div className={styles.sliders}>
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
                max={10}
                value={mass}
                onChange={setMass}
              />

              <Range
                label="Stiffness"
                min={1}
                max={1000}
                value={stiffness}
                onChange={setStiffness}
              />
              <Checkbox
                label="Overshoot clamping"
                value={overshootClamping}
                onChange={setOvershootClamping}
              />

              <Range
                label="Rest displacement threshold"
                min={0.01}
                max={150}
                step={0.01}
                value={restDisplacementThreshold}
                onChange={setRestDisplacementThreshold}
              />

              <Range
                label="Rest speed threshold"
                min={0.01}
                max={150}
                step={0.01}
                value={restSpeedThreshold}
                onChange={setRestSpeedThreshold}
              />
            </div>
            <div className={styles.codeWrapper}>
              <SyntaxHighlighter
                className={styles.code}
                language="javascript"
                style={docco}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
}

interface RangeProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: Dispatch<number>;
  label: string;
}

function Range({ min, max, value, onChange, label, step = 1 }: RangeProps) {
  return (
    <>
      <div>
        {label}: {value}
      </div>
      <div className={styles.row}>
        <div className={styles.label}>{min}</div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <div className={styles.label}>{max}</div>
      </div>
    </>
  );
}

interface CheckboxProps {
  value: boolean;
  onChange: Dispatch<boolean>;
  label: string;
}

function Checkbox({ value, onChange, label }: CheckboxProps) {
  return (
    <div className={styles.row}>
      <div>{label}:</div>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}
