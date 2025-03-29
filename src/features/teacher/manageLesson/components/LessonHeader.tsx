import {
  Box,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";

interface LessonHeaderProps {
  title: string;
  onEditMode: () => void;
}

export default function LessonHeader({ title, onEditMode }: LessonHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const headerBgColor = isDarkMode ? color.gray800 : color.white;
  const titleColor = isDarkMode ? color.teal200 : color.teal700;
  const editBtnColor = isDarkMode ? color.emerald400 : color.emerald600;
  const backBtnColor = isDarkMode ? color.gray300 : color.gray700;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      component={Paper}
      elevation={isDarkMode ? 4 : 2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        py: { xs: 1.5, sm: 2 },
        px: { xs: 2, sm: 3 },
        borderRadius: "16px",
        backgroundColor: headerBgColor,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        borderBottom: `3px solid ${isDarkMode ? color.teal700 : color.teal400}`,
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 8px 16px rgba(0,0,0,0.25)"
            : "0 6px 12px rgba(0,0,0,0.1)",
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${
            isDarkMode ? "rgba(20, 184, 166, 0.1)" : "rgba(20, 184, 166, 0.05)"
          } 0%, transparent 50%)`,
          zIndex: 0,
        },
      }}
    >
      <Tooltip title="Go back" arrow placement="top">
        <IconButton
          onClick={handleGoBack}
          aria-label="Go back"
          sx={{
            color: backBtnColor,
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.03)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.08)",
              transform: "scale(1.05)",
              color: isDarkMode ? color.white : color.black,
            },
            zIndex: 1,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      <Typography
        variant={isMobile ? "h4" : "h3"}
        sx={{
          fontWeight: 700,
          color: titleColor,
          flex: 1,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          px: 2,
          textShadow: isDarkMode ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
          whiteSpace: { xs: "normal", sm: "nowrap" },
        }}
      >
        {title}
      </Typography>

      <Tooltip title="Edit lesson" arrow placement="top">
        <IconButton
          onClick={onEditMode}
          aria-label="Edit lesson"
          sx={{
            color: editBtnColor,
            backgroundColor: isDarkMode
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(16, 185, 129, 0.08)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(16, 185, 129, 0.15)",
              transform: "scale(1.05)",
              boxShadow: `0 0 8px ${
                isDarkMode
                  ? "rgba(16, 185, 129, 0.4)"
                  : "rgba(16, 185, 129, 0.3)"
              }`,
            },
            zIndex: 1,
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
