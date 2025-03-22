import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Skeleton,
  Paper,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { routeService } from "../services/listRouteService";
import { Route } from "interfaces";
import RouteHeader from "../components/RouteHeader";
import TeacherInfoCard from "../components/TeacherInfoCard";
import LearningPathTimeline from "../components/LearningPathTimeline";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function RoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const [route, setRoute] = useState<Route>();
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      if (id) {
        const fetchedRoute = routeService.getRouteById(parseInt(id));
        if (fetchedRoute) {
          // Simulate network latency for better UX testing
          setTimeout(() => {
            setRoute(fetchedRoute);
            setLoading(false);
          }, 800);
        } else {
          setLoading(false);
        }
      }
    };

    fetchRoute();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: { xs: 4, md: 8 }, mb: 4 }}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={30} sx={{ mb: 3, width: "80%" }} />

          <Skeleton
            variant="rectangular"
            height={150}
            sx={{ borderRadius: 2, mb: 4 }}
          />

          <Box sx={{ mb: 4 }}>
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 2, mb: 2 }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  if (!route) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: isDarkMode ? color.gray700 : color.white,
            border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              fontWeight: 600,
              mb: 2,
            }}
          >
            Route Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            The learning path you're looking for doesn't exist or might have
            been removed.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        minHeight: "100vh",
        mt: { xs: 6, md: 8 },
        pt: { xs: 2, md: 4 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
          }}
        >
          <RouteHeader route={route} />

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
            }}
          >
            {/* Teacher info displayed in sidebar on desktop, on top in mobile */}
            <Box
              sx={{
                width: isMobile ? "100%" : "30%",
                order: isMobile ? 1 : 0,
              }}
            >
              <TeacherInfoCard userId={route.ownerId} />
            </Box>

            <Box
              sx={{
                width: isMobile ? "100%" : "70%",
                order: isMobile ? 2 : 0,
              }}
            >
              <Divider sx={{ mb: 3, display: { xs: "none", md: "block" } }} />
              <LearningPathTimeline route={route} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
