import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
  SxProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Theme } from "@mui/material";

interface WSTextFieldProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  name?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const WETextField = ({
  label,
  type,
  value,
  onChange,
  showPassword,
  setShowPassword,
  name,
  sx,
  required,
  onKeyDown,
  placeholder,
}: WSTextFieldProps) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const complexSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: { xs: "0.75rem", sm: "1rem" },
      width: "100%",
      paddingLeft: "0.2rem",
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${color.gray400}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${isDarkMode ? color.emerald400 : color.emerald500}`,
      },
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    width: "100%",
    maxWidth: "600px",
    ...sx,
  };

  return (
    <Stack direction={"column"} spacing={1}>
      <Typography
        sx={{
          color: isDarkMode ? color.gray100 : color.gray900,
          fontSize: { xs: "1rem", sm: "1rem" },
          textAlign: "left",
          pl: "0.2rem",
        }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <TextField
        required={required}
        fullWidth
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        sx={complexSx}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {setShowPassword && (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{
                    marginRight: "0.2rem",
                    padding: { xs: "4px", sm: "8px" },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default WETextField;
