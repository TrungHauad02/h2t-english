import { Typography, Box } from "@mui/material";
import useColor from "theme/useColor";
import { Quote } from "../types";
import { useDarkMode } from "hooks/useDarkMode";

interface QuoteSectionProps {
  quote: Quote;
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.emerald200 : color.emerald100,
        padding: "2rem",
        marginX: "5%",
        marginY: "1rem",
        borderRadius: "1rem",
        boxShadow: `0px 4px 12px ${color.emerald800}80`,
        border: `2px solid ${isDarkMode ? color.emerald500 : color.emerald700}`,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        component="p"
        sx={{
          color: color.emerald800,
          fontWeight: "bold",
          marginBottom: "1rem",
          fontStyle: "italic",
        }}
      >
        "{quote.speech}" - {quote.author}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          color: color.emerald700,
          fontSize: "1.2rem",
          fontWeight: "500",
          lineHeight: 1.6,
        }}
      >
        Keep learning, growing, and achieving your goals!
      </Typography>
    </Box>
  );
}
