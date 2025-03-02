import React from "react";
import { Box, Typography } from "@mui/material";
import { WritingAnswer } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { MissingWordInput } from "./MissingWordInput";
import useWritingParagraph from "./useWritingParagraph";
import WEActionButtons from "components/input/WEActionButtons";
import { WEConfirmDialog, WEScoreDialog } from "components/display";

interface WritingParagraphProps {
  paragraph: string;
  writingAnswer: WritingAnswer[];
}

export default function WritingParagraph({
  paragraph,
  writingAnswer,
}: WritingParagraphProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useWritingParagraph(paragraph, writingAnswer);

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        p: 3,
        backgroundColor: backgroundColor,
        borderRadius: 2,
        border: `1px solid ${color.gray300}`,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          color: isDarkMode ? color.teal300 : color.teal500,
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Fill in the Blanks
      </Typography>

      <Typography
        variant="body1"
        component="p"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray800,
          mb: 3,
          fontStyle: "italic",
        }}
      >
        Read the paragraph below and fill in the missing words. Each blank
        represents a word that has been removed. Type your answer in the input
        boxes provided.
      </Typography>

      <Typography
        variant="body1"
        component="div"
        sx={{ color: textColor, whiteSpace: "pre-wrap" }}
      >
        {hooks.words.map((word, index) => (
          <React.Fragment key={`word-${index}`}>
            {hooks.missingWordMap[index] ? (
              <MissingWordInput
                value={hooks.userAnswers[index] || ""}
                onChange={(value) => hooks.handleInputChange(index, value)}
              />
            ) : (
              <span>{word} </span>
            )}
          </React.Fragment>
        ))}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <WEActionButtons
          isSubmit={!!hooks.score}
          onSubmit={hooks.onShowConfirm}
          onReset={hooks.onReset}
          onShowExplain={hooks.onShowExplain}
          size="large"
        />
      </Box>
      {hooks.isShowConfirm && (
        <WEConfirmDialog
          isShowConfirm={hooks.isShowConfirm}
          onShowConfirm={hooks.onShowConfirm}
          onSubmit={hooks.onSubmit}
          numberAnswered={hooks.getNumberAnswered()}
          numberOfQuestions={writingAnswer.length}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={writingAnswer.length}
        />
      )}
    </Box>
  );
}
