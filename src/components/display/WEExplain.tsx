import { alpha, Box, Stack, SxProps, Theme, Typography } from "@mui/material";
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
    my: 3,
    p: 3,
    borderRadius: 3,
    borderLeft: `6px solid ${isDarkMode ? color.emerald400 : color.emerald500}`,
      
    bgcolor: isDarkMode
      ? alpha(color.teal800, 0.5)
      : alpha(color.emerald100, 0.7),
    ...sx,
  };

  return (
    <Stack sx={complexSx}>
      <Typography variant="subtitle1" sx={{ lineHeight: 1.6 }}>
        <Box
          component="span"
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? color.emerald300 : color.emerald700,
            display: "block",
            mb: 1,
          }}
        >
          Explanation:
        </Box>
        <Box
          component="span"
          sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
        >
          {text}
        </Box>
      </Typography>
    </Stack>
  );
}
