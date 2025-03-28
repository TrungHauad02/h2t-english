import { Box, Container, Grid } from "@mui/material";
import { learningRoutes } from "../services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import FadeIn from "./route/FadeInRoute";
import { RouteCard, useRouteSection, RouteTitle, RouteView, RouteTab } from "./route";

export default function RoutesSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const hooks = useRouteSection();

  return (
    <Box
      sx={{
        py: 8,
        background: isDarkMode
          ? `linear-gradient(to bottom, ${colors.gray800}, ${colors.gray900})`
          : `linear-gradient(to bottom, ${colors.gray100}, ${colors.gray50})`,
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${isDarkMode ? colors.gray800 : colors.gray200}`,
        borderBottom: `1px solid ${
          isDarkMode ? colors.gray800 : colors.gray200
        }`,
      }}
    >
      {/* Background decorations */}
      {hooks.createDecorationElements()}

      {/* Background mesh with subtle animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${
            isDarkMode ? colors.gray800 : colors.gray200
          } 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          opacity: isDarkMode ? 0.05 : 0.1,
          zIndex: 0,
          animation: "meshAnimation 120s linear infinite",
          "@keyframes meshAnimation": {
            "0%": { backgroundPosition: "0 0" },
            "100%": { backgroundPosition: "30px 30px" },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <FadeIn duration={1000}>
          <RouteTitle
            handleExploreAll={hooks.handleExploreAll}
            />
        </FadeIn>

        <RouteTab
          activeTab={hooks.activeTab}
          handleTabChange={hooks.handleTabChange}
          isMobile={hooks.isMobile}
        />

        <Grid container spacing={4}>
          {learningRoutes.map((route, index) => (
            <Grid item key={route.id} xs={12} sm={6} lg={4}>
              <RouteCard
                route={route}
                owner={hooks.getRouteOwner(route.ownerId)}
                delay={150 * index}
              />
            </Grid>
          ))}
        </Grid>

        {/* View more button at bottom with enhanced styling */}
        <RouteView
          handleExploreAll={hooks.handleExploreAll}
        />
      </Container>
    </Box>
  );
}
