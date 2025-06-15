import { Box, Card, Divider, Fade, Slide } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { WritingAnswer } from "interfaces";
import useColor from "theme/useColor";
import useWritingParagraph from "./useWritingParagraph";
import { WEConfirmDialog, WEScoreDialog } from "components/display";
import {
  ParagraphHeader,
  ParagraphContent,
  ParagraphFooter,
  WordBankSection,
} from "./paragraphComponents";

interface WritingParagraphProps {
  paragraph: string;
  writingAnswers: WritingAnswer[];
}

export default function WritingParagraph({
  paragraph,
  writingAnswers,
}: WritingParagraphProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useWritingParagraph(paragraph, writingAnswers);

  const paragraphPreview = hooks.renderParagraphWithBlanks();

  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const backgroundPrimary = isDarkMode ? color.gray900 : color.gray50;

  if (!paragraphPreview) return null;

  const completionPercentage = Math.round(
    (hooks.getNumberAnswered() / writingAnswers.length) * 100
  );

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          px: { xs: 1, md: 2 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card
          elevation={1}
          sx={{
            borderRadius: "16px",
            overflow: "visible",
            backgroundColor: backgroundPrimary,
            border: `1px solid ${borderColor}`,
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: isDarkMode
                ? "0 8px 24px rgba(0,0,0,0.3)"
                : "0 8px 24px rgba(15,118,110,0.08)",
            },
          }}
        >
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <ParagraphHeader completionPercentage={completionPercentage} />

            <Divider
              sx={{
                mb: 3,
                borderColor: isDarkMode ? color.gray600 : color.gray300,
              }}
            />

            {hooks.sortedAnswers.length > 0 && (
              <Slide direction="up" in timeout={500}>
                <Box>
                  <WordBankSection
                    writingAnswers={writingAnswers}
                    userAnswers={hooks.userAnswers}
                  />
                </Box>
              </Slide>
            )}

            <ParagraphContent
              displayWords={paragraphPreview.displayWords}
              hooks={hooks}
            />

            {hooks.sortedAnswers.length > 0 && (
              <Slide direction="up" in timeout={600}>
                <Box>
                  <ParagraphFooter
                    writingAnswers={writingAnswers}
                    hooks={hooks}
                  />
                </Box>
              </Slide>
            )}
          </Box>
        </Card>

        {hooks.isShowConfirm && (
          <WEConfirmDialog
            isShowConfirm={hooks.isShowConfirm}
            onShowConfirm={hooks.onShowConfirm}
            onSubmit={hooks.onSubmit}
            numberAnswered={hooks.getNumberAnswered()}
            numberOfQuestions={writingAnswers.length}
          />
        )}

        {hooks.isShowScoreDialog && (
          <WEScoreDialog
            score={hooks.score ? hooks.score.toString() : null}
            isShowScoreDialog={hooks.isShowScoreDialog}
            onCloseScoreDialog={hooks.onCloseScoreDialog}
            numberOfQuestions={writingAnswers.length}
          />
        )}
      </Box>
    </Fade>
  );
}
