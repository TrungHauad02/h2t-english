import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Paper,
  Box,
  Grow,
  Badge,
  useMediaQuery,
  Fade,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const isMobile = useMediaQuery("(max-width:600px)");

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

      // Reset active if we're at the top of the page
      if (scrollPosition < 150) {
        setActiveId(null);
        return;
      }

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

  // Auto close menu after inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 10000); // Close after 10 seconds of inactivity
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  const getActiveItemIndex = () => {
    if (!activeId) return -1;
    return items.findIndex((item) => item.id === activeId);
  };

  const activeItemIndex = getActiveItemIndex();

  return (
    <Fade in={true}>
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          [position]: isMobile ? 5 : 20,
          top: offset,
          zIndex: 1000,
          borderRadius: isOpen ? 2 : "50%",
          bgcolor: isDarkMode
            ? isOpen
              ? color.gray800
              : `rgba(${parseInt(color.gray800.slice(1, 3), 16)}, ${parseInt(
                  color.gray800.slice(3, 5),
                  16
                )}, ${parseInt(color.gray800.slice(5, 7), 16)}, 0.9)`
            : isOpen
            ? color.white
            : `rgba(255, 255, 255, 0.9)`,
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          width: isOpen ? (isMobile ? "200px" : "250px") : "48px",
          height: isOpen ? "auto" : "48px",
          overflow: "hidden",
          boxShadow: isOpen
            ? isDarkMode
              ? "0 8px 16px rgba(0, 0, 0, 0.5)"
              : "0 8px 16px rgba(0, 0, 0, 0.1)"
            : isDarkMode
            ? "0 3px 6px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(94, 234, 212, 0.2)"
            : "0 3px 6px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(20, 184, 166, 0.1)",
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          "&:hover": {
            transform: "scale(1)",
            boxShadow: isDarkMode
              ? "0 3px 6px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(94, 234, 212, 0.3)"
              : "0 3px 6px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(20, 184, 166, 0.2)",
          },
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={toggleMenu}
              sx={{
                color: isDarkMode ? color.teal300 : color.teal600,
                p: 0.5,
                transition: "all 0.3s ease",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                "&:hover": {
                  bgcolor: isDarkMode ? color.gray700 : color.teal50,
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              }}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Grow in={isOpen} timeout={300}>
            <Box sx={{ width: "100%" }}>
              {isOpen && (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      px: 2,
                      pt: 1,
                      pb: 1,
                      fontWeight: 600,
                      color: isDarkMode ? color.teal300 : color.teal700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: "0.75rem",
                    }}
                  >
                    Index
                  </Typography>

                  <Divider
                    sx={{
                      mb: 1,
                      borderColor: isDarkMode
                        ? `rgba(${parseInt(
                            color.teal200.slice(1, 3),
                            16
                          )}, ${parseInt(
                            color.teal200.slice(3, 5),
                            16
                          )}, ${parseInt(color.teal200.slice(5, 7), 16)}, 0.2)`
                        : color.teal100,
                    }}
                  />

                  <Stack
                    spacing={0.5}
                    sx={{
                      px: 1,
                      pb: 1.5,
                      maxHeight: "calc(100vh - 200px)",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: isDarkMode
                          ? color.gray600
                          : color.gray300,
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {items.map((item, index) => (
                      <Box
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onClick={() => handleNavClick(item.id)}
                        sx={{
                          position: "relative",
                          p: 1,
                          pl: activeItemIndex === index ? 2 : 1,
                          pr: 1,
                          borderRadius: 1.5,
                          cursor: "pointer",
                          bgcolor:
                            activeItemIndex === index
                              ? isDarkMode
                                ? `rgba(${parseInt(
                                    color.teal700.slice(1, 3),
                                    16
                                  )}, ${parseInt(
                                    color.teal700.slice(3, 5),
                                    16
                                  )}, ${parseInt(
                                    color.teal700.slice(5, 7),
                                    16
                                  )}, 0.4)`
                                : color.teal50
                              : hoverIndex === index
                              ? isDarkMode
                                ? color.gray700
                                : color.gray100
                              : "transparent",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: isDarkMode
                              ? activeItemIndex === index
                                ? `rgba(${parseInt(
                                    color.teal700.slice(1, 3),
                                    16
                                  )}, ${parseInt(
                                    color.teal700.slice(3, 5),
                                    16
                                  )}, ${parseInt(
                                    color.teal700.slice(5, 7),
                                    16
                                  )}, 0.5)`
                                : color.gray700
                              : activeItemIndex === index
                              ? color.teal100
                              : color.gray100,
                          },
                          overflow: "hidden",
                        }}
                      >
                        {activeItemIndex === index && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: "3px",
                              bgcolor: isDarkMode
                                ? color.teal400
                                : color.teal500,
                              borderRadius: "0 2px 2px 0",
                            }}
                          />
                        )}

                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Badge
                            variant="dot"
                            invisible={activeItemIndex !== index}
                            sx={{
                              "& .MuiBadge-badge": {
                                bgcolor: isDarkMode
                                  ? color.teal300
                                  : color.teal600,
                              },
                            }}
                          >
                            {item.icon ? (
                              <Box
                                sx={{
                                  color:
                                    activeItemIndex === index
                                      ? isDarkMode
                                        ? color.teal300
                                        : color.teal700
                                      : isDarkMode
                                      ? color.gray300
                                      : color.gray600,
                                }}
                              >
                                {item.icon}
                              </Box>
                            ) : (
                              <KeyboardDoubleArrowRightIcon
                                fontSize="small"
                                sx={{
                                  fontSize: "1rem",
                                  opacity: activeItemIndex === index ? 1 : 0.7,
                                  color:
                                    activeItemIndex === index
                                      ? isDarkMode
                                        ? color.teal300
                                        : color.teal700
                                      : isDarkMode
                                      ? color.gray300
                                      : color.gray600,
                                  transition: "all 0.2s ease",
                                }}
                              />
                            )}
                          </Badge>

                          <Typography
                            variant="body2"
                            noWrap
                            sx={{
                              fontWeight: activeItemIndex === index ? 600 : 400,
                              color:
                                activeItemIndex === index
                                  ? isDarkMode
                                    ? color.teal300
                                    : color.teal700
                                  : isDarkMode
                                  ? color.gray200
                                  : color.gray800,
                              fontSize: "0.875rem",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}
            </Box>
          </Grow>
        </Stack>
      </Paper>
    </Fade>
  );
}
