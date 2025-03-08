import { Box, Button } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WESaveChangeButtonsProps {
  handleSave: () => void;
  handleCancel: () => void;
}

export default function WESaveChangeButtons({
  handleSave,
  handleCancel,
}: WESaveChangeButtonsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          backgroundColor: isDarkMode ? color.emerald400 : color.emerald600,
          color: "white",
          "&:hover": {
            backgroundColor: isDarkMode ? color.emerald500 : color.emerald700,
          },
          mr: 2,
        }}
      >
        Save Changes
      </Button>

      <Button
        variant="outlined"
        onClick={handleCancel}
        sx={{
          borderColor: isDarkMode ? color.gray400 : color.gray500,
          color: isDarkMode ? color.gray400 : color.gray500,
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}
