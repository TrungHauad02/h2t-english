import React from "react";
import { TextField } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface MissingWordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const MissingWordInput: React.FC<MissingWordInputProps> = ({
  value,
  onChange,
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const inputColor = isDarkMode ? color.teal300 : color.teal500;
  const backgroundColor = isDarkMode ? color.gray700 : color.white;

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      sx={{
        width: "100px",
        mx: 1,
        backgroundColor: backgroundColor,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: inputColor,
          },
          "&:hover fieldset": {
            borderColor: inputColor,
          },
          "&.Mui-focused fieldset": {
            borderColor: inputColor,
          },
        },
      }}
      placeholder="..."
    />
  );
};
