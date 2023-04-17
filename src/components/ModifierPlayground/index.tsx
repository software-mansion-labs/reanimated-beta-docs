import "react-native-gesture-handler";
import React, { Dispatch } from "react";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import CodeBlock from "@theme/CodeBlock";

import useSpringPlayground from "./useSpringPlayground";
import useTimingPlayground from "./useTimingPlayground";

import Reset from "@site/static/img/reset.svg";
import ResetDark from "@site/static/img/reset-dark.svg";
import clsx from "clsx";
import AnimableIcon, { Animation } from "@site/src/components/AnimableIcon";
import {
  Checkbox,
  FormControl,
  Input,
  MenuItem,
  Select,
  Slider,
  styled,
} from "@mui/material";

export { useSpringPlayground, useTimingPlayground };

export default function ModifierPlayground(props: any) {
  const [key, setKey] = React.useState(0);

  const { example, code, controls } = props.usePlayground();

  const resetExample = () => {
    setKey(key + 1);
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <AnimableIcon
              icon={<Reset />}
              iconDark={<ResetDark />}
              animation={Animation.FADE_IN_OUT}
              onClick={(actionPerformed, setActionPerformed) => {
                if (!actionPerformed) {
                  resetExample();
                  setActionPerformed(true);
                }
              }}
            />
          </div>
          <div className={styles.previewWrapper}>
            <React.Fragment key={key}>{example}</React.Fragment>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.controls}>{controls}</div>
            <div className={styles.codeWrapper}>
              <CodeBlock className={clsx(styles.code)} language="javascript">
                {code}
              </CodeBlock>
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
  const SliderStyling = {
    color: "var(--swm-interactive-slider)", // color of the main path of slider
    "& .MuiSlider-thumb": {
      backgroundColor: "var(--swm-interactive-slider)", //color of thumb
    },
    "& .MuiSlider-rail": {
      color: "var(--swm-interactive-slider-rail)", //color of the rail (remaining area of slider)
      opacity: 1,
    },
  };

  return (
    <>
      <div className={styles.row}>
        <label>{label}</label>
        <Input
          type="number"
          sx={{ width: 55 }}
          inputProps={{ min: min, max: max, step: step }}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      </div>
      <Slider
        aria-label="Volume"
        min={min}
        max={max}
        step={step}
        value={value}
        sx={SliderStyling}
        onChange={(e: Event & { target: HTMLInputElement }) =>
          onChange(parseFloat(e.target.value))
        }
      />
    </>
  );
}

interface CheckboxProps {
  value: boolean;
  onChange: Dispatch<boolean>;
  label: string;
}

export function CheckboxOption({ value, onChange, label }: CheckboxProps) {
  return (
    <div className={styles.row}>
      <div>{label}</div>
      <Checkbox
        color="secondary"
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

export function SelectOption({
  value,
  onChange,
  label,
  options,
  disabled,
}: SelectProps) {
  return (
    <div className={styles.row}>
      <label>{label}</label>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
