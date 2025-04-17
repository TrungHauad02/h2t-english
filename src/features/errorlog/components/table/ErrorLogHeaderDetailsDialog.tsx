import {
    Box,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    Fade,
    LinearProgress,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { ReactNode } from "react";
import { ErrorLog, SeverityEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ErrorLogHeaderDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    log: ErrorLog;
    severityInfo: {
        icon: ReactNode;
        label: string;
        bg: string;
        text: string;
        borderColor: string;
        progressColor: string;
    };
    getBadgeContent: (severity: SeverityEnum) => string;
}

export default function ErrorLogHeaderDetailsDialog({
    open,
    onClose,
    log,
    severityInfo,
    getBadgeContent,
}: ErrorLogHeaderDetailsDialogProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();

    return (
        <Fade in={open} timeout={500}>
            <Box>
                <Box
                    sx={{
                        position: "relative",
                        padding: 0,
                        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
                        overflow: "hidden",
                    }}
                >
                    {/* Progress indicator by severity */}
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            backgroundColor: isDarkMode
                                ? alpha(color.gray700, 0.5)
                                : alpha(color.gray200, 0.5),
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: severityInfo.progressColor,
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            pt: 3,
                            px: 3,
                            pb: 1,
                            position: "relative",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                            {severityInfo.icon}
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: isDarkMode ? color.gray100 : color.gray900,
                                        }}
                                    >
                                        Error Log Details
                                    </Typography>
                                    <Chip
                                        label={severityInfo.label}
                                        size="small"
                                        sx={{
                                            backgroundColor: severityInfo.bg,
                                            color: severityInfo.text,
                                            fontWeight: 600,
                                            height: "20px",
                                            fontSize: "0.7rem",
                                            border: `1px solid ${severityInfo.borderColor}`,
                                        }}
                                    />
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: isDarkMode ? color.gray400 : color.gray600,
                                    }}
                                >
                                    {getBadgeContent(log.severity)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Tooltip title="Close">
                                <IconButton
                                    edge="end"
                                    onClick={onClose}
                                    size="small"
                                    sx={{
                                        color: isDarkMode ? color.gray400 : color.gray600,
                                        "&:hover": {
                                            backgroundColor: isDarkMode
                                                ? alpha(color.gray700, 0.7)
                                                : alpha(color.gray200, 0.7),
                                        },
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fade>
    );
}
