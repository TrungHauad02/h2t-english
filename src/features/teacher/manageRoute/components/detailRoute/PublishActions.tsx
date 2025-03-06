import { Box, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface PublishActionsProps {
  status: boolean;
  onPublish: () => void;
  onUnpublish: () => void;
}

export default function PublishActions({
  status,
  onPublish,
  onUnpublish,
}: PublishActionsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 3,
      }}
    >
      {!status ? (
        <Button
          startIcon={<PublishIcon />}
          variant="contained"
          onClick={onPublish}
          sx={{
            backgroundColor: isDarkMode ? color.emerald400 : color.emerald600,
            color: "white",
            "&:hover": {
              backgroundColor: isDarkMode ? color.emerald500 : color.emerald700,
            },
          }}
        >
          Publish
        </Button>
      ) : (
        <Button
          startIcon={<UnpublishedIcon />}
          variant="contained"
          onClick={onUnpublish}
          sx={{
            backgroundColor: isDarkMode ? color.gray600 : color.gray500,
            color: "white",
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray700 : color.gray600,
            },
          }}
        >
          Unpublish
        </Button>
      )}
    </Box>
  );
}
