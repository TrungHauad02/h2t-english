import React from "react";
import {
  CardContent,
  Grid,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { WEDateField, WESelectImage, WETextField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { User } from "interfaces";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

interface EditModeContentProps {
  formData: User | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarChange: (url: string) => void;
  handleDateChange: (date: Date | null) => void;
}

const SectionCard = ({
  title,
  icon,
  children,
  gradient = false,
  sectionBg,
  isDarkMode,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient?: boolean;
  sectionBg: string;
  isDarkMode: boolean;
  color: any;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      borderRadius: "1.5rem",
      background: gradient
        ? `linear-gradient(135deg, ${
            isDarkMode ? color.teal900 : color.teal50
          } 0%, ${isDarkMode ? color.emerald900 : color.emerald50} 100%)`
        : sectionBg,
      border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      position: "relative",
      overflow: "hidden",
      "&::before": gradient
        ? {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode
              ? `radial-gradient(circle at top left, ${color.teal600}10 0%, transparent 70%)`
              : `radial-gradient(circle at top left, ${color.white}50 0%, transparent 70%)`,
          }
        : {},
    }}
  >
    <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            p: 1.5,
            borderRadius: "1rem",
            background: `linear-gradient(135deg, ${
              isDarkMode ? color.teal600 : color.teal500
            } 0%, ${isDarkMode ? color.emerald600 : color.emerald500} 100%)`,
            color: color.white,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          {title}
        </Typography>
      </Stack>
      {children}
    </Stack>
  </Paper>
);

export default function EditModeContent({
  formData,
  handleChange,
  handleAvatarChange,
  handleDateChange,
}: EditModeContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const textColor = isDarkMode ? color.gray200 : color.gray900;
  const borderColor = isDarkMode ? color.gray600 : color.gray400;
  const sectionBg = isDarkMode ? color.gray800 : color.gray50;

  return (
    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
      <Grid container spacing={4}>
        {/* Avatar Section */}
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Profile Picture"
            icon={<CameraAltIcon />}
            gradient
            sectionBg={sectionBg}
            isDarkMode={isDarkMode}
            color={color}
          >
            <Stack spacing={3} alignItems="center">
              <WESelectImage
                value={formData?.avatar || ""}
                onChange={handleAvatarChange}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray600,
                  textAlign: "center",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                Click the image above to upload a new profile picture
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>

        {/* Form Sections */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            {/* Personal Information */}
            <SectionCard
              title="Personal Information"
              icon={<PersonIcon />}
              sectionBg={sectionBg}
              isDarkMode={isDarkMode}
              color={color}
            >
              <Stack spacing={3}>
                <WETextField
                  name="name"
                  label="Full Name"
                  type="text"
                  value={formData?.name || ""}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "1rem",
                      background: isDarkMode ? color.gray900 : color.white,
                      "& fieldset": {
                        borderColor: borderColor,
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal400 : color.teal600,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal300 : color.teal600,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontWeight: 500,
                      "&.Mui-focused": {
                        color: isDarkMode ? color.teal300 : color.teal600,
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: textColor,
                      fontSize: "1rem",
                    },
                  }}
                />

                <WEDateField
                  name="dateOfBirth"
                  label="Date of Birth"
                  value={new Date(formData?.dateOfBirth || "")}
                  onChange={handleDateChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "1rem",
                      background: isDarkMode ? color.gray900 : color.white,
                      "& fieldset": {
                        borderColor: borderColor,
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal400 : color.teal600,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal300 : color.teal600,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontWeight: 500,
                      "&.Mui-focused": {
                        color: isDarkMode ? color.teal300 : color.teal600,
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: textColor,
                      fontSize: "1rem",
                    },
                  }}
                />
              </Stack>
            </SectionCard>

            {/* Contact Information */}
            <SectionCard
              title="Contact Information"
              icon={<ContactsIcon />}
              gradient
              sectionBg={sectionBg}
              isDarkMode={isDarkMode}
              color={color}
            >
              <Stack spacing={3}>
                <WETextField
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData?.email || ""}
                  onChange={handleChange}
                  disabled
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "1rem",
                      background: isDarkMode ? color.gray900 : color.gray100,
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray700 : color.gray300,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray500 : color.gray500,
                      fontWeight: 500,
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontSize: "1rem",
                    },
                  }}
                />

                <WETextField
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  value={formData?.phoneNumber || ""}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "1rem",
                      background: isDarkMode ? color.gray900 : color.white,
                      "& fieldset": {
                        borderColor: borderColor,
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? color.teal400 : color.teal600,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: isDarkMode ? color.teal300 : color.teal600,
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontWeight: 500,
                      "&.Mui-focused": {
                        color: isDarkMode ? color.teal300 : color.teal600,
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: textColor,
                      fontSize: "1rem",
                    },
                  }}
                />
              </Stack>
            </SectionCard>
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );
}
