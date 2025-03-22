import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Grid,
  CardMedia,
  Button,
  Box,
  Chip,
  CardActionArea,
  Skeleton,
  Divider,
} from "@mui/material";
import { Route, User } from "interfaces";
import { routeService } from "../services/listRouteService";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import { mockData } from "../services/mockData";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useState, useEffect } from "react";

interface ListRouteProps {
  searchQuery?: string;
}

export default function ListRoute({ searchQuery = "" }: ListRouteProps) {
  const [loading, setLoading] = useState(true);
  const [listRoutes, setListRoutes] = useState<Route[]>([]);

  const mockTeacher: User = mockData.teacher;
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        const routes = routeService.getListRoute();

        // Filter routes if search query exists
        const filteredRoutes = searchQuery
          ? routes.filter(
              (route) =>
                route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                route.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
          : routes;

        setListRoutes(filteredRoutes);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, [searchQuery]);

  const handleViewDetail = (routeId: number) => {
    navigate(`/route/${routeId}`);
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

  // Generate loading skeleton
  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
          <Card
            sx={{
              height: "100%",
              bgcolor: isDarkMode ? color.gray800 : color.white,
              boxShadow: `0 4px 12px ${
                isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"
              }`,
              borderRadius: 3,
            }}
          >
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
            />
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Skeleton
                  variant="circular"
                  width={48}
                  height={48}
                  sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
                />
                <Skeleton
                  variant="text"
                  width="70%"
                  height={32}
                  sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
                />
              </Stack>
              <Skeleton
                variant="text"
                width="90%"
                height={32}
                sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
              />
              <Skeleton
                variant="text"
                width="100%"
                height={80}
                sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{
                  mt: 2,
                  bgcolor: isDarkMode ? color.gray700 : color.gray200,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      ));
  };

  return (
    <Grid container spacing={3}>
      {loading ? (
        renderSkeletons()
      ) : listRoutes.length > 0 ? (
        listRoutes.map((route) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={route.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: isDarkMode ? color.gray800 : color.white,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: `0 8px 24px ${
                  isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.12)"
                }`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 16px 32px ${
                    isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)"
                  }`,
                },
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
              }}
            >
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
                        bgcolor: isDarkMode
                          ? `${color.teal800}E6`
                          : `${color.teal500}E6`,
                        color: isDarkMode ? color.gray100 : color.white,
                        fontWeight: 600,
                        backdropFilter: "blur(4px)",
                        border: `1px solid ${
                          isDarkMode ? color.teal700 : color.teal400
                        }`,
                        "& .MuiChip-icon": {
                          color: isDarkMode ? color.teal300 : color.white,
                        },
                      }}
                    />

                    <Chip
                      icon={<BarChartIcon />}
                      label={getDifficultyLevel(route.routeNodes.length)}
                      sx={{
                        bgcolor: `${getDifficultyColor(
                          route.routeNodes.length
                        )}E6`,
                        color: isDarkMode ? color.gray100 : color.white,
                        fontWeight: 600,
                        backdropFilter: "blur(4px)",
                        border: `1px solid ${
                          isDarkMode ? color.teal700 : color.teal400
                        }`,
                        "& .MuiChip-icon": {
                          color: isDarkMode ? color.teal300 : color.white,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </CardActionArea>

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Route title */}
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: isDarkMode ? color.teal300 : color.teal700,
                    fontWeight: 700,
                    mb: 1.5,
                    lineHeight: 1.3,
                    minHeight: "2.6em",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {route.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                    mb: 3,
                    lineHeight: 1.6,
                    flexGrow: 1,
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {route.description}
                </Typography>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: isDarkMode ? color.gray700 : color.gray200,
                  }}
                />

                {/* Footer with teacher info */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Avatar
                    src={mockTeacher.avatar}
                    alt={mockTeacher.name}
                    sx={{
                      width: 36,
                      height: 36,
                      border: `2px solid ${
                        isDarkMode ? color.teal600 : color.teal400
                      }`,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray400 : color.gray500,
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <SchoolIcon fontSize="inherit" /> Instructor
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: isDarkMode ? color.gray200 : color.gray800,
                      }}
                    >
                      {mockTeacher.name}
                    </Typography>
                  </Box>

                  <Chip
                    icon={<AccessTimeIcon fontSize="small" />}
                    label={`${route.routeNodes.length * 25} mins`}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? color.gray700 : color.gray200,
                      color: isDarkMode ? color.gray300 : color.gray700,
                      border: `1px solid ${
                        isDarkMode ? color.gray600 : color.gray300
                      }`,
                      "& .MuiChip-icon": {
                        color: isDarkMode ? color.gray400 : color.gray600,
                      },
                    }}
                  />
                </Stack>

                {/* Explore button */}
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: isDarkMode ? color.teal600 : color.teal500,
                    color: color.white,
                    fontWeight: 600,
                    py: 1.2,
                    borderRadius: 2,
                    boxShadow: `0 4px 12px ${
                      isDarkMode ? color.teal900 + "50" : color.teal500 + "40"
                    }`,
                    "&:hover": {
                      bgcolor: isDarkMode ? color.teal500 : color.teal600,
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 16px ${
                        isDarkMode ? color.teal900 + "60" : color.teal500 + "50"
                      }`,
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleViewDetail(route.id)}
                >
                  Explore Route
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              textAlign: "center",
            }}
          >
            <BookIcon
              sx={{
                fontSize: 64,
                color: isDarkMode ? color.gray600 : color.gray400,
                mb: 2,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
                mb: 1,
              }}
            >
              No routes found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                maxWidth: 500,
              }}
            >
              We couldn't find any learning routes matching your search
              criteria. Try using different keywords or browse all available
              routes.
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
