import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route, RouteNode, RouteNodeEnum } from "interfaces";
import { useNavigate } from "react-router-dom";

interface LearningPathTimelineProps {
  route: Route;
}

export default function LearningPathTimeline({
  route,
}: LearningPathTimelineProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const cardBackgroundColor = isDarkMode ? color.gray700 : color.white;
  const cardBorderColor = isDarkMode ? color.gray600 : color.gray300;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  const handleLearnClick = (node: RouteNode) => {
    let path = "";
    switch (node.type) {
      case RouteNodeEnum.VOCABULARY:
        path = `/lesson/topics/${node.nodeId}`;
        break;
      case RouteNodeEnum.GRAMMAR:
        path = `/lesson/grammars/${node.nodeId}`;
        break;
      case RouteNodeEnum.READING:
        path = `/lesson/readings/${node.nodeId}`;
        break;
      case RouteNodeEnum.LISTENING:
        path = `/lesson/listenings/${node.nodeId}`;
        break;
      case RouteNodeEnum.WRITING:
        path = `/lesson/writings/${node.nodeId}`;
        break;
      case RouteNodeEnum.SPEAKING:
        path = `/lesson/speakings/${node.nodeId}`;
        break;
      case RouteNodeEnum.TEST:
        path = `/test/mixing/${node.nodeId}`;
        break;
      default:
        path = "/";
    }
    navigate(path);
  };

  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: cardBackgroundColor,
        border: `1px solid ${cardBorderColor}`,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={route.image}
        alt={route.title}
        sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{ color: textColor, fontWeight: "bold", mb: 2 }}
        >
          Learning Path
        </Typography>
        <Timeline position="alternate">
          {route.routeNodes.map((node, index) => (
            <TimelineItem key={node.id}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: isDarkMode ? color.teal300 : color.teal500,
                  }}
                />
                {index < route.routeNodes.length - 1 && (
                  <TimelineConnector
                    sx={{
                      bgcolor: isDarkMode ? color.gray600 : color.gray300,
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <Stack
                  direction={index % 2 === 0 ? "row" : "row-reverse"}
                  spacing={{ xs: 2, md: 4 }}
                >
                  <Stack direction={"column"}>
                    <Typography
                      variant="body1"
                      sx={{ color: textColor, fontWeight: "bold" }}
                    >
                      {node.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray300 : color.gray700,
                      }}
                    >
                      {node.description}
                    </Typography>
                  </Stack>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: isDarkMode ? color.teal300 : color.teal500,
                      color: isDarkMode ? color.gray900 : color.white,
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: isDarkMode ? color.teal400 : color.teal600,
                      },
                    }}
                    onClick={() => handleLearnClick(node)}
                  >
                    Learn
                  </Button>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
