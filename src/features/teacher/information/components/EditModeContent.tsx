import React from "react";
import {
  CardContent,
  Grid,
  Stack,
  Typography,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { WEDateField, WESelectImage, WETextField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { LevelsEnum, User } from "interfaces";

interface EditModeContentProps {
  formData: User | null;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
  handleAvatarChange: (url: string) => void;
  handleDateChange: (date: Date | null) => void;
}

export default function EditModeContent({
  formData,
  handleChange,
  handleAvatarChange,
  handleDateChange,
}: EditModeContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray200 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const labelColor = isDarkMode ? color.gray400 : color.gray600;
  const headingColor = isDarkMode ? color.teal300 : color.teal700;

  const inputSx = {
    "& .MuiOutlinedInput-root fieldset": { borderColor },
    "& .MuiInputLabel-root": {
      color: labelColor,
    },
    "& .MuiInputBase-input": { color: textColor },
  };

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
                color: labelColor,
                textAlign: "center",
              }}
            >
              Click to change Information picture
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Typography
              variant="subtitle1"
              sx={{
                color: headingColor,
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
              sx={inputSx}
            />

            <WEDateField
              name="dateOfBirth"
              label="Date of Birth"
              value={
                formData?.dateOfBirth ? new Date(formData.dateOfBirth) : null
              }
              onChange={handleDateChange}
              required
              sx={inputSx}
            />

            <Stack spacing={2}>
              <Divider sx={{ borderColor }} />

              <Typography
                variant="subtitle1"
                sx={{
                  color: headingColor,
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
                sx={inputSx}
              />

              <WETextField
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                sx={inputSx}
              />

              <Divider sx={{ borderColor }} />

              <Typography
                variant="subtitle1"
                sx={{
                  color: headingColor,
                  fontWeight: "bold",
                }}
              >
                Level
              </Typography>

              <Select
                name="level"
                value={formData?.level || ""}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root fieldset": { borderColor },
                  "& .MuiInputLabel-root": {
                    color: labelColor,
                  },
                  "& .MuiInputBase-input": { color: textColor },
                }}
              >
                {Object.values(LevelsEnum).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level.charAt(0) + level.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );
}
