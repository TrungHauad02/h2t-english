import { Box, Stack } from "@mui/material";
import ListRoutes from "../components/ListRoutes";
import { WEPaginationSelect } from "components/pagination";
import ListRoutesHeader from "../components/ListRoutesHeader";
import useManageRoutePage from "../hooks/useManageRoutePage";

export default function ManageRoutePage() {
  const hooks = useManageRoutePage();

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction={"column"} sx={{ minHeight: "88vh" }}>
        {/* Header */}
        <ListRoutesHeader
          searchText={hooks.searchText}
          setSearchText={hooks.setSearchText}
          statusFilter={hooks.statusFilter}
          setStatusFilter={hooks.setStatusFilter}
          handleSearch={hooks.handleSearch}
        />
        {/* List Routes */}
        <ListRoutes list={hooks.displayedRoutes} />
        {/* Pagination */}
        <Box sx={{ mt: "auto" }}>
          <WEPaginationSelect
            page={hooks.page}
            totalPage={hooks.totalPages}
            itemsPerPage={hooks.itemsPerPage}
            onPageChange={hooks.handleChangePage}
            onItemsPerPageChange={hooks.handleLessonsPerPageChange}
          />
        </Box>
      </Stack>
    </Box>
  );
}
