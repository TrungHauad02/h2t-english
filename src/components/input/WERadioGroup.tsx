import {
  FormLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  alpha,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../../redux/slices/aqSlice";
import { RootState } from "../../redux/type";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface WERadioGroupProps {
  label?: string;
  name: number;
  options: {
    value: string | number;
    label: string;
  }[];
  size?: "small" | "medium";
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  isShowExplain?: boolean;
  correctAnswerId?: string | number;
}

export default function WERadioGroup({
  label,
  name,
  options,
  size,
  onChange,
  disabled = false,
  isShowExplain = false,
  correctAnswerId,
}: WERadioGroupProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const dispatch = useDispatch();

  const selectedAnswers = useSelector(
    (state: RootState) => state.aq.selectedAnswers
  );
  const selectedAnswer = selectedAnswers.find(
    (answer) => answer.questionId === name
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    dispatch(
      selectAnswer({
        questionId: name,
        answerId: parseInt(event.target.value, 10),
      })
    );
  };

  const getOptionStyle = (optionValue: string | number) => {
    const isSelected = selectedAnswer?.answerId === optionValue;
    const isCorrect = correctAnswerId === optionValue;
    const isUserWrong = isShowExplain && isSelected && !isCorrect;

    if (isShowExplain) {
      if (isCorrect) {
        // Correct answer - green highlight
        return {
          bgcolor: isDarkMode
            ? alpha(color.successDarkMode, 0.2)
            : alpha(color.success, 0.15),
          border: `2px solid ${isDarkMode ? color.successDarkMode : color.success}`,
          fontWeight: 700,
        };
      } else if (isUserWrong) {
        // User's wrong answer - red highlight
        return {
          bgcolor: isDarkMode
            ? alpha(color.errorDarkMode, 0.2)
            : alpha(color.error, 0.15),
          border: `2px solid ${isDarkMode ? color.errorDarkMode : color.error}`,
          fontWeight: 700,
        };
      }
    }

    // Default styling
    return {
      bgcolor: isSelected
        ? isDarkMode
          ? alpha(color.emerald700, 0.3)
          : alpha(color.emerald200, 0.7)
        : "transparent",
      border: "2px solid transparent",
      fontWeight: isSelected ? 600 : 400,
    };
  };

  const getTextColor = (optionValue: string | number) => {
    const isSelected = selectedAnswer?.answerId === optionValue;
    const isCorrect = correctAnswerId === optionValue;
    const isUserWrong = isShowExplain && isSelected && !isCorrect;

    if (isShowExplain) {
      if (isCorrect) {
        return isDarkMode ? color.successDarkMode : color.success;
      } else if (isUserWrong) {
        return isDarkMode ? color.errorDarkMode : color.error;
      }
    }

    return isDarkMode ? color.gray200 : color.gray800;
  };

  const getIcon = (optionValue: string | number) => {
    if (!isShowExplain) return null;

    const isSelected = selectedAnswer?.answerId === optionValue;
    const isCorrect = correctAnswerId === optionValue;
    const isUserWrong = isSelected && !isCorrect;

    if (isCorrect) {
      return (
        <CheckCircleIcon
          sx={{
            color: isDarkMode ? color.successDarkMode : color.success,
            fontSize: 20,
            ml: 1,
          }}
        />
      );
    } else if (isUserWrong) {
      return (
        <CancelIcon
          sx={{
            color: isDarkMode ? color.errorDarkMode : color.error,
            fontSize: 20,
            ml: 1,
          }}
        />
      );
    }

    return null;
  };

  return (
    <FormControl fullWidth>
      {label && (
        <FormLabel
          sx={{ color: isDarkMode ? color.emerald300 : color.emerald700 }}
        >
          {label}
        </FormLabel>
      )}
      <RadioGroup
        value={selectedAnswer?.answerId?.toString() || ""}
        name={name.toString()}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            sx={{
              my: 0.25,
              p: 1.5,
              borderRadius: 3,
              transition: "all 0.3s ease",
              ...getOptionStyle(option.value),
              "&:hover": !isShowExplain
                ? {
                    bgcolor: isDarkMode
                      ? alpha(color.emerald800, 0.2)
                      : alpha(color.emerald100, 0.5),
                  }
                : {},
            }}
            control={
              <Radio
                value={option.value}
                size={size}
                sx={{
                  color: isDarkMode ? color.emerald400 : color.emerald600,
                  "&.Mui-checked": {
                    color: isDarkMode ? color.emerald300 : color.emerald500,
                  },
                }}
                disabled={disabled || isShowExplain}
              />
            }
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: getTextColor(option.value),
                    fontWeight: getOptionStyle(option.value).fontWeight,
                    flex: 1,
                  }}
                >
                  {option.label}
                </Typography>
                {getIcon(option.value)}
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}