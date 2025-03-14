import { Edit, Delete } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
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

  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 8,
        display: "flex",
        gap: 1,
        zIndex: 2,
      }}
    >
      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={onEdit}
          sx={{
            color: isDarkMode ? color.emerald400 : color.emerald600,
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray900 : color.gray200,
            },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            color: color.delete,
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray900 : color.gray200,
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
