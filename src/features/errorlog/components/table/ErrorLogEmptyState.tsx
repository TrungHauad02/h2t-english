import { TableCell, TableRow, Box, Typography } from "@mui/material";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ErrorLogEmptyState() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <TableRow>
      <TableCell colSpan={7} sx={{ border: "none", padding: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 6,
            backgroundColor: isDarkMode
              ? `rgba(31, 41, 55, 0.3)`
              : `rgba(249, 250, 251, 0.5)`,
            borderRadius: "0.75rem",
            border: `1px dashed ${
              isDarkMode ? color.gray700 : color.gray300
            }`,
          }}
        >
          <BugReportOutlinedIcon
            sx={{
              color: isDarkMode ? color.teal400 : color.teal600,
              fontSize: 48,
              mb: 2,
              opacity: 0.7,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 600,
              mb: 1,
            }}
          >
            No Error Logs Found
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            No system error logs have been recorded. This is good news!
            <br />
            Any future errors will appear here.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}