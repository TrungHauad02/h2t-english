import { Box, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteCardActionsProps {
    hasMoreNodes: boolean;
    expandedNodes: boolean;
    hasDetailPage: boolean;
    initialNodeCount: number;
    totalNodes: number;
    handleShowMore: () => void;
    handleViewDetail: () => void;
}

export default function RouteCardActions({
    hasMoreNodes,
    expandedNodes,
    hasDetailPage,
    initialNodeCount,
    totalNodes,
    handleShowMore,
    handleViewDetail,
}: RouteCardActionsProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", gap: 2 }}>
            {hasMoreNodes && !expandedNodes && (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleShowMore}
                    sx={{
                        borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                        color: isDarkMode ? colors.teal400 : colors.teal600,
                        flexGrow: 1,
                        borderRadius: "20px",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                            backgroundColor: isDarkMode ? colors.teal900 : colors.teal50,
                            boxShadow: `0 4px 8px ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(15, 118, 110, 0.15)"}`,
                        },
                    }}
                >
                    Show More
                </Button>
            )}

            {hasDetailPage && (expandedNodes || totalNodes <= initialNodeCount) && (
                <Button
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    onClick={handleViewDetail}
                    sx={{
                        backgroundColor: isDarkMode ? colors.teal500 : colors.teal600,
                        color: "white",
                        flexGrow: 1,
                        borderRadius: "20px",
                        boxShadow: `0 4px 12px ${isDarkMode ? "rgba(94, 234, 212, 0.2)" : "rgba(13, 148, 136, 0.3)"}`,
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        overflow: "hidden",
                        position: "relative",
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
                            backgroundColor: isDarkMode ? colors.teal400 : colors.teal700,
                            boxShadow: `0 6px 16px ${isDarkMode ? "rgba(94, 234, 212, 0.3)" : "rgba(13, 148, 136, 0.4)"}`,
                            transform: "translateY(-3px)",
                            "&:before": {
                                left: "100%",
                            },
                        },
                    }}
                >
                    View Path
                </Button>
            )}
        </Box>
    );
}
