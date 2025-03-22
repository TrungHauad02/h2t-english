import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  topStudents as users,
  competitionResults,
  competitions,
} from "../services/mockData";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface LeaderboardItemProps {
  rank: number;
  userId: number;
  score: number;
}

function LeaderboardItem({ rank, userId, score }: LeaderboardItemProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  // Find user from userId
  const user = users.find((u) => u.id === userId);

  if (!user) return null;

  // Medal colors for top 3
  const getMedalColor = () => {
    switch (rank) {
      case 1:
        return "#FFD700"; // Gold
      case 2:
        return "#C0C0C0"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return "transparent";
    }
  };

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: isDarkMode ? colors.gray700 : colors.gray100,
        },
        transition: "background-color 0.2s",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{
          py: 2,
          borderBottom: `1px solid ${
            isDarkMode ? colors.gray700 : colors.gray200
          }`,
          position: "relative",
        }}
      >
        {rank <= 3 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmojiEventsIcon
              sx={{
                color: getMedalColor(),
                fontSize: rank === 1 ? 28 : 24,
              }}
            />
          </Box>
        ) : (
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
          >
            {rank}
          </Typography>
        )}
      </TableCell>

      <TableCell
        sx={{
          py: 2,
          borderBottom: `1px solid ${
            isDarkMode ? colors.gray700 : colors.gray200
          }`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{
              width: 40,
              height: 40,
              mr: 2,
              border: rank <= 3 ? `2px solid ${getMedalColor()}` : "none",
            }}
          />
          <Box>
            <Typography variant="body1" fontWeight="medium">
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          py: 2,
          borderBottom: `1px solid ${
            isDarkMode ? colors.gray700 : colors.gray200
          }`,
        }}
      >
        <Chip
          label={`${score} points`}
          sx={{
            fontWeight: "bold",
            backgroundColor:
              rank === 1
                ? isDarkMode
                  ? colors.teal900
                  : colors.teal100
                : isDarkMode
                ? colors.gray800
                : colors.gray100,
            color:
              rank === 1
                ? isDarkMode
                  ? colors.teal300
                  : colors.teal700
                : isDarkMode
                ? colors.gray300
                : colors.gray700,
            border:
              rank === 1
                ? `1px solid ${isDarkMode ? colors.teal700 : colors.teal400}`
                : "none",
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default function LeaderboardSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  // Get the most recent (last) competition
  const sortedCompetitions = [...competitions].sort(
    (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
  );

  const mostRecentCompetition = sortedCompetitions[0];

  // Filter results for the most recent competition and sort by score (descending)
  const topResults = [...competitionResults]
    .filter((result) => result.competition_id === mostRecentCompetition.id)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 5); // Top 5 results

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? `${colors.teal900}20`
            : `${colors.teal100}50`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <StarIcon fontSize="large" /> Leaderboard
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              Top performers from our most recent competition:{" "}
              <span style={{ fontWeight: "bold" }}>
                {mostRecentCompetition.title}
              </span>
            </Typography>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          elevation={isDarkMode ? 2 : 1}
          sx={{
            backgroundColor: isDarkMode ? colors.gray900 : colors.white,
            borderRadius: 2,
            overflow: "hidden",
            border: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    width: "80px",
                    backgroundColor: isDarkMode
                      ? colors.gray800
                      : colors.gray100,
                    borderBottom: `1px solid ${
                      isDarkMode ? colors.gray700 : colors.gray200
                    }`,
                    color: isDarkMode ? colors.gray300 : colors.gray700,
                    fontWeight: "bold",
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: isDarkMode
                      ? colors.gray800
                      : colors.gray100,
                    borderBottom: `1px solid ${
                      isDarkMode ? colors.gray700 : colors.gray200
                    }`,
                    color: isDarkMode ? colors.gray300 : colors.gray700,
                    fontWeight: "bold",
                  }}
                >
                  Student
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "150px",
                    backgroundColor: isDarkMode
                      ? colors.gray800
                      : colors.gray100,
                    borderBottom: `1px solid ${
                      isDarkMode ? colors.gray700 : colors.gray200
                    }`,
                    color: isDarkMode ? colors.gray300 : colors.gray700,
                    fontWeight: "bold",
                  }}
                >
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topResults.map((result, index) => (
                <LeaderboardItem
                  key={result.id}
                  rank={index + 1}
                  userId={result.user_id}
                  score={result.score || 0}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
