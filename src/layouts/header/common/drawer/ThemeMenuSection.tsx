import { ListItemText, Stack, Typography } from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { ListItemButton } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../../redux/slices/themeSlice";
import useColor from "theme/useColor";

export default function ThemeMenuSection() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const dispatch = useDispatch();
  return (
    <ListItemButton
      onClick={() => dispatch(toggleTheme())}
      sx={{
        color: isDarkMode ? color.emerald400 : color.emerald600,
        "&:hover": {
          bgcolor: isDarkMode ? color.gray700 : color.gray200,
        },
      }}
    >
      <ListItemText
        primary={
          isDarkMode ? (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography sx={{ color: color.white }}>Light mode </Typography>
              <Sun size={20} />
            </Stack>
          ) : (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography sx={{ color: color.black }}>Dark mode </Typography>
              <Moon size={20} />
            </Stack>
          )
        }
      />
    </ListItemButton>
  );
}
