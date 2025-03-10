import { Box, Grid, Paper, Stack } from "@mui/material";
import {
  WETextField,
  WESelectImage,
  WESaveChangeButtons,
} from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Grammar } from "interfaces";
import useColor from "theme/useColor";

interface GrammarEditFormProps {
  editData: Grammar | null;
  handleInputChange: (field: keyof Grammar, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function GrammarEditForm({
  editData,
  handleInputChange,
  onSave,
  onCancel,
}: GrammarEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

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
        {/* Left column - Image selection */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: cardBgColor,
              borderRadius: 3,
              p: 3,
              border: `1px solid ${borderColor}`,
            }}
          >
            <WESelectImage
              label="Topic Image"
              value={editData?.image || ""}
              onChange={(base64) => handleInputChange("image", base64)}
              required
            />
          </Box>
          {/* Save and cancel buttons */}
          <WESaveChangeButtons handleSave={onSave} handleCancel={onCancel} />
        </Grid>

        {/* Right column - Form fields */}
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
                label="Description"
                type="text"
                value={editData?.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                multiline
                rows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
            {/* Definition field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Definition"
                type="text"
                value={editData?.definition || ""}
                onChange={(e) =>
                  handleInputChange("definition", e.target.value)
                }
                multiline
                rows={3}
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
