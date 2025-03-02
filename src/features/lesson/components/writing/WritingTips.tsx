import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WritingTipsProps {
  tips: string[];
}

export default function WritingTips({ tips }: WritingTipsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const iconColor = isDarkMode ? color.teal300 : color.teal500;
  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        backgroundColor: backgroundColor,
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: iconColor }}
      >
        Writing Tips
      </Typography>
      <List>
        {tips.map((tip, index) => (
          <ListItem key={index} sx={{ py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleOutline sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText
              primary={tip}
              primaryTypographyProps={{
                variant: "body1",
                color: textColor,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
