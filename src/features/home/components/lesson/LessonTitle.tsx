import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function LessonTitle() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <>
            <Box>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: 800,
                        color: isDarkMode ? colors.teal300 : colors.teal700,
                        mb: 1,
                        position: "relative",
                        display: "inline-block",
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: 0,
                            width: "40%",
                            height: 4,
                            backgroundColor: isDarkMode
                                ? colors.teal500
                                : colors.teal600,
                            borderRadius: 2,
                        },
                    }}
                >
                    Featured Lessons
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                        maxWidth: "600px",
                        mt: 2,
                    }}
                >
                    Explore our most popular lessons and start improving your
                    English skills today
                </Typography>
            </Box>
        </>
    )
}