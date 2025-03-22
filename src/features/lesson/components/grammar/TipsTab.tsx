import React from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Zoom,
  Button,
  useMediaQuery,
  Chip,
  Divider,
} from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  MenuBook as MenuBookIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

interface TipsTabProps {
  tips: string[];
  theme: any;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function TipsTab({ tips, theme, setCurrentTab }: TipsTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Paper
      elevation={2}
      sx={{
        padding: isMobile ? 2 : 3.5,
        backgroundColor: theme.paper,
        borderRadius: "16px",
        border: `1px solid ${theme.divider}`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "150px",
          height: "150px",
          background: `radial-gradient(circle, ${theme.tertiaryAccent}10 10%, transparent 70%)`,
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
              border: `2px solid ${theme.tertiaryAccent}30`,
            }}
          >
            <MenuBookIcon
              sx={{
                color: theme.tertiaryAccent,
                fontSize: 28,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.primaryText,
                display: "inline-block",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "60%",
                  height: 3,
                  backgroundColor: theme.tertiaryAccent,
                  borderRadius: "2px",
                },
              }}
            >
              Grammar Tips
            </Typography>
            <Typography
              variant="body2"
              color={theme.secondaryText}
              sx={{ mt: 0.5 }}
            >
              Boost your language skills with these essential rules
            </Typography>
          </Box>
        </Box>

        <Chip
          icon={<LightbulbIcon sx={{ fontSize: 16 }} />}
          label={`${tips.length} Tips`}
          size="small"
          sx={{
            backgroundColor: `${theme.tertiaryAccent}20`,
            color: theme.tertiaryAccent,
            fontWeight: 600,
            borderRadius: "8px",
            border: `1px solid ${theme.tertiaryAccent}30`,
          }}
        />
      </Box>

      <Divider sx={{ mb: 3, opacity: 0.6 }} />

      {/* Tips List */}
      <List
        sx={{
          backgroundColor: isDarkMode
            ? `${color.gray900}90`
            : `${color.gray50}90`,
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${theme.divider}`,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tips.map((tip, index) => (
          <Zoom
            in={true}
            style={{
              transitionDelay: `${index * 120}ms`,
            }}
            key={index}
          >
            <ListItem
              alignItems="flex-start"
              sx={{
                padding: "16px 18px",
                borderBottom:
                  index < tips.length - 1
                    ? `1px solid ${theme.divider}`
                    : "none",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? `${color.gray800}`
                    : `${color.gray100}`,
                },
                position: "relative",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 48,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  mt: 0.5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: `${theme.tertiaryAccent}20`,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${theme.tertiaryAccent}30`,
                  }}
                >
                  <CheckCircleIcon
                    sx={{ color: theme.tertiaryAccent, fontSize: 20 }}
                  />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: theme.primaryText,
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    {tip}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.secondaryText,
                      display: "block",
                      mt: 0.5,
                      fontStyle: "italic",
                    }}
                  >
                    {`Grammar tip #${index + 1}`}
                  </Typography>
                }
              />
            </ListItem>
          </Zoom>
        ))}
      </List>

      {/* Example callout */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: theme.exampleBackground,
          borderRadius: "8px",
          border: `1px dashed ${theme.accent}50`,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LightbulbIcon sx={{ color: theme.accent, fontSize: 24 }} />
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray800,
            fontStyle: "italic",
          }}
        >
          Practice makes perfect! Try to apply these grammar rules in your daily
          writing and speaking exercises.
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setCurrentTab(1)}
          startIcon={<ArrowBackIcon />}
          sx={{
            borderColor: theme.divider,
            color: theme.secondaryText,
            "&:hover": {
              borderColor: theme.secondaryAccent,
              backgroundColor: `${theme.secondaryAccent}10`,
            },
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 16px",
            transition: "all 0.3s",
          }}
        >
          Back to Example
        </Button>
      </Box>
    </Paper>
  );
}
