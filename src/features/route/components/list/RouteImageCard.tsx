import { Route } from "interfaces";
import { CardMedia, Box, Chip, CardActionArea } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function RouteImageCard({ route }: { route: Route }) {
  const navigate = useNavigate();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleViewDetail = (routeId: number) => {
    navigate(`/routes/${routeId}`);
  };

  // Helper function to determine difficulty level color
  const getDifficultyColor = (nodeCount: number) => {
    if (nodeCount < 5) return isDarkMode ? color.teal600 : color.teal500;
    if (nodeCount < 10) return isDarkMode ? color.teal700 : color.teal600;
    return isDarkMode ? color.teal800 : color.teal700;
  };

  // Helper function to determine difficulty level text
  const getDifficultyLevel = (nodeCount: number) => {
    if (nodeCount < 5) return "Beginner";
    if (nodeCount < 10) return "Intermediate";
    return "Advanced";
  };

  return (
    <CardActionArea onClick={() => handleViewDetail(route.id)}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={route.image}
          alt={route.title}
          sx={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: `linear-gradient(to top, ${
              isDarkMode
                ? `${color.gray900}E6, ${color.gray900}00`
                : `${color.gray800}CC, ${color.gray800}00`
            })`,
          }}
        />

        {/* Lesson count badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            display: "flex",
            gap: 1,
          }}
        >
          <Chip
            icon={<BookIcon />}
            label={`${route.routeNodes.length} Lessons`}
            sx={{
              bgcolor: isDarkMode ? `${color.teal800}E6` : `${color.teal500}E6`,
              color: isDarkMode ? color.gray100 : color.white,
              fontWeight: 600,
              backdropFilter: "blur(4px)",
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal400}`,
              "& .MuiChip-icon": {
                color: isDarkMode ? color.teal300 : color.white,
              },
            }}
          />

          <Chip
            icon={<BarChartIcon />}
            label={getDifficultyLevel(route.routeNodes.length)}
            sx={{
              bgcolor: `${getDifficultyColor(route.routeNodes.length)}E6`,
              color: isDarkMode ? color.gray100 : color.white,
              fontWeight: 600,
              backdropFilter: "blur(4px)",
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal400}`,
              "& .MuiChip-icon": {
                color: isDarkMode ? color.teal300 : color.white,
              },
            }}
          />
        </Box>
      </Box>
    </CardActionArea>
  );
}
