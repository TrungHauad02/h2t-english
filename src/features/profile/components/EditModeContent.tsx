import React from "react";
import { CardContent, Grid, Stack, Typography, Divider } from "@mui/material";
import { WEDateField, WESelectImage, WETextField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { User } from "interfaces";

interface EditModeContentProps {
  formData: User | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarChange: (url: string) => void;
  handleDateChange: (date: Date | null) => void;
}

const EditModeContent = ({
  formData,
  handleChange,
  handleAvatarChange,
  handleDateChange,
}: EditModeContentProps) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const textColor = isDarkMode ? color.gray200 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  return (
    <CardContent sx={{ maxwidth: { md: "1400px" }, overflow: "hidden", p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
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
              }}
            >
              Click to change profile picture
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Typography
              variant="subtitle1"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: "bold",
              }}
            >
              Personal Information
            </Typography>

            <WETextField
              name="name"
              label="Full Name"
              type="text"
              value={formData?.name || ""}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root fieldset": { borderColor },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                },
                "& .MuiInputBase-input": { color: textColor },
              }}
            />

            <WEDateField
              name="dateOfBirth"
              label="Date of Birth"
              value={new Date(formData?.dateOfBirth || "")}
              onChange={handleDateChange}
              sx={{
                "& .MuiOutlinedInput-root fieldset": { borderColor },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? color.gray400 : color.gray600,
                },
                "& .MuiInputBase-input": { color: textColor },
              }}
            />

            <Stack spacing={2}>
              <Divider sx={{ borderColor }} />

              <Typography
                variant="subtitle1"
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal700,
                  fontWeight: "bold",
                }}
              >
                Contact Information
              </Typography>

              <WETextField
                name="email"
                label="Email Address"
                type="email"
                value={formData?.email || ""}
                onChange={handleChange}
                disabled
                sx={{
                  "& .MuiOutlinedInput-root fieldset": { borderColor },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                  "& .MuiInputBase-input": { color: textColor },
                }}
              />

              <WETextField
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root fieldset": { borderColor },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? color.gray400 : color.gray600,
                  },
                  "& .MuiInputBase-input": { color: textColor },
                }}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default EditModeContent;
