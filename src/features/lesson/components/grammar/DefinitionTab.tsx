import React from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Box, Typography, Paper, useMediaQuery, Button } from "@mui/material";
import { Info as InfoIcon, School as SchoolIcon } from "@mui/icons-material";

interface DefinitionTabProps {
  definition: string;
  theme: any;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function DefinitionTab({
  definition,
  theme,
  setCurrentTab,
}: DefinitionTabProps) {
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
        background: `radial-gradient(circle at top right, ${theme.definitionBackground}, ${theme.paper} 70%)`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: isDarkMode ? color.gray700 : color.white,
            borderRadius: "50%",
            padding: 1.5,
            boxShadow: theme.shadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <InfoIcon
            sx={{
              color: theme.accent,
              fontSize: 28,
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 1.5,
              color: theme.primaryText,
              borderBottom: `2px solid ${theme.accent}30`,
              pb: 0.5,
              display: "inline-block",
            }}
          >
            Definition
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.primaryText,
              lineHeight: 1.8,
              fontSize: "1.05rem",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: -20,
                top: 10,
                bottom: 0,
                width: 3,
                backgroundColor: `${theme.accent}60`,
                borderRadius: 4,
              },
            }}
          >
            {definition}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => setCurrentTab(1)}
          endIcon={<SchoolIcon />}
          sx={{
            backgroundColor: theme.accent,
            "&:hover": {
              backgroundColor: isDarkMode ? color.teal500 : color.teal700,
            },
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 2,
            py: 0.75,
          }}
        >
          See Example
        </Button>
      </Box>
    </Paper>
  );
}
