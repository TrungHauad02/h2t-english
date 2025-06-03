import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Avatar,
  Box,
  Chip,
  TableCell,
  TableRow,
  Typography,
  Tooltip,
  Zoom,
  Fade,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "interfaces";
import { userService } from "services";

interface LeaderboardItemProps {
  rank: number;
  userId: number;
  score: number;
}

export default function LeaderboardItem({
  rank,
  userId,
  score,
}: LeaderboardItemProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await userService.findOwnerById(userId);
        setUser(resData.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

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

  const getRankBgColor = () => {
    if (rank === 1) return isDarkMode ? `${color.teal800}` : `${color.teal100}`;
    if (rank === 2) return isDarkMode ? `${color.gray700}` : `${color.gray200}`;
    if (rank === 3)
      return isDarkMode ? `${color.emerald900}` : `${color.emerald100}`;
    return "transparent";
  };

  const getScoreChipColor = () => {
    if (rank === 1)
      return {
        bg: isDarkMode ? color.teal800 : color.teal100,
        text: isDarkMode ? color.teal200 : color.teal800,
        border: isDarkMode ? color.teal600 : color.teal400,
      };
    if (rank === 2)
      return {
        bg: isDarkMode ? color.gray700 : color.gray200,
        text: isDarkMode ? color.gray200 : color.gray800,
        border: isDarkMode ? color.gray500 : color.gray400,
      };
    if (rank === 3)
      return {
        bg: isDarkMode ? color.emerald900 : color.emerald100,
        text: isDarkMode ? color.emerald300 : color.emerald800,
        border: isDarkMode ? color.emerald700 : color.emerald400,
      };
    return {
      bg: isDarkMode ? color.gray800 : color.gray100,
      text: isDarkMode ? color.gray300 : color.gray700,
      border: isDarkMode ? color.gray600 : color.gray300,
    };
  };

  const scoreColors = getScoreChipColor();

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: isDarkMode
            ? `${color.gray700}80`
            : `${color.gray100}80`,
          transform: "translateY(-2px)",
          boxShadow: 2,
        },
        transition: "all 0.3s ease",
        position: "relative",
        backgroundColor: rank <= 3 ? `${getRankBgColor()}40` : "transparent",
        borderLeft:
          rank <= 3 ? `4px solid ${getMedalColor()}` : `4px solid transparent`,
      }}
    >
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{
          py: 2,
          borderBottom: `1px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          position: "relative",
        }}
      >
        <Fade in={isLoaded} timeout={300 + rank * 100}>
          <Box>
            {rank <= 3 ? (
              <Tooltip
                title={
                  rank === 1
                    ? "Gold Medal"
                    : rank === 2
                    ? "Silver Medal"
                    : "Bronze Medal"
                }
                arrow
                TransitionComponent={Zoom}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {rank === 1 ? (
                    <EmojiEventsIcon
                      sx={{
                        color: getMedalColor(),
                        fontSize: 30,
                        filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.3))",
                      }}
                    />
                  ) : (
                    <WorkspacePremiumIcon
                      sx={{
                        color: getMedalColor(),
                        fontSize: 26,
                        filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.2))",
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
            ) : (
              <Typography
                variant="body1"
                fontWeight="medium"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                {rank}
              </Typography>
            )}
          </Box>
        </Fade>
      </TableCell>

      <TableCell
        sx={{
          py: 2,
          borderBottom: `1px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
        }}
      >
        <Fade in={isLoaded} timeout={400 + rank * 100}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 46,
                height: 46,
                mr: 2,
                border: rank <= 3 ? `2px solid ${getMedalColor()}` : "none",
                boxShadow: rank <= 3 ? "0 0 8px rgba(0,0,0,0.15)" : "none",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            <Box>
              <Typography
                variant="body1"
                fontWeight={rank <= 3 ? "bold" : "medium"}
                sx={{
                  color: rank <= 3 && isDarkMode ? color.white : "inherit",
                  fontSize: rank === 1 ? "1.05rem" : "inherit",
                }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  display: isMobile ? "none" : "block",
                }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          py: 2,
          borderBottom: `1px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
        }}
      >
        <Fade in={isLoaded} timeout={500 + rank * 100}>
          <Box>
            <Chip
              label={`${score} points`}
              sx={{
                fontWeight: "bold",
                backgroundColor: scoreColors.bg,
                color: scoreColors.text,
                border: `1px solid ${scoreColors.border}`,
                padding: "4px 0",
                fontSize: rank === 1 ? "0.95rem" : "0.875rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor:
                    rank === 1
                      ? isDarkMode
                        ? color.teal700
                        : color.teal200
                      : scoreColors.bg,
                },
              }}
            />
          </Box>
        </Fade>
      </TableCell>
    </TableRow>
  );
}
