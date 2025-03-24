import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function LessonButtonView() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <>
            <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{
                    borderColor: isDarkMode ? colors.teal500 : colors.teal600,
                    color: isDarkMode ? colors.teal400 : colors.teal600,
                    borderWidth: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    "&:hover": {
                        borderColor: isDarkMode ? colors.teal400 : colors.teal700,
                        backgroundColor: isDarkMode
                            ? "rgba(20, 184, 166, 0.1)"
                            : "rgba(13, 148, 136, 0.05)",
                        transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                }}
            >
                View All Lessons
            </Button>
        </>
    )
}