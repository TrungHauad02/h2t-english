import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  Box,
  Typography,
  useMediaQuery,
  Zoom,
  Chip,
  Badge,
} from "@mui/material";
import {
  MenuBook as MenuBookIcon,
  Translate as TranslateIcon,
} from "@mui/icons-material";

interface HeaderSectionProps {
  isLoaded: boolean;
  title: string;
  theme: any;
}

export default function HeaderSection({
  isLoaded,
  title,
  theme,
}: HeaderSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        padding: isMobile ? "20px" : "28px",
        background: `linear-gradient(135deg, ${theme.accent}40, ${color.transparent})`,
        borderBottom: `1px solid ${theme.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Zoom in={isLoaded} timeout={600}>
          <Badge
            badgeContent={
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: color.success,
                  boxShadow: `0 0 0 2px ${theme.background}`,
                }}
              />
            }
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuBookIcon
              sx={{
                color: theme.accent,
                fontSize: isMobile ? 32 : 40,
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
              }}
            />
          </Badge>
        </Zoom>
        <Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h1"
            sx={{
              fontWeight: 700,
              color: theme.accent,
              textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 0.5,
            }}
          >
            <Chip
              size="small"
              label="Grammar"
              sx={{
                backgroundColor: isDarkMode
                  ? `${theme.accent}30`
                  : `${theme.accent}20`,
                color: theme.accent,
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
              icon={
                <TranslateIcon
                  sx={{
                    fontSize: "0.875rem",
                    color: theme.accent,
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
