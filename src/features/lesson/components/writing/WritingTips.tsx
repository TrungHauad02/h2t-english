import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { LightbulbOutlined } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WritingTipsProps {
  tips: string[];
}

export default function WritingTips({ tips }: WritingTipsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const backgroundColor = isDarkMode ? color.gray800 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const tipBgColor = isDarkMode ? color.gray700 : color.gray50;

  if (!tips || tips.length === 0) return null;

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          margin: "auto",
          backgroundColor: backgroundColor,
          borderRadius: "12px",
          p: { xs: 3, md: 4 },
          border: `1px solid ${borderColor}`,
          boxShadow: isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.2)"
            : "0 4px 16px rgba(15,118,110,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "8px",
              backgroundColor: isDarkMode ? color.teal900 : color.teal100,
            }}
          >
            <LightbulbOutlined
              sx={{
                color: accentColor,
                fontSize: "1.2rem",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: textColor,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            Writing Tips
          </Typography>
        </Box>

        <List sx={{ p: 0 }}>
          {tips.map((tip, index) => (
            <Fade in timeout={400 + index * 100} key={index}>
              <ListItem
                sx={{
                  py: 1.5,
                  px: 2,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: tipBgColor,
                  border: `1px solid ${
                    isDarkMode ? color.gray600 : color.gray200
                  }`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: isDarkMode ? color.gray600 : color.teal50,
                    borderColor: isDarkMode ? color.teal700 : color.teal200,
                  },
                  "&:last-child": {
                    mb: 0,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: accentColor,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={tip}
                  primaryTypographyProps={{
                    variant: "body1",
                    color: textColor,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                />
              </ListItem>
            </Fade>
          ))}
        </List>
      </Box>
    </Fade>
  );
}
