import React from "react";
import { Box, Grow, Typography, alpha } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { StyleProps } from "./types";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface DeleteButtonProps extends StyleProps {
  onClick: () => void;
}

export default function DeleteButton({
  onClick,
  paperShredding,
  unlocked,
}: DeleteButtonProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  // Dynamic gradient based on unlock state
  const buttonGradient = unlocked
    ? `linear-gradient(135deg, ${colors.red500}, ${colors.red700})`
    : `linear-gradient(135deg, ${
        isDarkMode ? colors.gray700 : colors.gray400
      }, ${isDarkMode ? colors.gray800 : colors.gray500})`;

  return (
    <Grow in={unlocked && !paperShredding} timeout={500}>
      <Box
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          perspective: "1000px",
          opacity: paperShredding ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Box
          onClick={onClick}
          sx={{
            py: 1.5,
            px: 4,
            backgroundColor: "transparent",
            backgroundImage: buttonGradient,
            color: colors.white,
            fontWeight: 600,
            borderRadius: "30px",
            boxShadow: `0 4px 15px ${alpha(colors.red600, 0.4)}`,
            cursor: "pointer",
            transition: "all 0.3s ease",
            textAlign: "center",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 20px ${alpha(colors.red600, 0.6)}`,
            },
            "&:active": {
              transform: "translateY(1px)",
              boxShadow: `0 2px 10px ${alpha(colors.red600, 0.4)}`,
            },
          }}
        >
          <Typography
            variant="button"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DeleteForeverIcon sx={{ mr: 1 }} />
            DELETE PERMANENTLY
          </Typography>
        </Box>
      </Box>
    </Grow>
  );
}
