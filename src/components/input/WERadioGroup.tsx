import {
  FormLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import React from "react";

interface WERadioGroupProps {
  label?: string;
  name: string;
  defaultValue?: string | number;
  options: {
    value: string | number;
    label: string;
  }[];
  size?: "small" | "medium";
  onChange?: (value: string | number) => void;
}

export default function WERadioGroup({
  label,
  name,
  defaultValue,
  options,
  size,
  onChange,
}: WERadioGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        defaultValue={defaultValue}
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={<Radio value={option.value} size={size} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
