import React from "react";
import { Box, Typography, Grid, Stack, Divider, Tooltip } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
  isCorrect?: boolean;
}

interface TestQuestionGridHistoryProps {
  questionItems: QuestionItem[];
  onQuestionSelect: (questionItem: QuestionItem) => void;
  isTitle?: boolean;
}

const TestQuestionGridHistory: React.FC<TestQuestionGridHistoryProps> = ({
  questionItems,
  onQuestionSelect,
  isTitle,
}) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const questionsByType = React.useMemo(() => {
    const grouped: Record<TestPartTypeEnum, QuestionItem[]> = {
      [TestPartTypeEnum.VOCABULARY]: [],
      [TestPartTypeEnum.GRAMMAR]: [],
      [TestPartTypeEnum.READING]: [],
      [TestPartTypeEnum.LISTENING]: [],
      [TestPartTypeEnum.SPEAKING]: [],
      [TestPartTypeEnum.WRITING]: [],
    };

    questionItems.forEach((item) => {
      grouped[item.partType].push(item);
    });

    return grouped;
  }, [questionItems]);

  const getColorConfig = (item: QuestionItem) => {
    const correctColor = isDarkMode ? color.green900 : color.green100;
    const wrongColor = isDarkMode ? color.red900 : color.red100;
    const borderCorrect = isDarkMode ? color.green500 : color.green500;
    const borderWrong = isDarkMode ? color.red500 : color.red500;
    const textCorrect = isDarkMode ? color.green100 : color.green700;
    const textWrong = isDarkMode ? color.red100 : color.red700;

  
    if (!item.isAnswered) {
      return {
        bg: wrongColor,
        border: borderWrong,
        text: textWrong,
        icon: <ErrorOutlineIcon fontSize="small" />,
        tooltip: "Not answered",
      };
    }

    if (
      item.partType === TestPartTypeEnum.SPEAKING ||
      item.partType === TestPartTypeEnum.WRITING
    ) {
      return {
        bg: correctColor,
        border: borderCorrect,
        text: textCorrect,
        icon: <CheckCircleOutlineIcon fontSize="small" />,
        tooltip: "Answered",
      };
    }

    if (item.isCorrect) {
      return {
        bg: correctColor,
        border: borderCorrect,
        text: textCorrect,
        icon: <CheckCircleOutlineIcon fontSize="small" />,
        tooltip: "Correct",
      };
    } else {
      return {
        bg: wrongColor,
        border: borderWrong,
        text: textWrong,
        icon: <ErrorOutlineIcon fontSize="small" />,
        tooltip: "Incorrect",
      };
    }
  };

  const getSectionIcon = (sectionType: string) => {
    switch (sectionType) {
      case "VOCABULARY":
        return "📚";
      case "GRAMMAR":
        return "📝";
      case "READING":
        return "📖";
      case "LISTENING":
        return "🎧";
      case "SPEAKING":
        return "🎤";
      case "WRITING":
        return "✍️";
      default:
        return "📄";
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : color.gray300,
        borderRadius: "12px",
        bgcolor: isDarkMode ? color.gray800 : color.white,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: isDarkMode ? color.gray200 : color.gray800,
          mb: 2,
        }}
      >
        Answer Summary
      </Typography>

      <Divider
        sx={{ mb: 2, borderColor: isDarkMode ? color.gray700 : color.gray300 }}
      />

      {Object.entries(questionsByType).map(([section, items]) => {
        if (items.length === 0) return null;

        const sectionName = (() => {
          switch (section) {
            case "VOCABULARY":
              return "Vocabulary";
            case "GRAMMAR":
              return "Grammar";
            case "READING":
              return "Reading";
            case "LISTENING":
              return "Listening";
            case "SPEAKING":
              return "Speaking";
            case "WRITING":
              return "Writing";
            default:
              return section;
          }
        })();

        const sectionIcon = getSectionIcon(section);

        return (
          <Box key={section} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: isDarkMode ? color.teal200 : color.teal700,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{sectionIcon}</span>
              {sectionName}
            </Typography>

            <Grid
              container
              spacing={{ xs: 0.5, sm: 1 }}
              justifyContent="flex-start"
            >
              {items.map((item) => {
                const colors = getColorConfig(item);
                return (
                  <Grid
                    item
                    key={item.questionId}
                    sx={{
                      flexBasis: { xs: "16.666%", sm: "12.5%" },
                      display: "flex",
                      justifyContent: "center",
                      mb: 0.5,
                    }}
                  >
                    <Tooltip title={colors.tooltip} arrow placement="top">
                      <Stack
                        onClick={() => onQuestionSelect(item)}
                        sx={{
                          minWidth: 36,
                          height: 36,
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          borderRadius: "8px",
                          bgcolor: colors.bg,
                          border: "2px solid",
                          borderColor: colors.border,
                          color: colors.text,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        {item.serialNumber}
                      </Stack>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "4px",
              bgcolor: isDarkMode ? color.green900 : color.green100,
              border: "1px solid",
              borderColor: isDarkMode ? color.green500 : color.green500,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
          >
            Correct
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "4px",
              bgcolor: isDarkMode ? color.red900 : color.red100,
              border: "1px solid",
              borderColor: isDarkMode ? color.red500 : color.red500,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
          >
            Incorrect/Not answered
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TestQuestionGridHistory;
