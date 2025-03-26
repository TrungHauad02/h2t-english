import React from "react";
import { Button } from "@mui/material";
import useColor from "theme/useColor";

interface SubmitTestButtonProps {
  onClick?: () => void;
}

const SubmitTestButton: React.FC<SubmitTestButtonProps> = ({ onClick }) => {
  const color = useColor();

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: { xs: "50%", sm: "100%" },
        mt: { xs: 1.5, sm: 2 },
        fontSize: { xs: "0.6rem", sm: "1rem" },
        py: { xs: 0.4, sm: 0.6 },
        bgcolor: color.emerald400,
        "&:hover": {
          bgcolor: color.emerald500,
        },
        mx: "auto",
        display: "block",
      }}
    >
      SUBMIT
    </Button>
  );
};

export default SubmitTestButton;
