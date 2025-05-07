import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ErrorRecommendSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const recommendations = [
    "Check server logs for additional details",
    "Verify network connectivity",
    "Ensure proper authentication credentials",
    "Review recent system changes that may have caused this error",
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: isDarkMode ? color.gray200 : color.gray800,
          mb: 1.5,
        }}
      >
        Recommended Actions
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: isDarkMode
            ? alpha(color.teal900, 0.2)
            : alpha(color.teal50, 0.7),
          borderRadius: "0.75rem",
          border: `1px solid ${
            isDarkMode ? alpha(color.teal700, 0.3) : color.teal100
          }`,
        }}
      >
        <List
          disablePadding
          sx={{ "& .MuiListItem-root": { px: 1, py: 0.75 } }}
        >
          {recommendations.map((recommendation, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RecommendIcon
                  sx={{
                    color: isDarkMode ? color.teal400 : color.teal600,
                    fontSize: "1.25rem",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={recommendation}
                primaryTypographyProps={{
                  variant: "body2",
                  color: isDarkMode ? color.gray200 : color.gray800,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
