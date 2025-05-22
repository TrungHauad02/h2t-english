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
  Box,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RadioGroupTestProps {
  label?: string;
  name: number;
  options: {
    value: string | number;
    label: string;
    isCorrect?: boolean;
  }[];
  size?: "small" | "medium";
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  selectedValue?: string | number;
  isReview?: boolean;
}

export default function RadioGroupTest({
  label,
  name,
  options,
  size,
  onChange,
  disabled = false,
  selectedValue,
  isReview = false,
}: RadioGroupTestProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Find the correct option
  const correctOption = options.find(option => option.isCorrect === true);
  const correctValue = correctOption?.value;
  
  // Check if the selected answer is correct
  const isSelectedCorrect = selectedValue !== undefined && selectedValue === correctValue;

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
        {options.map((option) => {
          const isOptionSelected = selectedValue === option.value;
          const isOptionCorrect = option.isCorrect === true;
          
          // Determine the background color based on review mode and selected status
          let bgColor = "transparent";
          let textColor = isDarkMode ? color.gray200 : color.gray800;
          let radioColor = isDarkMode ? color.emerald400 : color.emerald600;
          let checkedRadioColor = isDarkMode ? color.emerald300 : color.emerald500;
          
          if (isReview) {
            // When in review mode
            if (isOptionSelected && !isOptionCorrect) {
              // Incorrect answer selected by the user
              bgColor = isDarkMode ? alpha(color.red800, 0.2) : "#FFF2F2";
              textColor = isDarkMode ? color.red100 : color.red900;
              radioColor = isDarkMode ? color.red400 : color.red600;
              checkedRadioColor = isDarkMode ? color.red300 : color.red500;
            } else if (isOptionCorrect) {
              // Correct answer (whether selected or not)
              bgColor = isDarkMode ? alpha(color.green800, 0.2) : "#F2FFF5";
              textColor = isDarkMode ? color.green100 : color.green900;
              radioColor = isDarkMode ? color.green400 : color.green600;
              checkedRadioColor = isDarkMode ? color.green300 : color.green500;
            } else if (isOptionSelected) {
              // Selected but not marked as correct/incorrect (should not happen in proper implementation)
              bgColor = isDarkMode ? alpha(color.emerald700, 0.3) : alpha(color.emerald200, 0.7);
            }
          } else {
            // Normal mode
            if (isOptionSelected) {
              bgColor = isDarkMode ? alpha(color.emerald700, 0.3) : alpha(color.emerald200, 0.7);
            }
          }

          return (
            <FormControlLabel
              key={option.value}
              sx={{
                my: 0.5,
                p: { xs: 0.75, md: 1 },
                borderRadius: 2,
                transition: "all 0.2s ease",
                bgcolor: bgColor,
                "&:hover": !isReview ? {
                  bgcolor: isDarkMode
                    ? alpha(color.emerald800, 0.2)
                    : alpha(color.emerald100, 0.5),
                  transform: "translateX(4px)"
                } : {},
                position: 'relative',
                display: 'flex'
              }}
              control={
                <Radio
                  value={option.value}
                  size={size || (isMobile ? "small" : "medium")}
                  sx={{
                    color: radioColor,
                    "&.Mui-checked": {
                      color: checkedRadioColor,
                    },
                  }}
                  disabled={disabled || isReview}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: textColor,
                      fontWeight: isOptionSelected ? 500 : 400
                    }}
                  >
                    {option.label}
                  </Typography>
                  
                  {isReview && isOptionSelected && !isOptionCorrect && (
                    <CancelIcon 
                      sx={{ 
                        color: isDarkMode ? color.red300 : color.red600,
                        ml: 1,
                        fontSize: 20
                      }} 
                    />
                  )}
                  
                  {isReview && isOptionCorrect && (
                    <CheckCircleIcon 
                      sx={{ 
                        color: isDarkMode ? color.green300 : color.green600,
                        ml: 1,
                        fontSize: 20
                      }} 
                    />
                  )}
                </Box>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}