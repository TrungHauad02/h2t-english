import { Box, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Vocabulary } from "interfaces";

interface FrontCardProps {
  vocab: Vocabulary;
}

export default function FrontCard({ vocab }: FrontCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: "1.25rem",
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 10px 25px rgba(0,0,0,0.3)"
          : "0 8px 20px rgba(0,0,0,0.15)",
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDarkMode
            ? "0 15px 30px rgba(0,0,0,0.4)"
            : "0 12px 28px rgba(0,0,0,0.2)",
        },
      }}
    >
      <img
        src={vocab.image}
        alt={vocab.word}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.85)",
          transition: "filter 0.3s ease, transform 0.5s ease",
        }}
      />
      <Box
        className="word-overlay"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          background: `linear-gradient(0deg, ${
            isDarkMode ? color.gray900 + "CC" : color.gray800 + "99"
          } 0%, transparent 40%, transparent 60%, ${
            isDarkMode ? color.gray900 + "CC" : color.gray800 + "99"
          } 100%)`,
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: color.white,
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
            letterSpacing: "0.05em",
            mb: 1,
            transform: "translateY(0)",
            transition:
              "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {vocab.word}
        </Typography>
        <Box
          sx={{
            display: "inline-block",
            px: 2,
            py: 0.5,
            borderRadius: "2rem",
            backgroundColor: isDarkMode
              ? `${color.teal700}CC`
              : `${color.teal600}CC`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: color.white,
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: "medium",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.75rem",
            }}
          >
            {vocab.wordType}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(${
            isDarkMode ? color.gray900 + "CC" : color.gray800 + "99"
          }, transparent)`,
          opacity: 0.6,
        }}
      />
    </Box>
  );
}
