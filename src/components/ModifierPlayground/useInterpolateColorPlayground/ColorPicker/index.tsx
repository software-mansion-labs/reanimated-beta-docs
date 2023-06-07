import React from "react";
import styles from "./styles.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
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
  return (
    <div className={styles.colorSelection}>
      <HexColorPicker
        color={color}
        onChange={setColor}
        className={styles.colorPicker}
      />
      <TextField
        type="text"
        hiddenLabel
        size="small"
        sx={TextFieldStyling}
        value={color.replace("#", "").toUpperCase()}
        inputProps={{ maxLength: 6 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        onChange={(e) =>
          setColor(
            () =>
              `${!e.target.value.startsWith("#") ? "#" : ""}${e.target.value}`
          )
        }
      />
    </div>
  );
};

export default ColorPicker;
