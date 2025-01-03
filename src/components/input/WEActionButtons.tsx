import { Box, Stack } from "@mui/material";
import { WEButton } from "components/input";
import useColor from "theme/useColor";

interface WEActionButtonsProps {
  isSubmit: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onShowExplain?: () => void;
  size?: "small" | "medium" | "large";
}

export default function WEActionButtons({
  isSubmit,
  onSubmit,
  onReset,
  onShowExplain,
  size,
}: WEActionButtonsProps) {
  const color = useColor();

  if (isSubmit) {
    return (
      <Stack direction={"row"} spacing={2}>
        {onShowExplain && (
          <WEButton
            bgcolor={color.btnShowExplainBg}
            hoverBgcolor={color.btnShowExplainHoverBg}
            color={color.white}
            onClick={onShowExplain}
            sx={{ width: "150px" }}
            size={size}
          >
            Show explain
          </WEButton>
        )}
        <WEButton
          bgcolor={color.gray500}
          hoverBgcolor={color.gray600}
          color={color.white}
          onClick={onReset}
          sx={{ width: "100px" }}
          size={size}
        >
          Reset
        </WEButton>
      </Stack>
    );
  }

  return (
    <Box>
      <WEButton
        bgcolor={color.btnSubmitBg}
        hoverBgcolor={color.btnSubmitHoverBg}
        color={color.white}
        onClick={onSubmit}
        size={size}
      >
        Submit
      </WEButton>
    </Box>
  );
}
