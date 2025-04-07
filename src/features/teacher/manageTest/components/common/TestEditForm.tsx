import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import {
  WETextField,
  WESaveChangeButtons,
} from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Test } from "interfaces";
import useColor from "theme/useColor";
import DescriptionIcon from "@mui/icons-material/Description";

interface ReadingEditFormProps {
  editData: Test | null;
  handleInputChange: (field: keyof Test, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ReadingEditForm({
  editData,
  handleInputChange,
  onSave,
  onCancel,
}: ReadingEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray600 : color.gray200;
  const labelColor = isDarkMode ? color.gray300 : color.gray600;

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
            <DescriptionIcon
              sx={{ color: color.teal500, fontSize: 40, mb: 2 }}
            />
            <Typography
              variant="subtitle2"
              color={labelColor}
              align="center"
            >
              Fill out the test details on the right. Don’t forget to save changes!
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
                label="Title"
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

            {/* Description */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Description"
                type="text"
                value={editData?.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                multiline
                rows={6}
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
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
