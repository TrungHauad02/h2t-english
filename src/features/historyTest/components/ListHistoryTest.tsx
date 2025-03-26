import { Box, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useListHistoryTest from "../hooks/useListHistoryTest";
import HistoryTestDashboard from "./HistoryTestDashboard";
import HistoryTestTabs from "./HistoryTestTabs";
import HistoryTestFilter from "./HistoryTestFilter";
import HistoryTestTable from "./HistoryTestTable";
import WEPaginationSelect from "components/pagination/WEPaginationSelect";

export default function ListHistoryTest() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Text color based on dark mode
  const textColor = isDarkMode ? color.gray100 : color.gray800;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;
  const paperBgColor = isDarkMode ? color.gray800 : color.white;
  const headerBgColor = isDarkMode ? color.gray700 : color.gray100;
  const hoverBgColor = isDarkMode ? color.gray700 : color.gray200;
  const borderColor = isDarkMode ? color.gray600 : color.gray300;

  const hooks = useListHistoryTest();

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>

      <HistoryTestDashboard
        filteredHistory={hooks.filteredHistory}
      />
      <Paper
        elevation={isDarkMode ? 1 : 3}
        sx={{
          mb: 3,
          bgcolor: paperBgColor,
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${borderColor}`,
        }}
      >
        <HistoryTestTabs
          activeTab={hooks.activeTab}
          handleTabChange={hooks.handleTabChange}
        />
        {/* Filter controls */}
        <HistoryTestFilter
          searchTerm={hooks.searchTerm}
          handleSearchChange={hooks.handleSearchChange}
          filterType={hooks.filterType}
          handleFilterChange={hooks.handleFilterChange}
          sortBy={hooks.sortBy}
          handleSortChange={hooks.handleSortChange}
          sortDirection={hooks.sortDirection}
          toggleSortDirection={hooks.toggleSortDirection}
        />

        {/* Table of test history */}
        <HistoryTestTable
          loading={hooks.loading}
          paginatedHistory={hooks.paginatedHistory}
          textColor={textColor}
          secondaryTextColor={secondaryTextColor}
          headerBgColor={headerBgColor}
          hoverBgColor={hoverBgColor}
          borderColor={borderColor}
          handleClickRow = {hooks.handleClickRow}
        />

        {/* Pagination */}
        <WEPaginationSelect
          page={hooks.page}
          totalPage={Math.ceil(hooks.filteredHistory.length / hooks.rowsPerPage)}
          itemsPerPage={hooks.rowsPerPage}
          onPageChange={hooks.handlePageChange}
          onItemsPerPageChange={hooks.handleItemsPerPageChange}
        />

      </Paper>
    </Box>
  );
}
