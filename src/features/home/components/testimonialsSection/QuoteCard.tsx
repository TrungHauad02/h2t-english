import { Box, Typography, alpha, Divider, Chip, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Quote } from "interfaces";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface QuoteCardProps {
  quote: Quote;
  index: number;
  isFeatured?: boolean;
}

export default function QuoteCard({
  quote,
  index,
  isFeatured = false,
}: QuoteCardProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const cardVariations = [
    {
      bgGradient: `linear-gradient(135deg, ${alpha(
        color.teal500,
        isDarkMode ? 0.15 : 0.1
      )}, ${alpha(color.teal700, isDarkMode ? 0.05 : 0.03)})`,
      accentColor: color.teal400,
      quoteIconColor: color.teal300,
    },
    {
      bgGradient: `linear-gradient(135deg, ${alpha(
        color.emerald500,
        isDarkMode ? 0.15 : 0.1
      )}, ${alpha(color.emerald700, isDarkMode ? 0.05 : 0.03)})`,
      accentColor: color.emerald400,
      quoteIconColor: color.emerald300,
    },
    {
      bgGradient: `linear-gradient(135deg, ${alpha(
        color.green500,
        isDarkMode ? 0.15 : 0.1
      )}, ${alpha(color.green700, isDarkMode ? 0.05 : 0.03)})`,
      accentColor: color.green400,
      quoteIconColor: color.green300,
    },
    {
      bgGradient: `linear-gradient(135deg, ${alpha(
        color.teal600,
        isDarkMode ? 0.2 : 0.15
      )}, ${alpha(color.emerald600, isDarkMode ? 0.05 : 0.03)})`,
      accentColor: color.teal500,
      quoteIconColor: color.teal400,
    },
    {
      bgGradient: `linear-gradient(135deg, ${alpha(
        color.emerald600,
        isDarkMode ? 0.2 : 0.15
      )}, ${alpha(color.green600, isDarkMode ? 0.05 : 0.03)})`,
      accentColor: color.emerald500,
      quoteIconColor: color.emerald400,
    },
  ];

  const variation = cardVariations[index % cardVariations.length];

  return (
    <Card
      elevation={isFeatured ? 3 : 2}
      sx={{
        height: "100%",
        borderRadius: "16px",
        background: variation.bgGradient,
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha(variation.accentColor, 0.2)}`,
        boxShadow: isDarkMode
          ? `0 10px 15px -3px ${alpha(
              color.black,
              0.2
            )}, 0 4px 6px -4px ${alpha(color.black, 0.2)}`
          : `0 10px 15px -3px ${alpha(
              color.black,
              0.1
            )}, 0 4px 6px -4px ${alpha(color.black, 0.05)}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: isDarkMode
            ? `0 20px 25px -5px ${alpha(
                color.black,
                0.3
              )}, 0 8px 10px -6px ${alpha(color.black, 0.3)}`
            : `0 20px 25px -5px ${alpha(
                color.black,
                0.1
              )}, 0 8px 10px -6px ${alpha(color.black, 0.1)}`,
        },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        p: 0,
      }}
    >
      {/* Featured badge for special quotes */}
      {isFeatured && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: -30,
            transform: "rotate(45deg)",
            width: 120,
            textAlign: "center",
            backgroundColor: isDarkMode
              ? alpha(variation.accentColor, 0.8)
              : variation.accentColor,
            color: isDarkMode ? color.gray900 : color.white,
            fontSize: "0.7rem",
            fontWeight: "bold",
            py: 0.5,
            zIndex: 10,
            boxShadow: `0 2px 4px ${alpha(color.black, 0.2)}`,
          }}
        >
          FEATURED
        </Box>
      )}

      {/* Header with category */}
      <Box
        sx={{
          p: 2,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          label={quote.category}
          size="small"
          sx={{
            backgroundColor: isDarkMode
              ? alpha(variation.accentColor, 0.2)
              : alpha(variation.accentColor, 0.1),
            color: isDarkMode ? variation.accentColor : color.teal700,
            fontWeight: 500,
            textTransform: "uppercase",
            fontSize: "0.7rem",
            letterSpacing: 0.5,
            border: `1px solid ${alpha(variation.accentColor, 0.3)}`,
            height: 24,
          }}
        />

        <FormatQuoteIcon
          sx={{
            fontSize: isFeatured ? 32 : 28,
            color: alpha(variation.quoteIconColor, 0.5),
            transform: "rotate(180deg)",
          }}
        />
      </Box>

      {/* Quote content */}
      <Box
        sx={{
          p: 2,
          pt: 0.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            fontSize: isFeatured
              ? { xs: "1.1rem", md: "1.2rem" }
              : { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.6,
            color: isDarkMode ? color.gray200 : color.gray800,
            mb: 2,
            fontWeight: isFeatured ? 500 : 400,
            flexGrow: 1,
          }}
        >
          "{quote.quote}"
        </Typography>

        <Divider
          sx={{
            my: 2,
            opacity: 0.3,
            borderColor: alpha(variation.accentColor, 0.3),
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? variation.accentColor : color.teal700,
                fontSize: isFeatured ? "1rem" : "0.95rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isFeatured && (
                <AutoAwesomeIcon
                  sx={{
                    fontSize: 16,
                    mr: 0.8,
                    color: isDarkMode ? color.teal300 : color.teal500,
                  }}
                />
              )}
              {quote.author}
            </Typography>
          </Box>

          {/* Decorative corner accent */}
          <Box
            sx={{
              width: 15,
              height: 15,
              borderRight: `2px solid ${alpha(variation.accentColor, 0.5)}`,
              borderBottom: `2px solid ${alpha(variation.accentColor, 0.5)}`,
              opacity: 0.8,
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}
