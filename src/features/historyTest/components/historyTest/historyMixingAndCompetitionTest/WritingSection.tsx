import { useEffect, useState, useRef } from "react";
import { Box, Typography, Paper, CircularProgress, Divider, Stack } from "@mui/material";
import { testWritingService } from "services/test";
import { submitTestWritingService, submitCompetitionWritingService } from "services";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WritingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  startSerial: number;
  selectedQuestionId?: number | null;
  setQuestionRef?: (id: number, element: HTMLDivElement | null) => void;
  isCompetitionTest?: boolean;
}

export default function WritingSection({
  testItemIds,
  submitTestId,
  startSerial,
  selectedQuestionId,
  setQuestionRef,
  isCompetitionTest = false,
}: WritingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Record<number, any>>({});
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await testWritingService.getByIds(testItemIds);
        const testItems = res.data || [];
        setItems(testItems);

        const ids = testItems.map((item: any) => item.id);
        const submitRes = isCompetitionTest
          ? await submitCompetitionWritingService.findBySubmitCompetitionIdAndTestWritingIds(submitTestId, ids)
          : await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, ids);

        const map: Record<number, any> = {};
        for (const entry of submitRes.data || []) {
          const key = isCompetitionTest ? entry.CompetitionWriting_id : entry.testWriting_id;
          map[key] = entry;
        }
        setSubmissions(map);
      } catch (err) {
        console.error("Error fetching writing history:", err);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds.length > 0) {
      fetchData();
    }
  }, [testItemIds, submitTestId, isCompetitionTest]);

  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedQuestionId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  return (
    <Stack spacing={4}>
      {items.map((item, idx) => {
        const serial = startSerial + idx;
        const submission = submissions[item.id] || {};
        return (
          <Paper
            key={item.id}
            ref={(el) => {
              questionRefs.current[item.id] = el;
              setQuestionRef && setQuestionRef(item.id, el);
            }}
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '1rem',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              boxShadow: selectedQuestionId === item.id
                ? `0 0 10px ${isDarkMode ? color.teal500 + "80" : color.teal400 + "80"}`
                : '0 4px 12px rgba(0,0,0,0.1)',
              scrollMarginTop: '100px',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1.5, color: isDarkMode ? color.teal200 : color.teal700 }}>
              Question {serial}
            </Typography>

            <Typography sx={{ mb: 2, whiteSpace: "pre-line", color: isDarkMode ? color.gray100 : color.gray900 }}>
              {item.topic}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 1, color: isDarkMode ? color.gray300 : color.gray700 }}>
              Your Response:
            </Typography>

            <Box sx={{
              p: 2,
              borderRadius: '8px',
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
              whiteSpace: "pre-line"
            }}>
              <Typography variant="body1" sx={{ color: isDarkMode ? color.gray100 : color.gray800 }}>
                {submission.content || "(No response submitted)"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" sx={{ color: isDarkMode ? color.green200 : color.green700, mb: 1 }}>
              Score: {submission.score ?? 'N/A'}
            </Typography>

            {submission.comment && (
              <Typography variant="body2" sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}>
                Comment: {submission.comment}
              </Typography>
            )}
          </Paper>
        );
      })}
    </Stack>
  );
}
