import { Box, IconButton, Tooltip, useMediaQuery, Theme } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButtons({
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const buttonSize = isMobile ? "small" : "medium";
  const iconSize = isMobile ? "small" : "medium";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
      }}
    >
      <Tooltip title="Edit" arrow>
        <IconButton
          size={buttonSize}
          onClick={onEdit}
          sx={{
            color: isDarkMode ? color.edit : color.edit,
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            },
            padding: isMobile ? "4px" : "6px",
          }}
        >
          <Edit fontSize={iconSize} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete" arrow>
        <IconButton
          size={buttonSize}
          onClick={onDelete}
          sx={{
            color: isDarkMode ? color.delete : color.delete,
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            },
            padding: isMobile ? "4px" : "6px",
          }}
        >
          <Delete fontSize={iconSize} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
