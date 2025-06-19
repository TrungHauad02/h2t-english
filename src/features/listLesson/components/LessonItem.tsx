import { Lesson } from "interfaces";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  CardActionArea,
  Avatar,
  Divider,
} from "@mui/material";
import { useState } from "react";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate } from "utils/format";

interface LessonItemProps {
  lesson: Lesson;
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
          width: "95%",
          height: "95%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 3,
          transition: "all 0.3s ease-in-out",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 12px 24px ${
                isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)"
              }`
            : `0 4px 12px ${
                isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"
              }`,
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardActionArea 
          onClick={() => navigate(`${lesson.id}`)}
          sx={{ 
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch"
          }}
        >
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="280"
              image={lesson.image}
              alt={lesson.title}
              sx={{
                transition: "transform 0.5s ease-in-out",
                transform: hovered ? "scale(1.1)" : "scale(1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
              }}
            >
              <Chip
                label={`${lesson.views} views`}
                size="small"
                icon={<VisibilityIcon fontSize="small" />}
                sx={{
                  backgroundColor: isDarkMode
                    ? `${color.teal800}CC`
                    : `${color.teal50}E6`,
                  color: isDarkMode ? color.teal100 : color.teal800,
                  backdropFilter: "blur(4px)",
                  fontWeight: 600,
                  border: `1px solid ${
                    isDarkMode ? color.teal700 : color.teal200
                  }`,
                  "& .MuiChip-icon": {
                    color: isDarkMode ? color.teal300 : color.teal600,
                  },
                }}
              />
            </Box>
            {/* Gradient overlay on image */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: `linear-gradient(to top, ${
                  isDarkMode
                    ? `${color.gray900}F0, ${color.gray900}00`
                    : `${color.gray800}CC, ${color.gray800}00`
                })`,
              }}
            />
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              display: "flex",
              flexDirection: "column",
              height: "70%",
            }}
          >
            {/* Content section - takes available space */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: isDarkMode
                    ? hovered
                      ? color.teal300
                      : color.teal400
                    : hovered
                    ? color.teal700
                    : color.teal600,
                  transition: "color 0.3s ease-in-out",
                  mb: 1,
                  lineHeight: 1.3,
                }}
              >
                {lesson.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  mb: 2,
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {lesson.description}
              </Typography>
            </Box>

            {/* Bottom section - always at the bottom */}
            <Box>
              <Divider
                sx={{
                  my: 2,
                  borderColor: isDarkMode ? color.gray700 : color.gray200,
                }}
              />

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                    color: isDarkMode ? color.teal200 : color.teal700,
                  }}
                >
                  {lesson.title.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontSize: "0.75rem",
                    }}
                  >
                    <AccessTimeIcon fontSize="inherit" />
                    <Typography variant="caption">
                      Updated {formatDate(lesson.updatedAt)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}