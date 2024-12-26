import {
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
  Grammar,
} from "interfaces";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";

interface LessonItemProps {
  lesson: Topic | Grammar | Reading | Speaking | Listening | Writing;
}

export default function LessonItem({ lesson }: LessonItemProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: 400,
          margin: "16px auto",
          boxShadow: hovered ? 6 : 3,
          borderRadius: 2,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          cursor: "pointer",
          backgroundColor: isDarkMode
            ? hovered
              ? color.gray800
              : color.gray900
            : hovered
            ? color.teal50
            : color.gray50,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`${lesson.id}`)}
      >
        <CardMedia
          component="img"
          height="200"
          image={lesson.image}
          alt={lesson.title}
          sx={{
            filter: hovered ? "brightness(85%)" : "brightness(100%)",
            transition: "filter 0.3s ease-in-out",
          }}
        />
        <CardContent
          sx={{
            backgroundColor: isDarkMode
              ? hovered
                ? color.gray700
                : color.gray800
              : hovered
              ? color.teal100
              : color.gray100,
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              color: isDarkMode
                ? hovered
                  ? color.teal400
                  : color.teal200
                : hovered
                ? color.teal700
                : color.gray800,
              transition: "color 0.3s ease-in-out",
            }}
          >
            {lesson.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
            paragraph
          >
            {lesson.description}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={`Serial: ${lesson.serial}`}
              size="small"
              sx={{
                backgroundColor: isDarkMode
                  ? hovered
                    ? color.teal600
                    : color.teal800
                  : hovered
                  ? color.teal400
                  : color.teal200,
                color: isDarkMode
                  ? hovered
                    ? color.white
                    : color.teal300
                  : hovered
                  ? color.white
                  : color.teal700,
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
