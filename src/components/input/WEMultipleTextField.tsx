import React from "react";
import {
  TextField,
  Stack,
  Typography,
  SxProps,
  Button,
  Box,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Theme } from "@mui/material";

interface WEMultipleTextFieldProps {
  label?: string;
  type: string;
  values: (string | number)[];
  onChange: (newValues: (string | number)[]) => void;
  name?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  placeholder?: string;
  disabled?: boolean;
  minFields?: number;
  maxFields?: number;
}

export default function WEMultipleTextField({
  label,
  type,
  values,
  onChange,
  name,
  sx,
  required,
  onKeyDown,
  placeholder,
  disabled,
  minFields = 1,
  maxFields = 10,
}: WEMultipleTextFieldProps) {
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
      marginBottom: "0.5rem",
    },
    width: "100%",
    maxWidth: "600px",
    ...sx,
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    onChange(newValues);
  };

  const addField = () => {
    if (values.length < maxFields) {
      onChange([...values, ""]);
    }
  };

  const removeField = (index: number) => {
    if (values.length > minFields) {
      const newValues = [...values];
      newValues.splice(index, 1);
      onChange(newValues);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (onKeyDown) {
      onKeyDown(e, index);
    }
  };

  return (
    <Stack direction="column" spacing={1}>
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

      {values.map((value, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <TextField
            disabled={disabled}
            required={required}
            fullWidth
            type={type}
            value={value}
            onChange={(e) =>
              handleChange(index, e as React.ChangeEvent<HTMLInputElement>)
            }
            name={name ? `${name}-${index}` : undefined}
            sx={complexSx}
            onKeyDown={(e) =>
              handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)
            }
            placeholder={placeholder}
          />

          {values.length > minFields && (
            <IconButton
              onClick={() => removeField(index)}
              sx={{
                color: isDarkMode ? color.red400 : color.red500,
                ml: 1,
              }}
            >
              <Remove />
            </IconButton>
          )}
        </Box>
      ))}

      {values.length < maxFields && (
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addField}
          sx={{
            borderRadius: { xs: "0.75rem", sm: "1rem" },
            borderColor: isDarkMode ? color.emerald400 : color.emerald500,
            color: isDarkMode ? color.emerald400 : color.emerald500,
            "&:hover": {
              borderColor: isDarkMode ? color.emerald300 : color.emerald600,
              backgroundColor: isDarkMode
                ? "rgba(52, 211, 153, 0.1)"
                : "rgba(16, 185, 129, 0.1)",
            },
            alignSelf: "flex-start",
            mt: 1,
          }}
          disabled={disabled}
        >
          Add {label || "Field"}
        </Button>
      )}
    </Stack>
  );
}

interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  sx?: SxProps;
}

const IconButton = ({ children, onClick, sx }: IconButtonProps) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        minWidth: "40px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        padding: 0,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
