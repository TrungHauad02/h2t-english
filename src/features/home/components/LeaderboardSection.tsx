import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  LinearProgress,
  Fade,
  Zoom,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  LeaderboardItem,
  LeaderboardTitle,
  LeaderboardTable,
} from "./leaderboard";
import { CompetitionTest, SubmitCompetition } from "interfaces";
import { useEffect, useState } from "react";
import { competitionTestService, submitCompetitionService } from "services";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function LeaderboardSection() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [lastCompletedCompetition, setLastCompletedCompetition] =
    useState<CompetitionTest | null>(null);
  const [topResults, setTopResults] = useState<SubmitCompetition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resData = await Promise.all([
          await competitionTestService.getLastCompletedCompetition(),
          await submitCompetitionService.getLeaderBoard(),
        ]);
        setLastCompletedCompetition(resData[0].data);
        setTopResults(resData[1].data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: isDarkMode ? color.gray900 : color.white,
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 0, md: 2 },
        boxShadow: isDarkMode
          ? "0 0 20px rgba(0,0,0,0.3)"
          : "0 0 15px rgba(0,0,0,0.05)",
      }}
    >
      {/* Background decoration elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? `${color.teal900}20`
            : `${color.teal100}30`,
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? `${color.emerald900}30`
            : `${color.emerald100}40`,
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "15%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? `${color.teal800}10`
            : `${color.teal200}20`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <LeaderboardTitle mostRecentCompetition={lastCompletedCompetition} />

        {loading ? (
          <Box sx={{ mt: 4 }}>
            <LinearProgress
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: isDarkMode ? color.gray800 : color.gray200,
                "& .MuiLinearProgress-bar": {
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${color.teal900}, ${color.teal700})`
                    : `linear-gradient(90deg, ${color.teal400}, ${color.teal600})`,
                  borderRadius: 3,
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                color: isDarkMode ? color.gray400 : color.gray600,
              }}
            >
              Loading leaderboard data...
            </Typography>
          </Box>
        ) : (
          <Fade in={!loading} timeout={800}>
            <TableContainer
              component={Paper}
              elevation={isDarkMode ? 3 : 1}
              sx={{
                backgroundColor: isDarkMode ? color.gray900 : color.white,
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
                boxShadow: isDarkMode
                  ? "0 4px 20px rgba(0,0,0,0.25)"
                  : "0 4px 20px rgba(0,0,0,0.03)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: isDarkMode
                    ? "0 6px 25px rgba(0,0,0,0.3)"
                    : "0 6px 25px rgba(0,0,0,0.06)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Table>
                <LeaderboardTable />
                <TableBody>
                  {topResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            opacity: 0.7,
                          }}
                        >
                          <Zoom in={true} timeout={1000}>
                            <EmojiEventsIcon
                              sx={{
                                fontSize: 60,
                                color: isDarkMode
                                  ? color.gray500
                                  : color.gray400,
                                opacity: 0.7,
                              }}
                            />
                          </Zoom>
                          <Typography
                            variant="h6"
                            sx={{
                              color: isDarkMode ? color.gray400 : color.gray600,
                              textAlign: "center",
                            }}
                          >
                            No results available
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDarkMode ? color.gray500 : color.gray500,
                              textAlign: "center",
                              maxWidth: 300,
                            }}
                          >
                            There are no competition results to display at the
                            moment.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    topResults.map((result, index) => (
                      <LeaderboardItem
                        key={result.id}
                        rank={index + 1}
                        userId={result.user_id}
                        score={result.score || 0}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        )}

        {!loading && topResults.length > 0 && (
          <Fade in={!loading} timeout={1500}>
            <Box
              sx={{
                mt: 3,
                p: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 1,
                borderRadius: 2,
                backgroundColor: isDarkMode
                  ? `${color.gray800}80`
                  : `${color.gray100}80`,
                border: `1px dashed ${
                  isDarkMode ? color.gray700 : color.gray300
                }`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <EmojiEventsIcon
                  sx={{
                    color: isDarkMode ? color.teal400 : color.teal600,
                    fontSize: 20,
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                  }}
                >
                  Congratulations to all participants!
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                The next competition will be announced soon.
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
}
