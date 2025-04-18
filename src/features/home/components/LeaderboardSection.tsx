import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { LeaderboardItem, useLeaderboard, LeaderboardTitle, LeaderboardTable } from "./leaderboard"

export default function LeaderboardSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const hooks = useLeaderboard();
  const topResults = hooks.topResults();

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
        <LeaderboardTitle mostRecentCompetition={hooks.mostRecentCompetition()} />
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
            <LeaderboardTable />
            <TableBody>
              {topResults.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No results available
                  </TableCell>
                </TableRow>
              ) : (
                topResults.map((result, index) => (
                  <LeaderboardItem key={result.id} rank={index + 1} userId={result.user_id} score={result.score || 0} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
