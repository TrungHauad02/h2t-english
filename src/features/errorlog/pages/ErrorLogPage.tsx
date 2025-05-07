import {
  Box,
  Paper,
  Typography,
  Container,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { SeverityEnum } from "interfaces";
import {
  ErrorLogTable,
  ErrorLogSearchBar,
  ErrorLogFilterSection,
  useErrorLog,
} from "../components";
import WEPaginationSelect from "components/pagination/WEPaginationSelect";

export default function ErrorLogPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useErrorLog();

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          transition: "background-color 0.3s ease",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.teal300 : color.teal700,
              mb: 1,
            }}
          >
            System Error Logs
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
          >
            Monitoring and tracking system errors
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3, mb: 2, flexWrap: "wrap", gap: 1 }}
          >
            <Chip
              label={`All Errors: ${hooks.totalItems}`}
              sx={{
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode ? color.white : color.gray800,
                fontWeight: 500,
              }}
            />
            <Chip
              label={`High: ${hooks.errorCounts[SeverityEnum.HIGH]}`}
              sx={{
                bgcolor: isDarkMode ? color.red700 : color.red100,
                color: isDarkMode ? color.white : color.red900,
                fontWeight: 500,
              }}
            />
            <Chip
              label={`Medium: ${hooks.errorCounts[SeverityEnum.MEDIUM]}`}
              sx={{
                bgcolor: isDarkMode ? color.warning : color.warning,
                color: isDarkMode ? color.black : color.black,
                fontWeight: 500,
              }}
              style={{ opacity: isDarkMode ? 0.9 : 0.7 }}
            />
            <Chip
              label={`Low: ${hooks.errorCounts[SeverityEnum.LOW]}`}
              sx={{
                bgcolor: isDarkMode ? color.teal700 : color.teal100,
                color: isDarkMode ? color.white : color.teal900,
                fontWeight: 500,
              }}
            />
          </Stack>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <ErrorLogSearchBar onSearch={hooks.handleSearchChange} />
        <ErrorLogFilterSection
          filters={hooks.filters}
          onFilterChange={hooks.handleFilterChange}
        />
        <ErrorLogTable
          errorLogs={hooks.errorLogs}
          onRefresh={hooks.onRefresh}
        />
        <WEPaginationSelect
          page={hooks.page}
          totalPage={hooks.totalPages}
          itemsPerPage={hooks.itemsPerPage}
          onPageChange={hooks.handlePageChange}
          onItemsPerPageChange={hooks.handleItemsPerPageChange}
        />
      </Paper>
    </Container>
  );
}
