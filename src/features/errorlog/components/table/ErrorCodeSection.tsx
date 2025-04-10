import { Box, Typography, IconButton, Tooltip, Paper } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ErrorLog } from "interfaces";

interface ErrorCodeSectionProps {
    log: ErrorLog;
    copied: boolean;
    setCopied: (val: boolean) => void;
}

export default function ErrorCodeSection({
    log,
    copied,
    setCopied,
}: ErrorCodeSectionProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();

    const handleCopy = () => {
        if (!log?.errorCode) return;
        navigator.clipboard.writeText(log.errorCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 3,
                borderRadius: "0.75rem",
                backgroundColor: isDarkMode
                    ? alpha(color.gray800, 0.7)
                    : alpha(color.gray50, 0.7),
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                >
                    Error Code
                </Typography>
                <Tooltip title="Copy Error Code">
                    <IconButton
                        size="small"
                        onClick={handleCopy}
                        sx={{
                            color: isDarkMode ? color.gray500 : color.gray500,
                            padding: "2px",
                        }}
                    >
                        {copied ? (
                            <CheckCircleOutlineIcon
                                fontSize="small"
                                sx={{
                                    color: isDarkMode ? color.green400 : color.green500,
                                }}
                            />
                        ) : (
                            <ContentCopyIcon fontSize="small" />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <Box
                sx={{
                    backgroundColor: isDarkMode ? color.gray900 : color.white,
                    borderRadius: "0.5rem",
                    p: 1.5,
                    border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "monospace",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: isDarkMode ? color.teal300 : color.teal700,
                    }}
                >
                    {log?.errorCode || "-"}
                </Typography>
            </Box>
        </Paper>
    );
}

