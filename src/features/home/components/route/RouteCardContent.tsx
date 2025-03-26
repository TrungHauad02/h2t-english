import { Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteCardContentProps {
    title: string;
    description: string;
}

export default function RouteCardContent({
    title,
    description,
}: RouteCardContentProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <>
            <Typography
                gutterBottom
                variant="h5"
                component="h3"
                fontWeight="bold"
                sx={{
                    mb: 1,
                    color: isDarkMode ? colors.teal300 : colors.teal700,
                    position: "relative",
                    pl: 0,
                    transition: "color 0.3s",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "&:hover": {
                        color: isDarkMode ? colors.teal200 : colors.teal800,
                    },
                }}
            >
                {title}
            </Typography>

            {/* Mô tả */}
            <Typography
                variant="body2"
                color={isDarkMode ? colors.gray300 : colors.gray700}
                sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minHeight: "2.5rem",
                }}
            >
                {description}
            </Typography>
        </>
    );
}
