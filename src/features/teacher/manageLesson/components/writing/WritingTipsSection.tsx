import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";
import { Writing } from "interfaces";

export default function WritingTipsSection({ data }: { data: Writing }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray700 : color.white,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          pb: 1.5,
          borderBottom: `1px solid ${color.gray200}`,
        }}
      >
        <LightbulbIcon sx={{ mr: 1.5, color: accentColor, fontSize: 28 }} />
        <Typography variant="h6" fontWeight="medium">
          Tips
        </Typography>
      </Box>

      <List
        sx={{
          px: 0,
          py: 0,
          "& .MuiListItem-root:not(:last-child)": {
            borderBottom: `1px solid ${
              isDarkMode ? color.gray600 : color.gray200
            }`,
          },
        }}
      >
        {data.tips.map((tip, index) => (
          <ListItem
            key={index}
            sx={{
              px: 2.5,
              py: 1.75,
              alignItems: "flex-start",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "32px !important",
                color: accentColor,
                alignSelf: "flex-start",
                mt: "8px",
              }}
            >
              <BulletIcon
                sx={{
                  fontSize: "10px",
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: textColor,
                    fontSize: "1.02rem",
                    lineHeight: "1.6",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  {tip}
                </Typography>
              }
              sx={{ my: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
