import "react-native-gesture-handler";
import React, { Dispatch } from "react";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import useSpringPlayground from "./useSpringPlayground";
import useTimingPlayground from "./useTimingPlayground";
export { useSpringPlayground, useTimingPlayground };

export default function ModifierPlayground(props: any) {
  const [key, setKey] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const { example, code, controls } = props.usePlayground();

  const resetExample = () => {
    setKey(key + 1);
    setCopied(false);
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button onClick={resetExample}>Reset</button>
          </div>
          <React.Fragment key={key}>{example}</React.Fragment>
          <div className={styles.wrapper}>
            <div className={styles.controls}>{controls}</div>
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

export function Range({
  min,
  max,
  value,
  onChange,
  label,
  step = 1,
}: RangeProps) {
  return (
    <>
      <div className={styles.row}>
        <label>{label}</label>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </>
  );
}

interface CheckboxProps {
  value: boolean;
  onChange: Dispatch<boolean>;
  label: string;
}

export function Checkbox({ value, onChange, label }: CheckboxProps) {
  return (
    <div className={styles.row}>
      <div>{label}</div>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

interface SelectProps {
  value: string;
  onChange: Dispatch<string>;
  label: string;
  options: string[];
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  label,
  options,
  disabled,
}: SelectProps) {
  return (
    <div className={styles.row}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
