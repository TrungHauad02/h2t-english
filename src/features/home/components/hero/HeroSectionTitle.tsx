import { Chip, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function HeroTitle() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    
    return (
        <>
            <Chip
                label="Language Learning Platform"
                size="small"
                sx={{
                    mb: 2,
                    backgroundColor: isDarkMode ? colors.teal800 : colors.teal100,
                    color: isDarkMode ? colors.teal200 : colors.teal700,
                    fontWeight: 600,
                    borderRadius: 1,
                }}
            />
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" },
                    mb: 2,
                    background: isDarkMode
                        ? `linear-gradient(135deg, ${colors.teal300}, ${colors.teal500})`
                        : `linear-gradient(135deg, ${colors.teal700}, ${colors.teal500})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.2,
                }}
            >
                Master English with Confidence
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    color: isDarkMode ? colors.gray300 : colors.gray700,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    lineHeight: 1.6,
                    maxWidth: "90%",
                }}
            >
                Personalized learning paths, interactive lessons, and real-time feedback to help you achieve your language goals.
            </Typography>
        </>
    );
}