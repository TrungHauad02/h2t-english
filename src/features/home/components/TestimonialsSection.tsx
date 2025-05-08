import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState } from "react";
import { Quote } from "interfaces";
import { quoteService } from "services/features/quoteService";
import { QuoteCarousel, QuoteGrid, SectionHeader } from "./testimonialsSection";

export default function TestimonialsSection() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resData = await quoteService.getRandomQuote();
        setQuotes(resData.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: `linear-gradient(90deg, ${color.teal500} 0%, ${color.emerald500} 50%, ${color.green500} 100%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader />

        {isLoading ? (
          <Box
            sx={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
            >
              Loading inspiring quotes...
            </Typography>
          </Box>
        ) : isMobile ? (
          <QuoteCarousel quotes={quotes} />
        ) : (
          <QuoteGrid quotes={quotes} />
        )}
      </Container>
    </Box>
  );
}
