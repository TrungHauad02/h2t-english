import { Box, Grid, Paper, Stack, Button } from "@mui/material";
import { WESelectImage, WETextField } from "components/input";
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
          <WESelectImage
            value={editedData?.image || ""}
            onChange={handleImageChange}
            label="Route Image"
            required
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <WETextField
              label="Route Title"
              type="text"
              value={editedData?.title || ""}
              onChange={handleInputChange}
              name="title"
              required
            />
            <WETextField
              label="Description"
              type="text"
              value={editedData?.description || ""}
              onChange={handleInputChange}
              name="description"
              required
            />
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={onSave}
                sx={{
                  backgroundColor: isDarkMode
                    ? color.emerald400
                    : color.emerald600,
                  color: "white",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? color.emerald500
                      : color.emerald700,
                  },
                  mr: 2,
                }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                onClick={onCancel}
                sx={{
                  borderColor: isDarkMode ? color.gray400 : color.gray500,
                  color: isDarkMode ? color.gray400 : color.gray500,
                }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
