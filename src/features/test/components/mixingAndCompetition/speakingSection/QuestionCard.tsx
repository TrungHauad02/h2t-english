import { Box, Paper, Typography, Card } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import useColor from "theme/useColor";

interface QuestionCardProps {
  content: string;
  isDarkMode: boolean;
}

export default function QuestionCard({ content, isDarkMode }: QuestionCardProps) {
  const color = useColor();

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: "12px",
        backgroundColor: isDarkMode ? color.gray700 : color.gray50,
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
        mb: 4,
        position: "relative",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-20px",
          left: "24px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDarkMode ? color.teal700 : color.teal500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <QuestionAnswerIcon
          sx={{ color: isDarkMode ? color.teal200 : color.white }}
        />
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? color.gray100 : color.gray800,
          fontSize: { xs: "1rem", sm: "1.1rem" },
          lineHeight: 1.6,
          pt: 2,
          fontWeight: 400,
          "& strong": {
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: 600,
          },
        }}
      >
        {content || "No content available"}
      </Typography>
    </Card>
  );
}