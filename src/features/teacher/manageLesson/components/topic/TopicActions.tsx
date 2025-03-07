import { Box, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TopicActionsProps {
  status: boolean;
  onPublish: () => void;
  onUnpublish: () => void;
}

export default function TopicActions({
  status,
  onPublish,
  onUnpublish,
}: TopicActionsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 3,
        gap: 2,
      }}
    >
      <Button
        startIcon={status ? <UnpublishedIcon /> : <PublishIcon />}
        variant="contained"
        sx={{
          backgroundColor: status
            ? isDarkMode
              ? color.gray600
              : color.gray500
            : isDarkMode
            ? color.emerald400
            : color.emerald600,
          color: "white",
          "&:hover": {
            backgroundColor: status
              ? isDarkMode
                ? color.gray700
                : color.gray600
              : isDarkMode
              ? color.emerald500
              : color.emerald700,
          },
        }}
        onClick={status ? onUnpublish : onPublish}
      >
        {status ? "Deactivate this lesson" : "Activate this lesson"}
      </Button>
    </Box>
  );
}
