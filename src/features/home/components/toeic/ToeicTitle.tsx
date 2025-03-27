import { Box, Button, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ToeicTitle() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Grid item xs={12} md={5}>
            <Box sx={{ pr: { md: 4 } }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: isDarkMode ? colors.teal300 : colors.teal700,
                    }}
                >
                    TOEIC Preparation
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 3,
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                    }}
                >
                    Our specialized TOEIC preparation courses are designed to help
                    you achieve your target score. From listening and reading to
                    speaking and writing, we cover all aspects of the TOEIC exam.
                </Typography>

                <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
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
            </Box>
        </Grid>
    );
}