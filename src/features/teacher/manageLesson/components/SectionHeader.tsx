import { Box, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import useColor from "theme/useColor";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";

interface SectionHeaderProps {
  title: string;
  editText?: string;
  icon: React.ReactNode;
  isEditMode: boolean;
  handleEditMode: () => void;
  handleSaveChanges: () => void;
  handleCancelEdit: () => void;
}

export default function SectionHeader({
  title,
  editText,
  icon,
  isEditMode,
  handleEditMode,
  handleSaveChanges,
  handleCancelEdit,
}: SectionHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CustomIcon accentColor={accentColor}>{icon}</CustomIcon>
        <Typography variant="h5" fontWeight="medium" color={textColor}>
          {title}
        </Typography>
      </Box>

      <Box>
        {isEditMode ? (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
              sx={{
                bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
                color: "white",
                mr: 1,
                "&:hover": {
                  bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleCancelEdit}
              sx={{
                borderColor: isDarkMode ? color.red400 : color.red600,
                color: isDarkMode ? color.red400 : color.red600,
                "&:hover": {
                  borderColor: isDarkMode ? color.red500 : color.red700,
                  bgcolor: "rgba(220, 38, 38, 0.04)",
                },
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditMode}
            sx={{
              bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
              color: "white",
              "&:hover": {
                bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
              },
            }}
          >
            {editText ? editText : "Edit"}
          </Button>
        )}
      </Box>
    </Box>
  );
}

interface CustomIconProps extends SvgIconProps {
  accentColor: string;
}

function CustomIcon({ accentColor, ...props }: CustomIconProps) {
  return (
    <SvgIcon
      {...props}
      sx={{
        mr: 1.5,
        color: accentColor,
        fontSize: 28,
        ...props.sx,
      }}
    />
  );
}
