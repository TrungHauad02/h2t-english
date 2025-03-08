import { useState, useEffect } from "react";
import { Stack, Typography, IconButton, Paper, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface WEFloatingNavMenuProps {
  items: NavItem[];
  position?: "left" | "right";
  offset?: number; // Khoảng cách từ đỉnh màn hình cho menu
  scrollOffset?: number; // Khoảng cách từ đỉnh màn hình khi scroll đến element
}

export default function WEFloatingNavMenu({
  items,
  position = "right",
  offset = 80,
  scrollOffset = 80,
}: WEFloatingNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        [position]: 10,
        top: offset,
        zIndex: 1000,
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray800 : color.white,
        transition: "all 0.3s ease",
        width: isOpen ? "auto" : "40px",
        overflow: "hidden",
      }}
    >
      <Stack direction="row">
        <Box
          sx={{
            p: 1,
          }}
        >
          <IconButton
            onClick={toggleMenu}
            sx={{
              color: isDarkMode ? color.emerald400 : color.emerald600,
              p: isOpen ? 0.5 : 0,
              m: isOpen ? 0.5 : 0,
            }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {isOpen && (
          <Stack
            spacing={1}
            sx={{
              p: 1,
              minWidth: 150,
            }}
          >
            {items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={() => handleNavClick(item.id)}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                  bgcolor:
                    activeId === item.id
                      ? isDarkMode
                        ? color.gray700
                        : color.gray100
                      : "transparent",
                  color:
                    activeId === item.id
                      ? isDarkMode
                        ? color.emerald400
                        : color.emerald600
                      : isDarkMode
                      ? color.gray100
                      : color.gray900,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray700 : color.gray100,
                  },
                }}
              >
                {item.icon && <Box>{item.icon}</Box>}
                <Typography
                  variant="body2"
                  fontWeight={activeId === item.id ? 600 : 400}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
