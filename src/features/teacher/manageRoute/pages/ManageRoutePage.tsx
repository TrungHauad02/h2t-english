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
          filter={hooks.filter}
          updateFilter={hooks.updateFilter}
          handleSearch={hooks.handleSearch}
        />
        {/* List Routes */}
        <ListRoutes list={hooks.listRoutes} />
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
