import { Box, Grid, Paper, Stack } from "@mui/material";
import {
  WESaveChangeButtons,
  WESelectImage,
  WETextField,
} from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteEditFormProps {
  editedData: any;
  setEditedData: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function RouteEditForm({
  editedData,
  setEditedData,
  onSave,
  onCancel,
}: RouteEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImageChange = (base64: string) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        image: base64,
      });
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              bgcolor: cardBgColor,
              borderRadius: 3,
              p: 3,
              border: `1px solid ${borderColor}`,
            }}
          >
            <WESelectImage
              value={editedData?.image || ""}
              onChange={handleImageChange}
              label="Route Image"
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            {/* Route Title field */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${borderColor}`,
              }}
            >
              <WETextField
                label="Route Title"
                type="text"
                value={editedData?.title || ""}
                onChange={handleInputChange}
                name="title"
                required
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
                value={editedData?.description || ""}
                onChange={handleInputChange}
                name="description"
                required
                multiline
                rows={6}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: { xs: "0.75rem", sm: "1rem" },
                    width: "100%",
                    paddingLeft: "1rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: `1px solid ${color.gray400}`,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: `2px solid ${
                        isDarkMode ? color.emerald400 : color.emerald500
                      }`,
                    },
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  },
                }}
              />
            </Box>

            {/* Save and Cancel buttons */}
            <WESaveChangeButtons handleSave={onSave} handleCancel={onCancel} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
