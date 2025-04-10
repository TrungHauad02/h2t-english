import { alpha, Box, Paper, Typography } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ErrorRecommentSection() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 3,
                borderRadius: "0.75rem",
                backgroundColor: isDarkMode
                    ? alpha(color.teal900, 0.1)
                    : alpha(color.teal50, 0.7),
                border: `1px solid ${isDarkMode ? color.teal800 : color.teal200
                    }`,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                }}
            >
                <BuildIcon
                    sx={{
                        color: isDarkMode ? color.teal300 : color.teal700,
                        mt: 0.5,
                    }}
                />
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: isDarkMode ? color.teal100 : color.teal900,
                            mb: 1,
                        }}
                    >
                        Recommended Actions
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: isDarkMode ? color.gray300 : color.gray700,
                            mb: 2,
                        }}
                    >
                        Based on the error pattern, we recommend the following
                        steps to resolve this issue:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 0, mb: 1 }}>
                        <Typography
                            component="li"
                            variant="body2"
                            sx={{
                                color: isDarkMode ? color.gray300 : color.gray700,
                                mb: 1,
                            }}
                        >
                            Check the API connection and verify endpoint
                            availability.
                        </Typography>
                        <Typography
                            component="li"
                            variant="body2"
                            sx={{
                                color: isDarkMode ? color.gray300 : color.gray700,
                                mb: 1,
                            }}
                        >
                            Validate request parameters against the API
                            documentation.
                        </Typography>
                        <Typography
                            component="li"
                            variant="body2"
                            sx={{
                                color: isDarkMode ? color.gray300 : color.gray700,
                            }}
                        >
                            Review authentication credentials and ensure they are up
                            to date.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}