import { Box, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ParagraphPreviewProps {
  isEditMode: boolean;
  preview: {
    modifiedWords: string[];
    highlightPositions: { [key: number]: boolean };
  } | null;
}

export function ParagraphPreview({
  isEditMode,
  preview,
}: ParagraphPreviewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryBgColor = isDarkMode ? color.gray700 : color.gray200;

  if (!preview) return null;

  const { modifiedWords, highlightPositions } = preview;

  const PreviewContent = () => (
    <Box
      sx={{
        wordBreak: "break-word",
        whiteSpace: "normal",
        lineHeight: 1.7,
        "& span": {
          transition: "background-color 0.2s",
          borderRadius: "4px",
          px: 0.5,
        },
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
      }}
    >
      {modifiedWords.map((word, index) => (
        <Box
          component="span"
          key={`word-${index}`}
          sx={
            highlightPositions[index]
              ? {
                  backgroundColor: isDarkMode ? color.teal700 : color.teal200,
                  color: isDarkMode ? color.white : color.black,
                  py: 0.5,
                }
              : {
                  color: textColor,
                }
          }
        >
          {word}{" "}
        </Box>
      ))}
    </Box>
  );

  if (isEditMode) {
    return (
      <Box>
        <Typography variant="subtitle1" color={textColor} sx={{ mb: 1.5 }}>
          Preview with Answers
        </Typography>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: `1px solid ${borderColor}`,
            bgcolor: secondaryBgColor,
          }}
        >
          <PreviewContent />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: 2.5,
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        bgcolor: secondaryBgColor,
      }}
    >
      <PreviewContent />
    </Box>
  );
}
