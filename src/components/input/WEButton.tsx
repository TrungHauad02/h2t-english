import { Button, SxProps, Theme } from "@mui/material";
import useColor from "theme/useColor";
import { ReactNode } from "react";

interface WEButtonProps {
  children?: ReactNode;
  variant?: "contained" | "outlined" | "text";
  sx?: SxProps<Theme>;
  bgcolor?: string;
  hoverBgcolor?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "small" | "medium" | "large";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function WEButton({
  children,
  variant = "contained",
  sx,
  bgcolor,
  hoverBgcolor,
  color,
  onClick,
  size = "medium",
  startIcon,
  endIcon,
}: WEButtonProps) {
  const colors = useColor();

  if (!bgcolor) {
    bgcolor = colors.teal800;
  }

  if (!hoverBgcolor) {
    hoverBgcolor = colors.teal700;
  }

  if (!color) {
    color = colors.white;
  }

  const complexSx = {
    bgcolor: `${bgcolor}`,
    color: `${color}`,
    "&:hover": { bgcolor: `${hoverBgcolor}` },
    py: 1,
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...sx,
  };

  return (
    <Button
      fullWidth
      variant={variant}
      sx={complexSx}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </Button>
  );
}
