import { Box, Chip, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { RouteNode, RouteNodeEnum } from "interfaces";
import useColor from "theme/useColor";

interface RouteCardModulesProps {
    visibleNodes: RouteNode[]; 
    getChipColor: (type: RouteNodeEnum) => string; 
    chipHover: number | null;
    setChipHover: (index: number | null) => void;
}

export default function RouteCardModules({ visibleNodes, getChipColor, chipHover, setChipHover }: RouteCardModulesProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <>
            <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                    mb: 2,
                    color: isDarkMode ? colors.teal300 : colors.teal700,
                }}
            >
                Learning Modules:
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3,
                    minHeight: "80px",
                }}
            >
                {visibleNodes.map((node, index) => (
                    <Chip
                        key={node.id}
                        label={`${node.serial}. ${node.type}`}
                        size="small"
                        sx={{
                            backgroundColor: getChipColor(node.type),
                            color: "white",
                            fontWeight: "medium",
                            boxShadow:
                                chipHover === index
                                    ? `0 4px 8px ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"
                                    }`
                                    : `0 2px 4px ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
                                    }`,
                            transition:
                                "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                            transform:
                                chipHover === index ? "translateY(-4px)" : "translateY(0)",
                            willChange: "transform",
                            "&:hover": {
                                backgroundColor: getChipColor(node.type), // Keep color but make brighter
                                opacity: 0.9,
                            },
                        }}
                        onMouseEnter={() => setChipHover(index)}
                        onMouseLeave={() => setChipHover(null)}
                    />
                ))}
            </Box>
        </>
    );
}
