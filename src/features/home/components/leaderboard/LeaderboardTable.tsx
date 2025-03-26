import { TableCell, TableHead, TableRow } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function LeaderboardTable() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    align="center"
                    sx={{
                        width: "80px",
                        backgroundColor: isDarkMode
                            ? colors.gray800
                            : colors.gray100,
                        borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                            }`,
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                        fontWeight: "bold",
                    }}
                >
                    Rank
                </TableCell>
                <TableCell
                    sx={{
                        backgroundColor: isDarkMode
                            ? colors.gray800
                            : colors.gray100,
                        borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                            }`,
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                        fontWeight: "bold",
                    }}
                >
                    Student
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        width: "150px",
                        backgroundColor: isDarkMode
                            ? colors.gray800
                            : colors.gray100,
                        borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                            }`,
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                        fontWeight: "bold",
                    }}
                >
                    Score
                </TableCell>
            </TableRow>
        </TableHead>
    );
}