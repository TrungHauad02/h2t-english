import { Stack, Typography, SxProps } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Theme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";

interface WEDateFieldProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  name?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export default function WEDateField({
  label,
  value,
  onChange,
  name,
  sx,
  required,
  placeholder,
  disabled,
}: WEDateFieldProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray600 : color.gray400;

  const complexSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: { xs: "0.75rem", sm: "1rem" },
      width: "100%",
      paddingLeft: "0.2rem",
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${borderColor}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${isDarkMode ? color.emerald400 : color.emerald500}`,
      },
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    width: "100%",
    maxWidth: "1000px",
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
        {label} {required && <span style={{ color: color.error }}>*</span>}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <DatePicker
          value={value}
          onChange={onChange}
          format="dd/MM/yyyy"
          disabled={disabled}
          slotProps={{
            textField: {
              fullWidth: true,
              required: required,
              name: name,
              placeholder: placeholder,
              sx: complexSx,
              InputProps: {
                sx: {
                  color: textColor,
                  "&::placeholder": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}
