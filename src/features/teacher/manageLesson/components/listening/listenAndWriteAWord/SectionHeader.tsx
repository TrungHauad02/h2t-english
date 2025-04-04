import {
  Typography,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  hasChanges?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  icon,
  isEditMode,
  onToggleEditMode,
  onSave,
  isSaving = false,
  hasChanges = false,
}: SectionHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {icon && (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              backgroundColor: isDarkMode ? color.teal700 : color.teal100,
              color: isDarkMode ? color.white : color.teal900,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.white : color.gray900,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>
      <Stack direction="row" spacing={1}>
        {isEditMode && onSave && (
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={onSave}
            disabled={isSaving || !hasChanges}
            sx={{
              backgroundColor: isDarkMode ? color.teal700 : color.teal600,
              color: color.white,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: isDarkMode ? color.teal600 : color.teal500,
              },
              "&.Mui-disabled": {
                backgroundColor: isDarkMode ? color.gray700 : color.gray300,
                color: isDarkMode ? color.gray500 : color.gray500,
              },
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}
        <Tooltip title={isEditMode ? "Exit Edit Mode" : "Edit Section"}>
          <IconButton
            onClick={onToggleEditMode}
            size="small"
            sx={{
              backgroundColor: isEditMode
                ? isDarkMode
                  ? color.gray700
                  : color.gray200
                : isDarkMode
                ? color.teal700
                : color.teal100,
              color: isEditMode
                ? isDarkMode
                  ? color.white
                  : color.gray800
                : isDarkMode
                ? color.white
                : color.teal900,
              "&:hover": {
                backgroundColor: isEditMode
                  ? isDarkMode
                    ? color.gray600
                    : color.gray300
                  : isDarkMode
                  ? color.teal600
                  : color.teal200,
              },
              width: 40,
              height: 40,
            }}
          >
            {isEditMode ? <CloseIcon /> : <EditIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
