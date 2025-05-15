import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import {
  WETextField,
  WESaveChangeButtons,
  WEDateTimeField,
} from "components/input";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface CompetitionEditFormProps {
  editData: CompetitionTest | null;
  handleInputChange: (field: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function CompetitionEditForm({
  editData,
  handleInputChange,
  onSave,
  onCancel,
}: CompetitionEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray600 : color.gray200;
  const labelColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mb: 4,
      }}
    >
      <Grid container spacing={4}>
        {/* Left Side: Reserved space or extra info */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: cardBgColor,
              borderRadius: 3,
              p: 3,
              border: `1px solid ${borderColor}`,
              minHeight: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmojiEventsIcon
              sx={{ color: accentColor, fontSize: 40, mb: 2 }}
            />
            <Typography
              variant="subtitle2"
              color={labelColor}
              align="center"
            >
              Set up your competition details. Be sure to set the start and end times for participants.
            </Typography>
          </Box>

          <Box mt={3}>
            <WESaveChangeButtons handleSave={onSave} handleCancel={onCancel} />
          </Box>
        </Grid>

        {/* Right Side: Form fields */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Title */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Competition Title"
                type="text"
                value={editData?.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Duration */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Duration (minutes)"
                type="number"
                value={editData?.duration || 0}
                onChange={(e) =>
                  handleInputChange("duration", Number(e.target.value))
                }
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Start Time */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <WEDateTimeField
                label="Start Time"
                value={editData?.startTime ? new Date(editData.startTime) : new Date()}
                onChange={(date) => handleInputChange("startTime", date)} 
                name="startTime"
                required={true}  
                placeholder="Select start time"
                sx={{
                  width: "100%",  
                }}
              />
              </LocalizationProvider>
            </Box>

            {/* End Time */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <WEDateTimeField
              label="End Time"
              value={editData?.endTime ? new Date(editData.endTime) : new Date()}
              onChange={(date) => handleInputChange("endTime", date)}  
              name="endTime"
              required={true}  
              placeholder="Select end time"
              sx={{
                width: "100%",  
              }}
            />
              </LocalizationProvider>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}