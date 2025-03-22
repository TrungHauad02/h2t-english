import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import { competitions } from "../services/mockData";

interface CompetitionCardProps {
  competition: CompetitionTest;
}

function CompetitionCard({ competition }: CompetitionCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time to readable string
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if competition is upcoming or active
  const now = new Date();
  const isUpcoming = new Date(competition.startTime) > now;
  const isActive =
    new Date(competition.startTime) <= now &&
    new Date(competition.endTime) >= now;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
        color: isDarkMode ? colors.gray100 : colors.gray900,
        borderRadius: 2,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip
            label={isActive ? "Active" : isUpcoming ? "Upcoming" : "Completed"}
            size="small"
            sx={{
              backgroundColor: isActive
                ? colors.success
                : isUpcoming
                ? colors.warning
                : colors.gray500,
              color: "white",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          component="h3"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {competition.title}
        </Typography>

        <Divider
          sx={{
            my: 2,
            borderColor: isDarkMode ? colors.gray700 : colors.gray200,
          }}
        />

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <EventIcon
              fontSize="small"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray500,
                mr: 1,
              }}
            />
            <Typography
              variant="body2"
              color={isDarkMode ? colors.gray400 : colors.gray500}
            >
              {formatDate(competition.startTime)} •{" "}
              {formatTime(competition.startTime)} -{" "}
              {formatTime(competition.endTime)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AccessTimeIcon
              fontSize="small"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray500,
                mr: 1,
              }}
            />
            <Typography
              variant="body2"
              color={isDarkMode ? colors.gray400 : colors.gray500}
            >
              {competition.duration} minutes
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HelpOutlineIcon
              fontSize="small"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray500,
                mr: 1,
              }}
            />
            <Typography
              variant="body2"
              color={isDarkMode ? colors.gray400 : colors.gray500}
            >
              {competition.totalQuestions} questions
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={!isActive}
          sx={{
            mt: "auto",
            backgroundColor: isActive
              ? colors.teal600
              : isUpcoming
              ? colors.gray600
              : colors.gray500,
            "&:hover": {
              backgroundColor: isActive
                ? colors.teal700
                : isUpcoming
                ? colors.gray700
                : colors.gray600,
            },
          }}
        >
          {isActive ? "Join Now" : isUpcoming ? "Register" : "View Results"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function CompetitionsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? colors.teal300 : colors.teal700,
              }}
            >
              Competitions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              Challenge yourself and compete with other learners in our English
              competitions
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: isDarkMode ? colors.teal400 : colors.teal600,
              color: isDarkMode ? colors.teal400 : colors.teal600,
              "&:hover": {
                borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                backgroundColor: "transparent",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            All Competitions
          </Button>
        </Box>

        <Grid container spacing={4}>
          {competitions.map((competition) => (
            <Grid item key={competition.id} xs={12} sm={6} md={4}>
              <CompetitionCard competition={competition} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
