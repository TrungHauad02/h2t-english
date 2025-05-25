import React from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  Card,
  Fade,
  Slide,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import useStudentProfile from "../hooks/useStudentProfile";
import ViewModeContent from "./ViewModeContent";
import EditModeContent from "./EditModeContent";

export default function StudentProfile() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useStudentProfile();

  if (!hooks.data) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color.teal400} 0%, ${color.emerald500} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 0.7 },
              "50%": { transform: "scale(1.1)", opacity: 1 },
              "100%": { transform: "scale(1)", opacity: 0.7 },
            },
          }}
        >
          <PersonIcon sx={{ fontSize: 40, color: color.white }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Loading your profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in timeout={800}>
      <Stack spacing={4}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", md: "2.5rem" },
                background: `linear-gradient(135deg, ${
                  isDarkMode ? color.teal300 : color.teal600
                } 0%, ${
                  isDarkMode ? color.emerald300 : color.emerald600
                } 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              Student Profile
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                fontSize: "1.1rem",
                mt: 0.5,
              }}
            >
              Manage your personal information and preferences
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Slide direction="left" in timeout={600}>
            <Box>
              {!hooks.isEditMode ? (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<EditIcon />}
                  onClick={() => hooks.setIsEditMode(true)}
                  sx={{
                    background: `linear-gradient(135deg, ${color.edit} 0%, ${color.yellow} 100%)`,
                    color: color.gray900,
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: "2rem",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: `0 8px 32px ${color.edit}40`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${color.yellow} 0%, ${color.edit} 100%)`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 40px ${color.edit}60`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={hooks.handleSave}
                    sx={{
                      background: `linear-gradient(135deg, ${color.save} 0%, ${color.emerald600} 100%)`,
                      color: color.white,
                      fontWeight: "bold",
                      px: 4,
                      py: 1.5,
                      borderRadius: "2rem",
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: `0 8px 32px ${color.save}40`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${color.emerald600} 0%, ${color.save} 100%)`,
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 40px ${color.save}60`,
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CancelIcon />}
                    onClick={hooks.handleCancel}
                    sx={{
                      background: `linear-gradient(135deg, ${color.delete} 0%, ${color.red600} 100%)`,
                      color: color.white,
                      fontWeight: "bold",
                      px: 4,
                      py: 1.5,
                      borderRadius: "2rem",
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: `0 8px 32px ${color.delete}40`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${color.red600} 0%, ${color.delete} 100%)`,
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 40px ${color.delete}60`,
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              )}
            </Box>
          </Slide>
        </Box>

        {/* Profile Card */}
        <Slide direction="up" in timeout={800}>
          <Card
            elevation={0}
            sx={{
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.gray900}95 0%, ${color.gray800}95 100%)`
                : `linear-gradient(135deg, ${color.white}95 0%, ${color.gray50}95 100%)`,
              backdropFilter: "blur(20px)",
              borderRadius: "2rem",
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              overflow: "hidden",
              position: "relative",
              boxShadow: isDarkMode
                ? `0 20px 80px ${color.black}40, 0 0 0 1px ${color.gray700}20`
                : `0 20px 80px ${color.gray900}10, 0 0 0 1px ${color.gray200}40`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: `linear-gradient(90deg, ${color.teal400} 0%, ${color.emerald500} 50%, ${color.green500} 100%)`,
              },
            }}
          >
            {!hooks.isEditMode && (
              <Box
                sx={{
                  height: { xs: 120, md: 160 },
                  background: isDarkMode
                    ? `linear-gradient(135deg, ${color.teal900} 0%, ${color.emerald900} 50%, ${color.gray900} 100%)`
                    : `linear-gradient(135deg, ${color.teal200} 0%, ${color.emerald200} 50%, ${color.green200} 100%)`,
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDarkMode
                      ? `radial-gradient(circle at 30% 70%, ${color.teal600}20 0%, transparent 70%)`
                      : `radial-gradient(circle at 30% 70%, ${color.white}30 0%, transparent 70%)`,
                  },
                }}
              />
            )}

            {hooks.isEditMode ? (
              <EditModeContent
                formData={hooks.formData}
                handleChange={hooks.handleChange}
                handleAvatarChange={hooks.handleAvatarChange}
                handleDateChange={hooks.handleDateChange}
              />
            ) : (
              <ViewModeContent data={hooks.data} />
            )}
          </Card>
        </Slide>
      </Stack>
    </Fade>
  );
}
