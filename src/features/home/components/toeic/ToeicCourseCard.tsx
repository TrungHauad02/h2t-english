import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ToeicCourseCardProps {
    course: {
        id: number;
        title: string;
        image: string;
        description: string;
        duration: string;
        level: string;
    };
}

export default function ToeicCourseCard({ course }: ToeicCourseCardProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: isDarkMode ? colors.gray800 : colors.white,
                color: isDarkMode ? colors.gray100 : colors.gray900,
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardMedia
                component="img"
                height="160"
                image={course.image}
                alt={course.title}
            />
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                >
                    {course.title}
                </Typography>
                <Typography
                    variant="body2"
                    color={isDarkMode ? colors.gray300 : colors.gray700}
                    sx={{ mb: 2 }}
                >
                    {course.description}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Typography
                        variant="body2"
                        color={isDarkMode ? colors.gray400 : colors.gray600}
                    >
                        Duration: {course.duration}
                    </Typography>
                    <Typography
                        variant="body2"
                        color={isDarkMode ? colors.gray400 : colors.gray600}
                    >
                        Level: {course.level}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: "auto",
                        backgroundColor: colors.teal600,
                        "&:hover": {
                            backgroundColor: colors.teal700,
                        },
                    }}
                >
                    Enroll Now
                </Button>
            </CardContent>
        </Card>
    );
}