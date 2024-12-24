import {
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ListComponent from "components/listComponent/ListComponent";
import { useDarkMode } from "hooks/useDarkMode";
import { useState, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";

interface MenuItemsProps {
  items: {
    path: string;
    label: string;
    children?: {
      path: string;
      label: string;
    }[];
  }[];
}

const CustomBox = forwardRef<HTMLDivElement, any>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  )
);

export default function MenuItems({ items }: MenuItemsProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();

  // State quản lý menu đang mở
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Xử lý khi rê chuột vào menu
  const handleMouseEnter = (label: string) => {
    setOpenMenu(label);
  };

  // Xử lý khi rê chuột ra khỏi menu
  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  const linkStyles = () => {
    let textColor, bgColor, hoverBgColor;

    if (isDarkMode) {
      // Trường hợp dark mode
      textColor = color.white;
      bgColor = "transparent";
      hoverBgColor = `${color.gray200}30`;
    } else {
      // Trường hợp light mode
      textColor = color.gray950;
      bgColor = "transparent";
      hoverBgColor = `${color.gray200}80`;
    }

    return {
      fontSize: "1rem",
      color: textColor,
      bgcolor: bgColor,
      "&:hover": {
        bgcolor: hoverBgColor,
      },
    };
  };

  return (
    <ListComponent
      data={items}
      sx={{ display: { xs: "none", md: "flex" }, gap: 2, position: "relative" }}
      tag={CustomBox}
      renderItem={(item) => (
        <CustomBox
          sx={{ position: "relative" }}
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
          ref={(el) => {
            menuRefs.current[item.label] = el;
          }}
        >
          <Button
            color="inherit"
            onClick={() => navigate(item.path)}
            sx={{
              ...linkStyles(),
            }}
          >
            {item.label}
          </Button>
          {item.children && openMenu === item.label && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                borderRadius: "0.5rem",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <List>
                <ListComponent
                  data={item.children}
                  tag={Box}
                  sx={{ padding: 0 }}
                  renderItem={(child) => (
                    <ListItem disablePadding key={child.path}>
                      <ListItemButton
                        onClick={() => {
                          navigate(child.path);
                          handleMouseLeave();
                        }}
                        sx={{
                          ...linkStyles(),
                          padding: "0.5rem 1rem",
                        }}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    </ListItem>
                  )}
                />
              </List>
            </Box>
          )}
        </CustomBox>
      )}
    />
  );
}
