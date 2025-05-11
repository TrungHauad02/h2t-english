import { Grid, Box } from "@mui/material";
import { Quote } from "interfaces";
import QuoteCard from "./QuoteCard";

interface QuoteGridProps {
  quotes: Quote[];
}

export default function QuoteGrid({ quotes }: QuoteGridProps) {
  // Custom grid layout for 5 quotes
  const gridLayout = [
    { xs: 12, md: 6 },
    { xs: 12, md: 6 },
    { xs: 12, md: 4 },
    { xs: 12, md: 4 },
    { xs: 12, md: 4 },
  ];

  return (
    <Box
      sx={{
        opacity: 1,
        animation: "fadeIn 0.6s ease-out",
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }}
    >
      <Grid container spacing={3}>
        {quotes.slice(0, 5).map((quote, index) => (
          <Grid
            item
            {...gridLayout[index]}
            key={`${quote.author}-${index}`}
            sx={{
              opacity: 1,
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <QuoteCard quote={quote} index={index} isFeatured={index < 2} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
