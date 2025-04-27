import { Box, Typography, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { WritingAnswer } from "interfaces";
import useColor from "theme/useColor";
import WEActionButtons from "components/input/WEActionButtons";

interface ParagraphFooterProps {
  writingAnswers: WritingAnswer[];
  hooks: any; // Using any for simplicity
}

export default function ParagraphFooter({
  writingAnswers,
  hooks,
}: ParagraphFooterProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 4,
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          color={textColor}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? color.teal300 : color.teal700,
            }}
          >
            Questions:
          </Box>
          <Chip
            label={`${hooks.getNumberAnswered()} / ${writingAnswers.length}`}
            size="small"
            sx={{
              fontWeight: 600,
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
              color: textColor,
              border: `1px solid ${borderColor}`,
            }}
          />
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <WEActionButtons
          isSubmit={!!hooks.score}
          onSubmit={hooks.onShowConfirm}
          onReset={hooks.onReset}
          onShowExplain={hooks.onShowExplain}
          size="large"
        />
      </Box>
    </Box>
  );
}
