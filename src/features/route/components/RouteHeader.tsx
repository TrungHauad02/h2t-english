import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Route } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { formatDate } from "utils/format";

interface RouteHeaderProps {
  route: Route;
}

export default function RouteHeader({ route }: RouteHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray700;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: isDarkMode ? color.gray700 : color.white,
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={isMobile ? "200" : "300"}
          image={route.image}
          alt={route.title}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.7)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            p: { xs: 3, md: 4 },
            color: color.white,
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h3"}
            component="h1"
            sx={{
              fontWeight: 700,
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              mb: 1,
            }}
          >
            {route.title}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 1,
              flexWrap: "wrap",
              gap: 1,
              "& .MuiChip-root": {
                height: 24,
                backgroundColor: isDarkMode
                  ? "rgba(14, 165, 233, 0.2)"
                  : "rgba(14, 165, 233, 0.15)",
                border: `1px solid ${
                  isDarkMode ? color.teal400 : color.teal300
                }`,
                color: color.teal200,
              },
            }}
          >
            <Chip
              size="small"
              icon={
                <CalendarTodayIcon
                  style={{
                    fontSize: 14,
                    color: color.teal200,
                  }}
                />
              }
              label={formatDate(route.createdAt)}
            />
            <Chip
              size="small"
              icon={
                <PersonIcon
                  style={{
                    fontSize: 14,
                    color: color.teal200,
                  }}
                />
              }
              label={`${route.routeNodes.length} Learning Items`}
            />
          </Stack>
        </Box>
      </Box>

      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          variant="body1"
          sx={{
            color: secondaryTextColor,
            lineHeight: 1.7,
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          {route.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
