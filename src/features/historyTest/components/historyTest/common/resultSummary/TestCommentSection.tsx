import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CommentIcon from '@mui/icons-material/Comment';

interface TestCommentSectionProps {
  comment: string | undefined;
}

export default function TestCommentSection({ comment }: TestCommentSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!comment) return null;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        borderLeft: `6px solid ${isDarkMode ? color.teal400 : color.teal600}`,
        mb: 4,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <CommentIcon sx={{ 
          color: isDarkMode ? color.teal300 : color.teal600,
          fontSize: 28,
          mr: 1.5
        }} />
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDarkMode ? color.teal200 : color.teal700,
            fontWeight: 600,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -4,
              left: 0,
              width: "40px",
              height: "3px",
              backgroundColor: isDarkMode ? color.teal400 : color.teal500,
              borderRadius: "2px"
            }
          }}
        >
          AI Feedback
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2, backgroundColor: isDarkMode ? color.gray600 : color.gray200 }} />
      
      <Box sx={{ 
        backgroundColor: isDarkMode ? color.gray700 : color.gray50,
        p: 2,
        borderRadius: "0.75rem",
        position: "relative"
      }}>
        <Chip 
          label="Comment"
          size="small"
          sx={{
            position: "absolute",
            top: -12,
            left: 16,
            backgroundColor: isDarkMode ? color.teal700 : color.teal100,
            color: isDarkMode ? color.teal50 : color.teal800,
            fontWeight: 500,
            fontSize: "0.75rem",
            border: `1px solid ${isDarkMode ? color.teal600 : color.teal200}`
          }}
        />
        <Typography 
          variant="body1" 
          sx={{ 
            color: isDarkMode ? color.gray200 : color.gray800,
            lineHeight: 1.6,
            fontStyle: "italic"
          }}
        >
          {comment}
        </Typography>
      </Box>
    </Box>
  );
}