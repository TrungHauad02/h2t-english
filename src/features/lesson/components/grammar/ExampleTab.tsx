import React from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Box, Typography, Paper, Button, useMediaQuery } from "@mui/material";
import {
  Info as InfoIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  FormatQuote as FormatQuoteIcon,
} from "@mui/icons-material";

interface ExampleTabProps {
  example: string;
  theme: any;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function ExampleTab({
  example,
  theme,
  setCurrentTab,
}: ExampleTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper
      elevation={0}
      sx={{
        padding: isMobile ? 2 : 3,
        backgroundColor: theme.paper,
        borderRadius: "12px",
        border: `1px solid ${theme.divider}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: isDarkMode ? color.gray700 : color.white,
              borderRadius: "50%",
              padding: 1.5,
              boxShadow: theme.shadow,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon
              sx={{
                color: theme.secondaryAccent,
                fontSize: 28,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: theme.primaryText,
              borderBottom: `2px solid ${theme.secondaryAccent}30`,
              pb: 0.5,
              display: "inline-block",
            }}
          >
            Example
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 3,
          backgroundColor: theme.exampleBackground,
          borderRadius: "10px",
          position: "relative",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.1)",
          border: `1px solid ${isDarkMode ? color.gray700 : color.teal100}`,
        }}
      >
        <FormatQuoteIcon
          sx={{
            position: "absolute",
            top: -15,
            left: -15,
            color: `${theme.secondaryAccent}40`,
            fontSize: 50,
            transform: "rotate(180deg)",
          }}
        />
        <FormatQuoteIcon
          sx={{
            position: "absolute",
            bottom: -15,
            right: -15,
            color: `${theme.secondaryAccent}40`,
            fontSize: 50,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            color: theme.primaryText,
            lineHeight: 1.8,
            position: "relative",
            zIndex: 2,
            fontSize: "1.05rem",
            fontWeight: 500,
          }}
        >
          {example}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setCurrentTab(0)}
          startIcon={<InfoIcon />}
          sx={{
            borderColor: theme.divider,
            color: theme.secondaryText,
            "&:hover": {
              borderColor: theme.accent,
              backgroundColor: `${theme.accent}10`,
            },
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Definition
        </Button>
        <Button
          variant="contained"
          onClick={() => setCurrentTab(2)}
          endIcon={<LightbulbIcon />}
          sx={{
            backgroundColor: theme.secondaryAccent,
            "&:hover": {
              backgroundColor: isDarkMode ? color.emerald500 : color.emerald700,
            },
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Show Tips
        </Button>
      </Box>
    </Paper>
  );
}
