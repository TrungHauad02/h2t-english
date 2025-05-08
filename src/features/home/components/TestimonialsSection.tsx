import { Box, Container, useMediaQuery, useTheme, alpha } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState } from "react";
import { Quote } from "interfaces";
import { quoteService } from "services/features/quoteService";
import {
  QuoteCarousel,
  QuoteGrid,
  SectionHeader,
  QuoteLoading,
} from "./testimonialsSection";

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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const resData = await quoteService.getRandomQuote();
        setQuotes(resData.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setQuotes([
          {
            quote: "The limits of my language mean the limits of my world.",
            author: "Ludwig Wittgenstein",
            category: "Philosophy",
          },
          {
            quote:
              "To learn a language is to have one more window from which to look at the world.",
            author: "Chinese Proverb",
            category: "Wisdom",
          },
          {
            quote:
              "Language is the road map of a culture. It tells you where its people come from and where they are going.",
            author: "Rita Mae Brown",
            category: "Culture",
          },
          {
            quote:
              "One language sets you in a corridor for life. Two languages open every door along the way.",
            author: "Frank Smith",
            category: "Education",
          },
          {
            quote: "The more languages you know, the more you are human.",
            author: "Tomáš Garrigue Masaryk",
            category: "Inspiration",
          },
        ]);
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
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: isDarkMode
            ? `linear-gradient(90deg, ${alpha(color.teal700, 0.3)} 0%, ${alpha(
                color.emerald700,
                0.3
              )} 50%, ${alpha(color.teal700, 0.3)} 100%)`
            : `linear-gradient(90deg, ${alpha(color.teal300, 0.5)} 0%, ${alpha(
                color.emerald300,
                0.5
              )} 50%, ${alpha(color.teal300, 0.5)} 100%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader />

        {isLoading ? (
          <QuoteLoading />
        ) : isMobile ? (
          <QuoteCarousel quotes={quotes} />
        ) : (
          <QuoteGrid quotes={quotes} />
        )}
      </Container>
    </Box>
  );
}
