import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WEExplainProps {
  text: string;
  sx?: SxProps<Theme>;
}

export default function WEExplain({ text, sx }: WEExplainProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const complexSx = {
    m: 2,
    p: 2,
    borderRadius: 4,
    width: { xs: "80%", sm: "100%" },
    ...sx,
    bgcolor: isDarkMode ? color.teal800 : color.emerald200,
  };

  return (
    <Stack sx={complexSx}>
      <Typography variant="subtitle1">
        <span style={{ fontWeight: "bold" }}>Explain:</span> {text}
      </Typography>
    </Stack>
  );
}
