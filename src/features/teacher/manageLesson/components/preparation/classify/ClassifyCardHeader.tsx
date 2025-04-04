import {
  Avatar,
  Box,
  CardHeader,
  Chip,
  Typography,
  useMediaQuery,
  Theme,
  Badge,
  alpha,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useState, useEffect } from "react";

interface ClassifyCardHeaderProps {
  groupColor: string;
  firstLetter: string;
  item: {
    id: number;
    groupName: string;
    members: string[];
    status: boolean;
  };
  isEditMode: boolean;
}

export default function ClassifyCardHeader({
  groupColor,
  firstLetter,
  item,
  isEditMode,
}: ClassifyCardHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [animate, setAnimate] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Status indicator values
  const statusIcon = item.status ? (
    <CheckCircle fontSize="small" sx={{ fontSize: "16px" }} />
  ) : (
    <Cancel fontSize="small" sx={{ fontSize: "16px" }} />
  );

  const statusLabel = item.status ? "Active" : "Inactive";
  const statusColor = item.status
    ? isDarkMode
      ? color.emerald600
      : color.emerald500
    : isDarkMode
    ? color.red600
    : color.red500;

  // Dynamic background gradient for avatar
  const avatarBg = `linear-gradient(135deg, ${groupColor}, ${
    isDarkMode ? alpha(groupColor, 0.7) : alpha(groupColor, 0.8)
  })`;

  return (
    <CardHeader
      avatar={
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar
            sx={{
              background: avatarBg,
              color: color.white,
              width: isMobile ? 40 : 46,
              height: isMobile ? 40 : 46,
              boxShadow: `0 0 0 1px ${
                isDarkMode ? color.gray800 : color.white
              }, 0 0 0 3px ${alpha(groupColor, 0.3)}`,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: animate ? "scale(1.08)" : "scale(1)",
              "&:hover": {
                transform: "scale(1.12) rotate(5deg)",
                boxShadow: `0 0 0 1px ${
                  isDarkMode ? color.gray800 : color.white
                }, 0 0 10px 3px ${alpha(groupColor, 0.4)}`,
              },
              fontWeight: "bold",
              fontSize: isMobile ? "1.2rem" : "1.4rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {firstLetter}
          </Avatar>
        </Badge>
      }
      title={
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            maxWidth: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.gray100 : color.gray900,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mb: 0.2,
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: groupColor,
                transform: "translateX(3px)",
              },
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              pr: 1,
            }}
          >
            {item.groupName}
          </Typography>
          {animate && (
            <Box
              sx={{
                position: "absolute",
                height: "2px",
                width: "100%",
                bottom: 0,
                left: 0,
                background: `linear-gradient(90deg, transparent, ${groupColor}, transparent)`,
                animation: "flowAnimation 1.5s ease-in-out",
                "@keyframes flowAnimation": {
                  "0%": { width: "0%", opacity: 0 },
                  "50%": { width: "80%", opacity: 1 },
                  "100%": { width: "100%", opacity: 0 },
                },
              }}
            />
          )}
        </Box>
      }
      action={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            mr: isMobile ? 0.5 : 1,
          }}
        >
          <Chip
            icon={statusIcon}
            label={statusLabel}
            sx={{
              color: color.white,
              bgcolor: statusColor,
              border: `1px solid ${alpha(statusColor, 0.8)}`,
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 28,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              "&:hover": {
                transform: "translateY(-3px) scale(1.05)",
                boxShadow: `0 4px 8px ${
                  isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)"
                }`,
                bgcolor: alpha(statusColor, 0.9),
              },
              pl: 0.8,
              "& .MuiChip-icon": {
                mr: 0.5,
                ml: -0.2,
                color: color.white,
              },
              backdropFilter: "blur(4px)",
            }}
            size="small"
          />
        </Box>
      }
      sx={{
        pb: 1,
        pt: 1.5,
        px: isMobile ? 1.5 : 2,
        position: "relative",
        overflow: "visible",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: isMobile ? "15%" : "10%",
          width: isMobile ? "70%" : "80%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${
            isDarkMode ? alpha(groupColor, 0.3) : alpha(groupColor, 0.2)
          }, transparent)`,
        },
        "& .MuiCardHeader-action": {
          margin: 0,
          alignSelf: "center",
          marginTop: 0,
          marginRight: 0,
        },
        "& .MuiCardHeader-content": {
          flex: "1 1 auto",
          minWidth: 0,
        },
        "& .MuiCardHeader-avatar": {
          marginRight: 2,
        },
      }}
    />
  );
}
