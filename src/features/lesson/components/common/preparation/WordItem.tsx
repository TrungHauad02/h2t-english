import { Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WordItemProps {
  key: number;
  item: string;
  highlight?: boolean;
  onClick?: () => void;
}

export default function WordItem({
  key,
  item,
  highlight,
  onClick,
}: WordItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack
      key={key}
      sx={{
        p: { xs: 1.5, md: 2 },
        height: "100%",
        bgcolor: highlight
          ? isDarkMode
            ? color.green700
            : color.green300
          : isDarkMode
          ? color.gray900
          : color.gray100,
        borderRadius: 2,
        boxShadow: 1,
        ":hover": {
          bgcolor: isDarkMode ? color.green800 : color.green200,
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      {item}
    </Stack>
  );
}
