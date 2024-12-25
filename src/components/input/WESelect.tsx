import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WESelectProps {
  label: string;
  value: number | string;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
}

export default function WESelect({
  label,
  value,
  options,
  onChange,
}: WESelectProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value as string | number);
  };

  return (
    <FormControl
      sx={{
        minWidth: 120,
        backgroundColor: isDarkMode ? color.gray800 : color.gray100,
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "& .MuiInputLabel-root": {
          color: isDarkMode ? color.gray300 : color.gray800,
        },
        "& .MuiSelect-root": {
          padding: "8px 12px",
          color: isDarkMode ? color.gray300 : color.gray800,
        },
        "& .MuiSelect-icon": {
          color: isDarkMode ? color.gray300 : color.gray800,
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        sx={{
          "&:hover": {
            backgroundColor: isDarkMode ? color.gray700 : color.teal50,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: isDarkMode ? color.teal500 : color.teal700,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              "&:hover": {
                backgroundColor: isDarkMode ? color.teal700 : color.teal100,
              },
              color: isDarkMode ? color.gray300 : color.gray800,
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
