import { useState, useEffect, useRef } from "react";
import { ConfirmationStateType } from "./types";

export default function useConfirmationState(open: boolean) {
  const [state, setState] = useState<ConfirmationStateType>({
    animateWarning: false,
    unlocked: false,
    sliderValue: 0,
    countdown: 3,
    paperShredding: false,
    showDestructionEffect: false,
    hasConfirmed: false,
  });

  const hasConfirmedRef = useRef(false);

  // Reset states when dialog opens/closes
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setState((prev) => ({ ...prev, animateWarning: true }));
      }, 300);

      setState((prev) => ({
        ...prev,
        unlocked: false,
        sliderValue: 0,
        countdown: 3,
        paperShredding: false,
        showDestructionEffect: false,
        hasConfirmed: false,
      }));

      hasConfirmedRef.current = false;
    } else {
      setState((prev) => ({ ...prev, animateWarning: false }));
    }
  }, [open]);

  // Handle slider change
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setState((prev) => ({ ...prev, sliderValue: value }));

    if (value >= 100) {
      setState((prev) => ({ ...prev, unlocked: true }));
    }
  };

  // Start countdown process
  const startCountdown = (onConfirm: () => void) => {
    setState((prev) => ({
      ...prev,
      paperShredding: true,
      showDestructionEffect: true,
    }));

    const countdownTimer = setInterval(() => {
      setState((prev) => {
        if (prev.countdown <= 1) {
          clearInterval(countdownTimer);

          setTimeout(() => {
            if (!hasConfirmedRef.current) {
              hasConfirmedRef.current = true;
              setState((prevState) => ({ ...prevState, hasConfirmed: true }));
              onConfirm();
            }
          }, 500);

          return { ...prev, countdown: 0 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);
  };

  return {
    state,
    setState,
    handleSliderChange,
    startCountdown,
  };
}
