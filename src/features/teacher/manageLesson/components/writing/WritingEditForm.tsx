import { Box, Grid, Paper, Stack } from "@mui/material";
import {
  WESelectImage,
  WESaveChangeButtons,
  WETextField,
} from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Writing } from "interfaces";

interface WritingEditFormProps {
  editData: Writing | null;
  handleInputChange: (field: keyof Writing, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function WritingEditForm({
  editData,
  handleInputChange,
  onSave,
  onCancel,
}: WritingEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray600 : color.gray200;

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
      <Grid container spacing={3}>
        {/* Left Column - File Upload */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: cardBgColor,
              borderRadius: 3,
              p: 3,
              border: `1px solid ${borderColor}`,
              mb: 2,
            }}
          >
            <WESelectImage
              label="Attach Image"
              value={editData?.image || ""}
              onChange={(base64) => handleInputChange("image", base64)}
            />
          </Box>
          <WESaveChangeButtons handleSave={onSave} handleCancel={onCancel} />
        </Grid>

        {/* Right Column - Content Fields */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Title field */}
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

            {/* Description field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                required
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
            {/* Topic Section */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Writing Topic"
                type="text"
                value={editData?.topic || ""}
                onChange={(e) => handleInputChange("topic", e.target.value)}
                placeholder="Enter writing topic..."
                required
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
