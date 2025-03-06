import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Stack,
  FormHelperText,
  SxProps,
  Theme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WESelectProps {
  label: string;
  value: number | string;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  name?: string;
  error?: boolean;
  errorText?: string;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
  variant?: "standard" | "outlined" | "filled";
  id?: string;
  labelId?: string;
  disableUnderline?: boolean;
  showLabel?: boolean;
}

export default function WESelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  required = false,
  helperText,
  disabled = false,
  fullWidth = true,
  name,
  error = false,
  errorText,
  sx,
  size = "medium",
  variant = "outlined",
  id,
  labelId,
  disableUnderline = false,
  showLabel = false,
}: WESelectProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value as string | number);
  };

  const selectStyles = {
    backgroundColor: isDarkMode ? color.gray800 : color.white,
    borderRadius: { xs: "0.75rem", sm: "1rem" },
    width: fullWidth ? "100%" : "auto",
    minWidth: 120,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${
        error ? (isDarkMode ? color.errorDarkMode : color.error) : color.gray400
      }`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${
        error
          ? isDarkMode
            ? color.errorDarkMode
            : color.error
          : isDarkMode
          ? color.emerald400
          : color.emerald500
      }`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? color.teal400 : color.teal600,
    },
    "&.Mui-disabled": {
      backgroundColor: isDarkMode ? color.gray700 : color.gray200,
      opacity: 0.7,
    },
    ...sx,
  };

  const labelStyles = {
    color: isDarkMode ? color.gray100 : color.gray900,
    fontSize: { xs: "1rem", sm: "1rem" },
    textAlign: "left",
    pl: "0.2rem",
    mb: 1,
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ width: fullWidth ? "100%" : "auto" }}
    >
      {showLabel && (
        <Typography sx={labelStyles}>
          {label}{" "}
          {required && (
            <span
              style={{ color: isDarkMode ? color.errorDarkMode : color.error }}
            >
              *
            </span>
          )}
        </Typography>
      )}

      <FormControl
        fullWidth={fullWidth}
        disabled={disabled}
        error={error}
        variant={variant}
        sx={{ mb: helperText || error ? 0 : 2 }}
      >
        {!showLabel && (
          <InputLabel
            id={labelId || `${name}-label`}
            sx={{
              color: error
                ? isDarkMode
                  ? color.errorDarkMode
                  : color.error
                : isDarkMode
                ? color.gray300
                : color.gray700,
            }}
          >
            {label} {required && "*"}
          </InputLabel>
        )}

        <Select
          id={id || name}
          labelId={labelId || `${name}-label`}
          value={value}
          onChange={handleChange}
          label={!showLabel ? label : undefined}
          name={name}
          displayEmpty={!!placeholder}
          sx={selectStyles}
          size={size}
          disableUnderline={disableUnderline}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              <Typography
                sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
              >
                {placeholder}
              </Typography>
            </MenuItem>
          )}

          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                "&:hover": {
                  backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                },
                "&.Mui-selected": {
                  backgroundColor: isDarkMode ? color.teal700 : color.teal200,
                  "&:hover": {
                    backgroundColor: isDarkMode ? color.teal600 : color.teal300,
                  },
                },
                color: isDarkMode ? color.gray300 : color.gray800,
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {(helperText || error) && (
          <FormHelperText
            sx={{
              color: error
                ? isDarkMode
                  ? color.errorDarkMode
                  : color.error
                : isDarkMode
                ? color.gray400
                : color.gray600,
              ml: "0.4rem",
            }}
          >
            {error ? errorText : helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
}
