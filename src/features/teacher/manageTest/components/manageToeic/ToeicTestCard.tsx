import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  alpha,
  CardActionArea,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Toeic } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ToeicTestCardProps {
  test: Toeic;
  onView: () => void;
  onDelete: () => void;
}

export default function ToeicTestCard({
  test,
  onView,
  onDelete,
}: ToeicTestCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const statusColor = test.status
    ? isDarkMode
      ? color.successDarkMode
      : color.success
    : isDarkMode
    ? color.gray500
    : color.gray600;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView();
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        borderLeft: `5px solid ${test.status ? color.teal600 : color.gray400}`,
        borderRadius: "16px",
        overflow: "visible",
        position: "relative",
        boxShadow: isDarkMode
          ? `0 8px 24px ${alpha(color.black, 0.25)}`
          : `0 8px 24px ${alpha(color.teal300, 0.15)}`,
        "&:hover": {
          transform: "translateY(-10px) scale(1.02)",
          boxShadow: isDarkMode
            ? `0 16px 32px ${alpha(color.black, 0.35)}`
            : `0 16px 32px ${alpha(color.teal400, 0.25)}`,
          borderLeft: `5px solid ${test.status ? color.teal400 : color.gray500}`,
        },
      }}
    >
      <CardActionArea 
        onClick={handleCardClick}
        sx={{ 
          height: "100%", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "stretch",
          "& .MuiTouchRipple-root": {
            color: isDarkMode ? color.teal700 : color.teal300
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, position: "relative", p: 3 }}>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 1,
            }}
          >
            <Chip
              label={test.status ? "Published" : "Draft"}
              sx={{
                backgroundColor: alpha(statusColor, isDarkMode ? 0.25 : 0.15),
                color: statusColor,
                fontWeight: 600,
                fontSize: "0.75rem",
                height: "26px",
                borderRadius: "8px",
                boxShadow: `0 2px 8px ${alpha(statusColor, 0.2)}`,
                "& .MuiChip-label": {
                  px: 1.5,
                }
              }}
              size="small"
            />
          </Box>

          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            sx={{
              mb: 2.5,
              color: isDarkMode ? color.gray100 : color.gray900,
              maxWidth: "85%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              letterSpacing: "-0.01em",
            }}
          >
            {test.title}
          </Typography>

          <Stack spacing={2.5} sx={{ mt: 3 }}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                p: 1.8,
                borderRadius: "12px",
                backgroundColor: isDarkMode
                  ? alpha(color.teal900, 0.5)
                  : alpha(color.teal50, 0.9),
                boxShadow: `0 3px 12px ${alpha(
                  isDarkMode ? color.teal800 : color.teal100, 
                  0.3
                )}`,
                transform: "translateZ(0)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? alpha(color.teal900, 0.7)
                    : alpha(color.teal100, 0.7),
                }
              }}
            >
              <AccessTimeIcon
                fontSize="small"
                sx={{
                  mr: 1.5,
                  color: isDarkMode ? color.teal200 : color.teal700,
                }}
              />
              <Typography
                variant="body2"
                sx={{ 
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontSize: "0.95rem",
                }}
              >
                <Box component="span" fontWeight="600">
                  Duration:
                </Box>{" "}
                {test.duration} minutes
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              sx={{
                p: 1.8,
                borderRadius: "12px",
                backgroundColor: isDarkMode
                  ? alpha(color.emerald900, 0.5)
                  : alpha(color.emerald50, 0.9),
                boxShadow: `0 3px 12px ${alpha(
                  isDarkMode ? color.emerald800 : color.emerald100, 
                  0.3
                )}`,
                transform: "translateZ(0)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? alpha(color.emerald900, 0.7)
                    : alpha(color.emerald100, 0.7),
                }
              }}
            >
              <QuizIcon
                fontSize="small"
                sx={{
                  mr: 1.5,
                  color: isDarkMode ? color.emerald200 : color.emerald700,
                }}
              />
              <Typography
                variant="body2"
                sx={{ 
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontSize: "0.95rem",
                }}
              >
                <Box component="span" fontWeight="600">
                  Questions:
                </Box>{" "}
                {test.totalQuestions}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>

      <Divider
        sx={{
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
          height: "2px",
          opacity: isDarkMode ? 0.4 : 0.6,
        }}
      />

      <CardActions
        sx={{
          p: 2,
          justifyContent: "space-between",
          backgroundColor: isDarkMode
            ? alpha(color.gray900, 0.4)
            : alpha(color.gray50, 0.7),
        }}
      >
        <Tooltip title="View Test Details" arrow placement="top">
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: isDarkMode
                ? alpha(color.info, 0.15)
                : alpha(color.info, 0.1),
              color: isDarkMode ? color.infoDarkMode : color.info,
              borderRadius: "8px",
              px: 1.5,
              py: 0.8,
              fontWeight: 600,
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.info, 0.25)
                  : alpha(color.info, 0.2),
                transform: "translateY(-2px)",
                boxShadow: `0 4px 12px ${alpha(color.info, 0.25)}`,
              },
              "& svg": {
                mr: 0.8,
                fontSize: "1.1rem",
              }
            }}
            onClick={onView}
          >
            <VisibilityOutlinedIcon /> View Details
          </Box>
        </Tooltip>

        <Tooltip title="Delete Test" arrow placement="top">
          <IconButton
            onClick={(e) => {
              onDelete();
            }}
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.error, 0.15)
                : alpha(color.error, 0.1),
              color: isDarkMode ? color.errorDarkMode : color.error,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.error, 0.25)
                  : alpha(color.error, 0.2),
                transform: "translateY(-2px)",
                boxShadow: `0 4px 12px ${alpha(color.error, 0.25)}`,
              },
            }}
            size="small"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}