import { Box, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate } from "utils/format";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Route } from "interfaces";

interface RouteCardDateProps {
    route: Route
}

export default function RouteCardDate({ route }: RouteCardDateProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <DateRangeIcon
                    fontSize="small"
                    sx={{
                        mr: 1,
                        color: isDarkMode ? colors.teal400 : colors.teal600,
                        fontSize: "0.875rem",
                    }}
                />
                <Typography
                    variant="caption"
                    sx={{
                        color: isDarkMode ? colors.gray400 : colors.gray600,
                    }}
                >
                    Created: {formatDate(route.createdAt)}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon
                    fontSize="small"
                    sx={{
                        mr: 1,
                        color: isDarkMode ? colors.teal400 : colors.teal600,
                        fontSize: "0.875rem",
                    }}
                />
                <Typography
                    variant="caption"
                    sx={{
                        color: isDarkMode ? colors.gray400 : colors.gray600,
                    }}
                >
                    Updated: {formatDate(route.updatedAt || route.createdAt)}
                </Typography>
            </Box>
        </Box>
    );
}
