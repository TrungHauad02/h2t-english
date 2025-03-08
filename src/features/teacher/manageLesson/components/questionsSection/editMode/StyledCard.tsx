import { Box } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface StyledCardProps {
  children: React.ReactNode;
}

export default function StyledCard({ children }: StyledCardProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray700 : color.white,
        borderRadius: 3,
        p: 3,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        mb: 3,
      }}
    >
      {children}
    </Box>
  );
}
