import {
  FormLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  alpha,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../../redux/slices/aqSlice";
import { RootState } from "../../redux/type";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WERadioGroupProps {
  label?: string;
  name: number;
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
  options,
  size,
  onChange,
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
              p: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              bgcolor:
                selectedAnswer?.answerId === option.value
                  ? isDarkMode
                    ? alpha(color.emerald700, 0.3)
                    : alpha(color.emerald200, 0.7)
                  : "transparent",
              "&:hover": {
                bgcolor: isDarkMode
                  ? alpha(color.emerald800, 0.2)
                  : alpha(color.emerald100, 0.5),
              },
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
              />
            }
            label={
              <Typography
                variant="body1"
                sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
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
