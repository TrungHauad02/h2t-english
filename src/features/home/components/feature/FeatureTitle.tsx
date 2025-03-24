import { Box, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function FeatureTitle() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: isDarkMode
                        ? `linear-gradient(135deg, ${colors.teal300}, ${colors.emerald400})`
                        : `linear-gradient(135deg, ${colors.teal600}, ${colors.emerald700})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                }}
            >
                Our Core Features
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
                <Typography variant="h5" sx={{ maxWidth: 700, color: isDarkMode ? colors.gray300 : colors.gray700 }}>
                    Everything you need to learn English effectively
                </Typography>
                <Tooltip title="Our powerful features are designed to accelerate your language learning journey" arrow>
                    <IconButton sx={{ color: isDarkMode ? colors.teal400 : colors.teal600 }}>
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Divider
                sx={{
                    width: "120px",
                    margin: "0 auto",
                    my: 3,
                    backgroundColor: isDarkMode ? colors.teal500 : colors.teal600,
                    height: "3px",
                    borderRadius: "2px",
                }}
            />
        </Box>
    );
}
