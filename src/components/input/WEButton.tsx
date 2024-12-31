import { Button } from "@mui/material";

interface WEButtonProps {
  children?: any;
  variant?: "contained" | "outlined" | "text";
  sx?: any;
  bgcolor?: string;
  hoverBgcolor?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function WEButton({
  children,
  variant = "contained",
  sx,
  bgcolor,
  hoverBgcolor,
  color,
  onClick,
}: WEButtonProps) {
  const complexSx = {
    bgcolor: `${bgcolor}`,
    color: `${color}`,
    "&:hover": { bgcolor: `${hoverBgcolor}` },
    py: 1,
    borderRadius: "1rem",
    ...sx,
  };
  return (
    <Button fullWidth variant={variant} sx={complexSx} onClick={onClick}>
      {children}
    </Button>
  );
}
