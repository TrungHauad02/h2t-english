import { Route } from "interfaces";
import { Card, CardContent, Button, Divider, Box, Stack } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TeacherInfo from "./TeacherInfo";
import RouteImageCard from "./RouteImageCard";
import RouteTitleSection from "./RouteTitleSection";

export default function RouteItem({ route }: { route: Route }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleViewDetail = (routeId: number) => {
    navigate(`/routes/${routeId}`);
  };

  return (
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
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <RouteImageCard route={route} />

      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={"space-between"}
          sx={{ flexGrow: 1 }}
        >
          <Box>
            <RouteTitleSection route={route} />
            <Divider
              sx={{
                my: 2,
                borderColor: isDarkMode ? color.gray700 : color.gray200,
              }}
            />
            {/* Footer with teacher info */}
            <TeacherInfo teacherId={route.ownerId} />
          </Box>
          <Box>
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
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
