import React from "react";
import { Box, Typography, Paper, IconButton, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { User } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ContactInfoSectionProps {
  teacher: User;
  isMobile: boolean;
}

export default function ContactInfoSection({
  teacher,
  isMobile,
}: ContactInfoSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      sx={{ width: "100%", mb: 3 }}
    >
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 2,
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
      >
        <IconButton
          size="small"
          sx={{
            bgcolor: isDarkMode ? color.teal700 : color.teal100,
            color: isDarkMode ? color.teal200 : color.teal700,
            mr: 1.5,
            "&:hover": {
              bgcolor: isDarkMode ? color.teal600 : color.teal200,
            },
          }}
        >
          <EmailIcon fontSize="small" />
        </IconButton>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              display: "block",
            }}
          >
            Email
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray100 : color.gray900,
              fontWeight: "medium",
            }}
          >
            {teacher.email}
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 2,
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
      >
        <IconButton
          size="small"
          sx={{
            bgcolor: isDarkMode ? color.emerald700 : color.emerald100,
            color: isDarkMode ? color.emerald200 : color.emerald700,
            mr: 1.5,
            "&:hover": {
              bgcolor: isDarkMode ? color.emerald600 : color.emerald200,
            },
          }}
        >
          <PhoneIcon fontSize="small" />
        </IconButton>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              display: "block",
            }}
          >
            Phone
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray100 : color.gray900,
              fontWeight: "medium",
            }}
          >
            {teacher.phoneNumber}
          </Typography>
        </Box>
      </Paper>
    </Stack>
  );
}
