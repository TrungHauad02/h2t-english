import {
    FormLabel,
    Radio,
    FormControl,
    RadioGroup,
    FormControlLabel,
    alpha,
    Typography,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import React from "react";
  import { useDarkMode } from "hooks/useDarkMode";
  import useColor from "theme/useColor";
  
  interface RadioGroupTestProps {
    label?: string;
    name: number;
    options: {
      value: string | number;
      label: string;
    }[];
    size?: "small" | "medium";
    onChange?: (value: string | number) => void;
    disabled?: boolean;
    selectedValue?: string | number; // Thêm prop selectedValue
  }
  
  export default function RadioGroupTest({
    label,
    name,
    options,
    size,
    onChange,
    disabled = false,
    selectedValue,
  }: RadioGroupTestProps) {
    const { isDarkMode } = useDarkMode();
    const color = useColor();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };
  
    return (
      <FormControl fullWidth>
        {label && (
          <FormLabel
            sx={{ 
              color: isDarkMode ? color.emerald300 : color.emerald700,
              fontWeight: "medium",
              mb: 1
            }}
          >
            {label}
          </FormLabel>
        )}
        <RadioGroup
          value={selectedValue?.toString() || ""}
          name={name.toString()}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              sx={{
                my: 0.5,
                p: { xs: 0.75, md: 1 },
                borderRadius: 2,
                transition: "all 0.2s ease",
                bgcolor:
                  selectedValue === option.value
                    ? isDarkMode
                      ? alpha(color.emerald700, 0.3)
                      : alpha(color.emerald200, 0.7)
                    : "transparent",
                "&:hover": {
                  bgcolor: isDarkMode
                    ? alpha(color.emerald800, 0.2)
                    : alpha(color.emerald100, 0.5),
                  transform: "translateX(4px)"
                },
              }}
              control={
                <Radio
                  value={option.value}
                  size={size || (isMobile ? "small" : "medium")}
                  sx={{
                    color: isDarkMode ? color.emerald400 : color.emerald600,
                    "&.Mui-checked": {
                      color: isDarkMode ? color.emerald300 : color.emerald500,
                    },
                  }}
                  disabled={disabled}
                />
              }
              label={
                <Typography
                  variant="body1"
                  sx={{ 
                    color: isDarkMode ? color.gray200 : color.gray800,
                    fontWeight: selectedValue === option.value ? 500 : 400
                  }}
                >
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }