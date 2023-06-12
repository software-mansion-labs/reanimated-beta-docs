import React, { useState } from "react";
import styles from "./styles.module.css";
import { HexColorPicker } from "react-colorful";
import { InputAdornment, TextField } from "@mui/material";

const TextFieldStyling = {
  minWidth: 88,
  maxWidth: 150,
  maxHeight: 32,
  "& .MuiInputBase-input": {
    fontSize: 14,
    backgroundColor: "background.default",
    color: "text.secondary",
    padding: "6px 14px 6px 0",
  },
  "& fieldset": {
    borderRadius: 0,
    borderColor: "text.secondary",
  },
};

const ColorPicker = ({ color, setColor }) => {
  const [inputColor, setInputColor] = useState(color);

  return (
    <div className={styles.colorSelection}>
      <HexColorPicker
        color={color}
        onChange={(color) => {
          setColor(color);
          setInputColor(color);
        }}
        className={styles.colorPicker}
      />
      <TextField
        type="text"
        hiddenLabel
        size="small"
        sx={TextFieldStyling}
        value={inputColor.replace("#", "").toUpperCase()}
        inputProps={{ maxLength: 6, pattern: "" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        onBlur={(e) => {
          const value = e.target.value;
          if (!value) {
            setInputColor("FFF");
            setColor("#FFF");
          }
        }}
        onChange={(e) => {
          const value = e.target.value;
          const hexPattern = /^([0-9A-F]{3}){1,2}$/i;
          const enteringHexPattern = /^[0-9A-F]{0,6}$/;

          if (enteringHexPattern.test(value)) {
            setInputColor(value);
          }

          if (hexPattern.test(value)) {
            setColor(`#${value}`);
          }
        }}
      />
    </div>
  );
};

export default ColorPicker;
