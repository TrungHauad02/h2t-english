import { Box, CardMedia, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteCardMediaProps {
  image: string;
  title: string;
  level?: string;
  imageHover: boolean;
  setImageHover: (hover: boolean) => void;
  hover: boolean;
}

export default function RouteCardMedia({
  image,
  title,
  level,
  imageHover,
  setImageHover,
  hover,
}: RouteCardMediaProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setImageHover(true)}
      onMouseLeave={() => setImageHover(false)}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{
          filter: imageHover ? "brightness(1.05)" : "none",
          transition: "filter 0.5s ease, transform 0.5s ease",
          transform: imageHover ? "scale(1.05)" : "scale(1)",
          willChange: "transform, filter",
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: `linear-gradient(transparent, ${
            isDarkMode ? colors.gray900 + "e6" : colors.gray800 + "99"
          })`,
          transition: "opacity 0.3s ease",
          opacity: imageHover ? 0.9 : 0.7,
        }}
      />

      {/* Level badge */}
      <Chip
        size="small"
        label={level}
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: isDarkMode
            ? `${colors.teal700}cc`
            : `${colors.teal100}cc`,
          color: isDarkMode ? colors.gray100 : colors.teal800,
          fontWeight: "medium",
          backdropFilter: "blur(4px)",
          border: `1px solid ${isDarkMode ? colors.teal600 : colors.teal300}`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: hover ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hover
            ? `0 4px 8px ${
                isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(13, 148, 136, 0.2)"
              }`
            : "none",
        }}
      />
    </Box>
  );
}
