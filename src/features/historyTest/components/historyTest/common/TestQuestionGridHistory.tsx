import React from "react";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import DescriptionIcon from '@mui/icons-material/Description';

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
  isTitle
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

    questionItems.forEach(item => {
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

    const neutralBg = isDarkMode ? color.gray700 : color.gray100;
    const neutralBorder = isDarkMode ? color.gray600 : color.gray300;
    const neutralText = isDarkMode ? color.gray300 : color.gray600;

    if (!item.isAnswered) {
      return {
        bg: neutralBg,
        border: neutralBorder,
        text: neutralText
      };
    }

    if (
      item.partType === TestPartTypeEnum.SPEAKING ||
      item.partType === TestPartTypeEnum.WRITING
    ) {
      return {
        bg: correctColor,
        border: borderCorrect,
        text: textCorrect
      };
    }

    if (item.isCorrect) {
      return {
        bg: correctColor,
        border: borderCorrect,
        text: textCorrect
      };
    } else {
      return {
        bg: wrongColor,
        border: borderWrong,
        text: textWrong
      };
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
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: isDarkMode ? color.gray200 : color.gray800,
          mb: 2
        }}
      >
        Answer Summary
      </Typography>

      <Divider sx={{ mb: 2, borderColor: isDarkMode ? color.gray700 : color.gray300 }} />

      {Object.entries(questionsByType).map(([section, items]) => {
        if (items.length === 0) return null;

        const sectionName = (() => {
          switch(section) {
            case 'VOCABULARY': return 'Vocabulary';
            case 'GRAMMAR': return 'Grammar';
            case 'READING': return 'Reading';
            case 'LISTENING': return 'Listening';
            case 'SPEAKING': return 'Speaking';
            case 'WRITING': return 'Writing';
            default: return section;
          }
        })();

        return (
          <Box key={section} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: isDarkMode ? color.gray200 : color.gray800,
              }}
            >
              <DescriptionIcon fontSize="small" />
              {sectionName}
            </Typography>

            <Grid container spacing={{ xs: 0.5, sm: 1 }} justifyContent="flex-start">
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
                      mb: 0.5
                    }}
                    onClick={() => onQuestionSelect(item)}
                  >
                    <Stack
                      sx={{
                        minWidth: 32,
                        height: 32,
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        borderRadius: "8px",
                        bgcolor: colors.bg,
                        border: '1px solid',
                        borderColor: colors.border,
                        color: colors.text,
                        cursor: 'pointer',
                      }}
                    >
                      {item.serialNumber}
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default TestQuestionGridHistory;
