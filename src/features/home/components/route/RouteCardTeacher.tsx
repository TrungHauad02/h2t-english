import { Box, Typography, Avatar } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { User } from "interfaces";
import useColor from "theme/useColor";

interface RouteCardTeacherProps {
    owner: User;
    hover: boolean;
    ownerInitial: string;
}

export default function RouteCardTeacher({
    owner,
    hover,
    ownerInitial,
}: RouteCardTeacherProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={isDarkMode ? colors.gray100 : colors.gray900}
                    sx={{ mr: 1 }}
                >
                    {owner.name}
                </Typography>

                {/* Avatar */}
                <Avatar
                    src={owner.avatar}
                    alt={owner.name}
                    sx={{
                        width: 24,
                        height: 24,
                        fontSize: "12px",
                        border: `1px solid ${isDarkMode ? colors.teal600 : colors.teal500}`,
                        bgcolor: isDarkMode ? colors.teal700 : colors.teal100,
                        color: isDarkMode ? colors.gray100 : colors.teal800,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        transform: hover ? "scale(1.1)" : "scale(1)",
                    }}
                >
                    {!owner.avatar && ownerInitial}
                </Avatar>
            </Box>
        </Box>
    );
}
