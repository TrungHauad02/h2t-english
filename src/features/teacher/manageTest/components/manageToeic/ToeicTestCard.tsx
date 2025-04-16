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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Toeic } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ToeicTestCardProps {
  test: Toeic;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ToeicTestCard({
  test,
  onView,
  onEdit,
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

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        borderLeft: `4px solid ${test.status ? color.teal500 : color.gray400}`,
        borderRadius: "12px",
        overflow: "visible",
        position: "relative",
        boxShadow: isDarkMode
          ? "0 4px 20px rgba(0,0,0,0.2)"
          : "0 4px 20px rgba(0,0,0,0.05)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDarkMode
            ? `0 12px 24px ${alpha(color.black, 0.3)}`
            : `0 12px 24px ${alpha(color.teal300, 0.2)}`,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: "relative", p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography
            variant="h6"
            component="div"
            fontWeight="bold"
            sx={{
              mb: 1,
              color: isDarkMode ? color.gray100 : color.gray900,
              maxWidth: "80%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {test.title}
          </Typography>
          <Chip
            label={test.status ? "Published" : "Draft"}
            sx={{
              backgroundColor: alpha(statusColor, isDarkMode ? 0.2 : 0.1),
              color: statusColor,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: "24px",
            }}
            size="small"
          />
        </Box>

        <Stack spacing={2}>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              p: 1.5,
              borderRadius: "8px",
              backgroundColor: isDarkMode
                ? alpha(color.teal900, 0.4)
                : alpha(color.teal50, 0.8),
            }}
          >
            <AccessTimeIcon
              fontSize="small"
              sx={{
                mr: 1.5,
                color: isDarkMode ? color.teal300 : color.teal600,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray200 : color.gray700 }}
            >
              <Box component="span" fontWeight="medium">
                Duration:
              </Box>{" "}
              {test.duration} minutes
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              p: 1.5,
              borderRadius: "8px",
              backgroundColor: isDarkMode
                ? alpha(color.emerald900, 0.4)
                : alpha(color.emerald50, 0.8),
            }}
          >
            <QuizIcon
              fontSize="small"
              sx={{
                mr: 1.5,
                color: isDarkMode ? color.emerald300 : color.emerald600,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray200 : color.gray700 }}
            >
              <Box component="span" fontWeight="medium">
                Questions:
              </Box>{" "}
              {test.totalQuestions}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <Divider
        sx={{
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
        }}
      />

      <CardActions
        sx={{
          p: 2,
          justifyContent: "space-between",
          backgroundColor: isDarkMode
            ? alpha(color.gray900, 0.3)
            : alpha(color.gray50, 0.5),
        }}
      >
        <Tooltip title="View Test">
          <IconButton
            onClick={onView}
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.info, 0.1)
                : alpha(color.info, 0.05),
              color: isDarkMode ? color.infoDarkMode : color.info,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.info, 0.2)
                  : alpha(color.info, 0.1),
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Test">
          <IconButton
            onClick={onEdit}
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.edit, 0.1)
                : alpha(color.edit, 0.05),
              color: color.edit,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.edit, 0.2)
                  : alpha(color.edit, 0.1),
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Test">
          <IconButton
            onClick={onDelete}
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.error, 0.1)
                : alpha(color.error, 0.05),
              color: isDarkMode ? color.errorDarkMode : color.error,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.error, 0.2)
                  : alpha(color.error, 0.1),
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}