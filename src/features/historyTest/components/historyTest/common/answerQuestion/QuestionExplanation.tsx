import { Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface QuestionExplanationProps {
  explanation: string;
  showExplanation: boolean;
}

export default function QuestionExplanation({
  explanation,
  showExplanation,
}: QuestionExplanationProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  if (!showExplanation || !explanation) {
    return null;
  }

  return (
    <Stack
      sx={{
        p: 2,
        bgcolor: isDarkMode ? color.emerald900 : color.emerald50,
        borderTop: `2px solid ${isDarkMode ? color.emerald600 : color.emerald300}`,
        borderRadius: "0 0 20px 20px",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
            mr: 1,
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.emerald300 : color.emerald700,
          }}
        >
          Explanation
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: isDarkMode ? color.gray200 : color.gray700,
          lineHeight: 1.6,
          pl: 2,
        }}
      >
        {explanation}
      </Typography>
    </Stack>
  );
}