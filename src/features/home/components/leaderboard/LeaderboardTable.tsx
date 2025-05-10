import { TableCell, TableHead, TableRow, Box, Tooltip } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function LeaderboardTable() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const headerBgGradient = isDarkMode
    ? `linear-gradient(180deg, ${color.gray800} 0%, ${color.gray900} 100%)`
    : `linear-gradient(180deg, ${color.gray200} 0%, ${color.gray100} 100%)`;

  const headerBorder = `1px solid ${
    isDarkMode ? color.gray700 : color.gray300
  }`;

  const headerTextGradient = isDarkMode
    ? `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal300} 100%)`
    : `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal600} 100%)`;

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="center"
          sx={{
            width: { xs: "60px", md: "80px" },
            background: headerBgGradient,
            borderBottom: headerBorder,
            borderRight: headerBorder,
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: "bold",
            px: { xs: 1, md: 2 },
            py: 2.5,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 2,
              background: headerTextGradient,
              opacity: 0.8,
            },
          }}
        >
          <Tooltip title="Ranking Position" arrow placement="top">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <EmojiEventsIcon
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  color: isDarkMode ? color.teal400 : color.teal600,
                  verticalAlign: "middle",
                  marginBottom: "2px",
                }}
              />
              <Box
                component="span"
                sx={{
                  background: headerTextGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Rank
              </Box>
            </Box>
          </Tooltip>
        </TableCell>

        <TableCell
          sx={{
            background: headerBgGradient,
            borderBottom: headerBorder,
            borderRight: headerBorder,
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: "bold",
            px: { xs: 1, md: 2 },
            py: 2.5,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 2,
              background: headerTextGradient,
              opacity: 0.8,
            },
          }}
        >
          <Tooltip title="Student Information" arrow placement="top">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <PersonIcon
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  color: isDarkMode ? color.teal400 : color.teal600,
                  verticalAlign: "middle",
                  marginBottom: "2px",
                }}
              />
              <Box
                component="span"
                sx={{
                  background: headerTextGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Student
              </Box>
            </Box>
          </Tooltip>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            width: { xs: "100px", md: "150px" },
            background: headerBgGradient,
            borderBottom: headerBorder,
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: "bold",
            px: { xs: 1, md: 2 },
            py: 2.5,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 2,
              background: headerTextGradient,
              opacity: 0.8,
            },
          }}
        >
          <Tooltip title="Competition Score" arrow placement="top">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <ScoreboardIcon
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  color: isDarkMode ? color.teal400 : color.teal600,
                  verticalAlign: "middle",
                  marginBottom: "2px",
                }}
              />
              <Box
                component="span"
                sx={{
                  background: headerTextGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Score
              </Box>
            </Box>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
