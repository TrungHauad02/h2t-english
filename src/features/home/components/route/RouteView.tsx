import { Box, Button } from "@mui/material";
import FadeIn from "./FadeInRoute";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteViewProps{
    handleExploreAll: () => void;
}

export default function RouteView({handleExploreAll}:RouteViewProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <FadeIn delay={300} duration={1000}>
            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleExploreAll}
                    startIcon={
                        <AutoAwesomeIcon
                            sx={{
                                animation: "pulse 2s infinite",
                                "@keyframes pulse": {
                                    "0%": { transform: "scale(1)" },
                                    "50%": { transform: "scale(1.2)" },
                                    "100%": { transform: "scale(1)" },
                                },
                            }}
                        />
                    }
                    endIcon={<NavigateNextIcon />}
                    sx={{
                        borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                        color: isDarkMode ? colors.teal400 : colors.teal600,
                        px: 4,
                        py: 1.5,
                        borderRadius: "24px",
                        backdropFilter: "blur(5px)",
                        backgroundColor: isDarkMode
                            ? `${colors.gray800}80`
                            : `${colors.white}80`,
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        position: "relative",
                        overflow: "hidden",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(90deg, transparent, ${isDarkMode
                                    ? "rgba(94, 234, 212, 0.15)"
                                    : "rgba(13, 148, 136, 0.15)"
                                }, transparent)`,
                            transition: "left 0.7s ease",
                        },
                        "&:hover": {
                            borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                            backgroundColor: isDarkMode
                                ? `${colors.gray700}40`
                                : `${colors.teal50}80`,
                            boxShadow: `0 4px 15px ${isDarkMode
                                    ? "rgba(94, 234, 212, 0.15)"
                                    : "rgba(13, 148, 136, 0.15)"
                                }`,
                            transform: "translateY(-3px)",
                            "&:before": {
                                left: "100%",
                            },
                        },
                        border: `2px solid ${isDarkMode ? colors.teal400 : colors.teal600
                            }`,
                    }}
                >
                    View More Learning Paths
                </Button>
            </Box>
        </FadeIn>
    );
}