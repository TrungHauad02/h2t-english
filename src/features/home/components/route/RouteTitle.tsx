import { Box, Button, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteTitleProps {
    handleExploreAll: () => void; 
}

export default function RouteTitle({ handleExploreAll }: RouteTitleProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 6,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                position: "relative",
            }}
        >
            <Box sx={{ mb: { xs: 4, sm: 0 }, position: "relative" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AutoAwesomeIcon
                        sx={{
                            color: isDarkMode ? colors.teal300 : colors.teal600,
                            mr: 1.5,
                            fontSize: "28px",
                            animation: "sparkle 3s ease-in-out infinite",
                            "@keyframes sparkle": {
                                "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: 1 },
                                "50%": { transform: "scale(1.2) rotate(15deg)", opacity: 0.9 },
                            },
                        }}
                    />
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontWeight: "bold",
                            color: isDarkMode ? colors.teal300 : colors.teal700,
                            textShadow: isDarkMode ? "0 0 15px rgba(94, 234, 212, 0.25)" : "none",
                        }}
                    >
                        Learning Paths
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "100px",
                        height: "4px",
                        background: `linear-gradient(to right, ${colors.teal500}, transparent)`,
                        borderRadius: "2px",
                        mb: 2,
                        position: "relative",
                        overflow: "hidden",
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(90deg, transparent, ${isDarkMode ? "rgba(94, 234, 212, 0.5)" : "rgba(13, 148, 136, 0.5)"}, transparent)`,
                            animation: "shimmer 2s infinite",
                        },
                        "@keyframes shimmer": { "100%": { left: "100%" } },
                    }}
                />

                <Typography
                    variant="body1"
                    sx={{
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                        maxWidth: { sm: "400px", md: "500px" },
                    }}
                >
                    Follow structured learning paths to master English systematically and achieve your language goals efficiently.
                </Typography>
            </Box>

            <Button
                variant="contained"
                onClick={handleExploreAll}
                endIcon={<NavigateNextIcon />}
                sx={{
                    backgroundColor: isDarkMode ? colors.teal500 : colors.teal600,
                    color: "white",
                    width: { xs: "100%", sm: "auto" },
                    py: 1.5,
                    px: 3,
                    borderRadius: "24px",
                    boxShadow: `0 4px 15px ${isDarkMode ? "rgba(94, 234, 212, 0.2)" : "rgba(13, 148, 136, 0.2)"}`,
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
                        background: `linear-gradient(90deg, transparent, ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)"}, transparent)`,
                        transition: "left 0.7s ease",
                    },
                    "&:hover": {
                        boxShadow: `0 6px 20px ${isDarkMode ? "rgba(94, 234, 212, 0.3)" : "rgba(13, 148, 136, 0.3)"}`,
                        backgroundColor: isDarkMode ? colors.teal400 : colors.teal700,
                        transform: "translateY(-3px)",
                        "&:before": { left: "100%" },
                    },
                }}
            >
                Explore All Paths
            </Button>
        </Box>
    );
}