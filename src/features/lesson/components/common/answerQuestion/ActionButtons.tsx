import { Box, Stack } from "@mui/material";
import { WEButton } from "components/input";
import useColor from "theme/useColor";

interface ActionButtonsProps {
  isSubmit: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onShowExplain: () => void;
}

export default function ActionButtons({
  isSubmit,
  onSubmit,
  onReset,
  onShowExplain,
}: ActionButtonsProps) {
  const color = useColor();

  if (isSubmit) {
    return (
      <Stack direction={"row"} spacing={2}>
        <WEButton
          bgcolor={color.btnShowExplainBg}
          hoverBgcolor={color.btnShowExplainHoverBg}
          color={color.white}
          onClick={onShowExplain}
          sx={{ width: "150px" }}
        >
          Show explain
        </WEButton>
        <WEButton
          bgcolor={color.gray500}
          hoverBgcolor={color.gray600}
          color={color.white}
          onClick={onReset}
          sx={{ width: "100px" }}
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
      >
        Submit
      </WEButton>
    </Box>
  );
}
