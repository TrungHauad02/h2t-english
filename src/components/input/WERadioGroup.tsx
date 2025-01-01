import {
  FormLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../../redux/slices/aqSlice";
import { RootState } from "../../redux/type";

interface WERadioGroupProps {
  label?: string;
  name: string;
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
        answerId: event.target.value,
      })
    );
  };

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        value={selectedAnswer?.answerId || ""}
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={<Radio value={option.value} size={size} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
