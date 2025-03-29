import { Box, Typography, List, ListItem, Chip, Divider } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import useColor from "theme/useColor";
import { Grammar } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";

interface TipsDisplayModeProps {
  editData: Grammar | null;
  textColor: string;
  chipBg: string;
  chipColor: string;
  hoveredTipIndex: number | null;
  setHoveredTipIndex: (index: number | null) => void;
}

export default function TipsDisplayMode({
  editData,
  textColor,
  chipBg,
  chipColor,
  hoveredTipIndex,
  setHoveredTipIndex,
}: TipsDisplayModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!editData || editData.tips.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{ color: isDarkMode ? color.gray400 : color.gray500 }}
        >
          No grammar tips available for this entry.
        </Typography>
      </Box>
    );
  }

  return (
    <List
      sx={{
        px: 0,
        py: 1,
      }}
    >
      {editData.tips.map((tip, index) => (
        <ListItem
          key={index}
          disablePadding
          onMouseEnter={() => setHoveredTipIndex(index)}
          onMouseLeave={() => setHoveredTipIndex(null)}
          sx={{
            display: "block",
            position: "relative",
            my: 2,
            p: 0,
            borderRadius: "0.75rem",
            backgroundColor:
              hoveredTipIndex === index
                ? isDarkMode
                  ? `${color.teal800}40`
                  : `${color.teal200}40`
                : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", p: 2 }}>
            <Chip
              icon={<LightbulbIcon sx={{ fontSize: 16 }} />}
              label={`Tip ${index + 1}`}
              size="small"
              sx={{
                backgroundColor: chipBg,
                color: chipColor,
                fontWeight: 600,
                mr: 2,
                mt: 0.5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />

            <Typography
              variant="body1"
              sx={{
                color: textColor,
                fontSize: "1.05rem",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
                flexGrow: 1,
                fontWeight: 400,
              }}
            >
              {tip}
            </Typography>
          </Box>

          {index < editData.tips.length - 1 && (
            <Divider
              sx={{
                my: 1,
                borderColor: isDarkMode ? color.gray700 : color.gray200,
                opacity: 0.6,
              }}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
}
