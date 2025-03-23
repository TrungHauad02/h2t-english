import { Button, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface HeroSectionButtonsProps {
    handleNavigation: (path: string) => () => void;
}

export default function HeroSectionButtons({ handleNavigation }: HeroSectionButtonsProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
            <Button
                variant="contained"
                size="large"
                sx={{
                    backgroundColor: colors.teal600,
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                        backgroundColor: colors.teal700,
                        transform: "translateY(-2px)",
                        boxShadow: 4,
                    },
                    transition: "all 0.2s ease",
                }}
                onClick={handleNavigation("/routes")}
            >
                Start Learning
            </Button>
            <Button
                variant="outlined"
                size="large"
                sx={{
                    borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                    borderWidth: 2,
                    color: isDarkMode ? colors.teal400 : colors.teal600,
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    "&:hover": {
                        borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                        backgroundColor: isDarkMode ? colors.teal900 + "20" : colors.teal50 + "80",
                        transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                }}
                onClick={handleNavigation("/test/mixings")}
            >
                Take Assessment
            </Button>
        </Stack>
    );
}