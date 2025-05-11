import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { formatDate } from "utils/format";

interface FormattedDateProps {
  date?: Date;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component="span"
      sx={{
        color: isDarkMode ? color.gray300 : color.gray700,
        fontSize: "0.75rem",
      }}
    >
      {formatDate(date)}
    </Box>
  );
}
