import { Box, Button, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ToeicContent() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Box sx={{ mt: 4, display: { xs: "block", md: "none" } }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Why prepare with us?
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" sx={{ mb: 1 }}>
                    Courses designed by TOEIC experts
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                    Full-length practice tests with detailed analytics
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                    Proven score improvement strategies
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                    Personalized study plans
                </Typography>
            </Box>

            <Button
                variant="outlined"
                fullWidth
                sx={{
                    mt: 3,
                    borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                    color: isDarkMode ? colors.teal400 : colors.teal600,
                    "&:hover": {
                        borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                        backgroundColor: "transparent",
                    },
                }}
            >
                Learn More About TOEIC
            </Button>
        </Box>
    );
}