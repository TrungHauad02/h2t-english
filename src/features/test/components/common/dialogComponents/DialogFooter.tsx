import { DialogActions, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";

interface DialogFooterProps {
  submitCompetitionId?: number;
  onClose: () => void;
}

export default function DialogFooter({
  submitCompetitionId,
  onClose,
}: DialogFooterProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleReviewClick = () => {
    if (submitCompetitionId) {
      navigate(`/history-test/competition/${submitCompetitionId}`);
    }
  };

  return (
    <DialogActions
      sx={{
        p: 3,
        pt: 0,
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {submitCompetitionId && (
        <Button
          variant="contained"
          onClick={handleReviewClick}
          sx={{
            py: 1.5,
            px: 5,
            borderRadius: "8px",
            backgroundColor: isDarkMode ? color.teal700 : color.teal500,
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: isDarkMode ? color.teal600 : color.teal600,
            },
          }}
        >
          Review My Test
        </Button>
      )}

      <Button
        variant="outlined"
        onClick={() => {
          onClose();
          window.location.reload();
        }}
        sx={{
          py: 1.5,
          px: 5,
          borderRadius: "8px",
          borderColor: isDarkMode ? color.gray600 : color.gray300,
          color: isDarkMode ? color.gray300 : color.gray600,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
          "&:hover": {
            borderColor: isDarkMode ? color.gray500 : color.gray400,
            backgroundColor: isDarkMode
              ? "rgba(107, 114, 128, 0.1)"
              : "rgba(107, 114, 128, 0.05)",
          },
        }}
      >
        Close
      </Button>
    </DialogActions>
  );
}
