import { Box, CircularProgress, Fade, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Tooltip } from "@mui/material";
import { getChipColorByType, getTestTypeIcon, getIconColorByType, getScoreColor } from "./historyTest/utils";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { format } from "date-fns";
import { useTheme, useMediaQuery } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface HistoryTestTableProps {
    loading: boolean;
    paginatedHistory: any[];
    textColor: string;
    secondaryTextColor: string;
    headerBgColor: string;
    hoverBgColor: string;
    borderColor: string;
    handleClickRow: (id: number, type: string) => void;
  }
  
  export default function HistoryTestTable({
    loading,
    paginatedHistory,
    textColor,
    secondaryTextColor,
    headerBgColor,
    hoverBgColor,
    borderColor,
    handleClickRow
  }: HistoryTestTableProps) {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));  
    const color = useColor();
    const { isDarkMode } = useDarkMode();

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                mb: 0,
                bgcolor: "transparent",
                maxHeight: "calc(100vh - 250px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: isDarkMode ? color.gray600 : color.gray300,
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: isDarkMode ? color.gray800 : color.gray100,
                },
            }}
        >
            <Table sx={{ minWidth: isSmDown ? 100 : 500 }} aria-label="test history table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: textColor, fontWeight: "bold", backgroundColor: headerBgColor }}>
                            Test Title
                        </TableCell>
                        <TableCell sx={{ color: textColor, fontWeight: "bold", backgroundColor: headerBgColor }}>
                            Type
                        </TableCell>
                        {!isMdDown && (
                            <TableCell sx={{ color: textColor, fontWeight: "bold", backgroundColor: headerBgColor }}>
                                Date
                            </TableCell>
                        )}
                        {!isSmDown && (
                            <TableCell sx={{ color: textColor, fontWeight: "bold", backgroundColor: headerBgColor }}>
                                Duration
                            </TableCell>
                        )}
                        <TableCell sx={{ color: textColor, fontWeight: "bold", backgroundColor: headerBgColor }}>
                            Score
                        </TableCell>
                        {!isMdDown && (
                            <TableCell sx={{ color: textColor, fontWeight: "bold", backgroundColor: headerBgColor }}>
                                Comment
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                <CircularProgress color="primary" />
                            </TableCell>
                        </TableRow>
                    ) : paginatedHistory.length > 0 ? (
                        paginatedHistory.map((record) => (
                            <Fade in={true} key={`${record.type}-${record.id}`}>
                                <TableRow sx={{ transition: "background-color 0.2s", cursor: "pointer", "&:hover": { bgcolor: hoverBgColor }, borderBottom: `1px solid ${borderColor}` }}
                                onClick={() => handleClickRow(record.id, record.testType)}>
                                    <TableCell component="th" scope="row" sx={{ color: textColor, fontWeight: "medium" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Box sx={{ color: getIconColorByType(record.testType || "", isDarkMode, color), display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                {getTestTypeIcon(record.testType || record.type)}
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {record.title}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={record.testType || "Unknown"}
                                            size="small"
                                            sx={{ bgcolor: getChipColorByType(record.testType || "", isDarkMode, color), color: "white", fontWeight: 500, fontSize: "0.75rem", px: 0.5, "& .MuiChip-label": { px: 1.5 } }}
                                        />
                                    </TableCell>
                                    {!isMdDown && (
                                        <TableCell sx={{ color: secondaryTextColor }}>
                                            {format(record.date, "MMM dd, yyyy")}
                                        </TableCell>
                                    )}
                                    {!isSmDown && (
                                        <TableCell sx={{ color: secondaryTextColor }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Box component="span" sx={{ fontWeight: 500 }}>
                                                    {record.duration}
                                                </Box>
                                                <Box component="span" sx={{ ml: 0.5 }}>
                                                    min
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Chip
                                            label={record.score !== null ? `${record.score}/${record.maxScore}` : "Pending"}
                                            size="small"
                                            sx={{ bgcolor: getScoreColor(record.score, record.maxScore, isDarkMode, color), color: "white", fontWeight: "bold", fontSize: "0.75rem", "& .MuiChip-label": { px: 1.5 } }}
                                        />
                                    </TableCell>
                                    {!isMdDown && (
                                        <TableCell sx={{ color: secondaryTextColor, maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            <Tooltip title={record.comment || "No comment"} arrow placement="top">
                                                <Box component="span">{record.comment || "No comment"}</Box>
                                            </Tooltip>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </Fade>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 4, color: secondaryTextColor }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 1 }}>
                                    <AssignmentIcon sx={{ fontSize: 48, opacity: 0.5 }} />
                                    <Typography variant="body1">No test history found.</Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
