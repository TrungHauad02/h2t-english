import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Route } from "interfaces";
import RouteHeader from "../components/RouteHeader";
import TeacherInfoCard from "../components/TeacherInfoCard";
import LearningPathTimeline from "../components/LearningPathTimeline";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { routeService } from "services";
import { toast } from "react-toastify";
import { RouteNotFound, RouteSkeleton } from "../components";

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
      try {
        if (id) {
          const resData = await routeService.findById(parseInt(id));
          if (resData.data) {
            setRoute(resData.data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchRoute();
  }, [id]);

  if (loading) {
    return <RouteSkeleton />;
  }

  if (!route) {
    return <RouteNotFound />;
  }

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        width: "100%",
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
                width: isMobile ? "100%" : "80%",
                order: isMobile ? 1 : 0,
              }}
            >
              <TeacherInfoCard userId={route.ownerId} />
            </Box>

            <Box
              sx={{
                width: isMobile ? "100%" : "90%",
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
