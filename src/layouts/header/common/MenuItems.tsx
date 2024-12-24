import { Button, Box } from "@mui/material";
import ListComponent from "components/listComponent/ListComponent";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";

interface MenuItemsProps {
  items: { path: string; label: string }[];
}

export default function MenuItems({ items }: MenuItemsProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  return (
    <ListComponent
      data={items}
      sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}
      tag={Box}
      renderItem={(item) => (
        <Button
          color="inherit"
          onClick={() => navigate(item.path)}
          sx={{
            fontSize: "1rem",
            color: isDarkMode ? color.white : color.black,
          }}
        >
          {item.label}
        </Button>
      )}
    />
  );
}
