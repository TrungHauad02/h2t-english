import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import useColor from "theme/useColor";
import useRouteCard from "./useRouteCard";
import FadeIn from "./FadeInRoute";
import { Box, Card, CardContent, Divider } from "@mui/material";
import RouteCardMedia from "./RouteCardMedia";
import RouteCardContent from "./RouteCardContent";
import RouteCardTeacher from "./RouteCardTeacher";
import RouteCardDate from "./RouteCardDate";
import RouteCardModules from "./RouteCardModules";
import RouteCardActions from "./RouteCardActions";

interface RouteCardProps {
  route: Route;
  delay: number;
}

export default function RouteCard({ route, delay }: RouteCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const hooks = useRouteCard(route);

  return (
    <FadeIn delay={delay} duration={800}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDarkMode ? colors.gray800 : colors.white,
          color: isDarkMode ? colors.gray100 : colors.gray900,
          borderRadius: 4,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
          boxShadow: hooks.hover
            ? `0 20px 30px -10px ${
                isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(15, 118, 110, 0.2)"
              }`
            : `0 10px 15px -5px ${
                isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(15, 118, 110, 0.1)"
              }`,
          transform: `translateY(${hooks.hover ? "-8px" : "0px"}) scale(${
            hooks.cardScale
          })`,
          border: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200}`,
          position: "relative",
          willChange: "transform, box-shadow",
        }}
        onMouseEnter={() => hooks.setHover(true)}
        onMouseLeave={() => hooks.setHover(false)}
      >
        <RouteCardMedia
          image={route.image}
          title={route.title}
          level={hooks.owner.level}
          imageHover={hooks.imageHover}
          setImageHover={hooks.setImageHover}
          hover={hooks.hover}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            width: "88%",
            p: 3,
            pt: 2.5,
            display: "flex",
            flexDirection: "column",
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              minHeight: "230px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <RouteCardContent
              title={route.title}
              description={route.description}
            />

            <RouteCardTeacher
              owner={hooks.owner}
              hover={hooks.hover}
              ownerInitial={hooks.ownerInitial}
            />

            <RouteCardDate route={route} />
          </Box>

          <Divider
            sx={{
              my: 2,
              borderColor: isDarkMode ? colors.gray700 : colors.gray200,
            }}
          />

          {/* List of route nodes - only showing serial and type */}
          <RouteCardModules
            visibleNodes={hooks.visibleNodes}
            getChipColor={hooks.getChipColor}
            chipHover={hooks.chipHover}
            setChipHover={hooks.setChipHover}
          />

          {/* Show More / View Detail buttons */}
          <RouteCardActions
            hasMoreNodes={hooks.hasMoreNodes}
            expandedNodes={hooks.expandedNodes}
            hasDetailPage={hooks.hasDetailPage}
            initialNodeCount={hooks.initialNodeCount}
            totalNodes={route.routeNodes.length}
            handleShowMore={hooks.handleShowMore}
            handleViewDetail={hooks.handleViewDetail}
            routeId={route.id}
          />
        </CardContent>
      </Card>
    </FadeIn>
  );
}
