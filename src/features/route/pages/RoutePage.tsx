import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { routeService } from "../services/listRouteService";
import { useEffect, useState } from "react";
import { Route } from "interfaces";
import RouteHeader from "../components/RouteHeader";
import TeacherInfoCard from "../components/TeacherInfoCard";
import LearningPathTimeline from "../components/LearningPathTimeline";

export default function RoutePage() {
  const { id } = useParams();
  const [route, setRoute] = useState<Route>();

  useEffect(() => {
    if (id) {
      const route = routeService.getRouteById(parseInt(id));
      if (route) {
        setRoute(route);
      }
    }
  }, [id]);

  if (!route) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 8,
        width: "100%",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <RouteHeader route={route} />
      <TeacherInfoCard userId={route.ownerId} />
      <LearningPathTimeline route={route} />
    </Box>
  );
}
