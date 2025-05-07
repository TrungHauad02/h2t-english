import { Stack, Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { WEPaginationSelect } from "components/pagination";
import { WEDialog, WEConfirmDelete } from "components/display";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useListStudent from "../hooks/useListStudent";
import {
  HeaderSection,
  FilterSection,
  ActiveFiltersDisplay,
  StudentsList,
  EmptyState,
} from "./studentList";

export default function ListStudent() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useListStudent();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Stack spacing={3}>
        {/* Header Section */}
        <HeaderSection
          showFilters={hooks.showFilters}
          toggleFilters={hooks.toggleFilters}
        />

        {/* Filters Section */}
        <FilterSection
          showFilters={hooks.showFilters}
          nameFilter={hooks.nameFilter}
          setNameFilter={hooks.setNameFilter}
          emailFilter={hooks.emailFilter}
          setEmailFilter={hooks.setEmailFilter}
          statusFilter={hooks.statusFilter}
          setStatusFilter={hooks.setStatusFilter}
          startCreatedAt={hooks.startCreatedAt}
          setStartCreatedAt={hooks.setStartCreatedAt}
          endCreatedAt={hooks.endCreatedAt}
          setEndCreatedAt={hooks.setEndCreatedAt}
          filter={hooks.filter}
          handleSortChange={hooks.handleSortChange}
          handleResetFilters={hooks.handleResetFilters}
          handleApplyFilters={hooks.handleApplyFilters}
        />

        {/* Applied Filters Display */}
        {(hooks.nameFilter ||
          hooks.emailFilter ||
          hooks.statusFilter ||
          hooks.startCreatedAt ||
          hooks.endCreatedAt) && (
          <ActiveFiltersDisplay
            nameFilter={hooks.nameFilter}
            setNameFilter={hooks.setNameFilter}
            emailFilter={hooks.emailFilter}
            setEmailFilter={hooks.setEmailFilter}
            statusFilter={hooks.statusFilter}
            setStatusFilter={hooks.setStatusFilter}
            startCreatedAt={hooks.startCreatedAt}
            setStartCreatedAt={hooks.setStartCreatedAt}
            endCreatedAt={hooks.endCreatedAt}
            setEndCreatedAt={hooks.setEndCreatedAt}
          />
        )}

        {/* Students List */}
        <Box sx={{ width: "100%" }}>
          {hooks.isLoading ? (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: isDarkMode ? color.gray800 : color.gray50,
                borderRadius: "1rem",
              }}
            >
              <Typography>Loading students...</Typography>
            </Box>
          ) : hooks.students.length > 0 ? (
            <StudentsList
              users={hooks.students}
              openRows={hooks.openRows}
              toggleRow={(id: number) => hooks.toggleRow(id)}
              handleEdit={hooks.handleEdit}
              handleChangeStatus={hooks.handleChangeStatus}
              handleRemove={hooks.handleRemove}
            />
          ) : (
            <EmptyState
              hasFilters={
                !!(
                  hooks.nameFilter ||
                  hooks.emailFilter ||
                  hooks.statusFilter ||
                  hooks.startCreatedAt ||
                  hooks.endCreatedAt
                )
              }
              handleResetFilters={hooks.handleResetFilters}
            />
          )}
        </Box>

        {/* Pagination */}
        {hooks.students.length > 0 && (
          <WEPaginationSelect
            page={hooks.page}
            totalPage={Math.ceil(hooks.totalElements / hooks.itemsPerPage)}
            itemsPerPage={hooks.itemsPerPage}
            onPageChange={hooks.handleChangePage}
            onItemsPerPageChange={hooks.handleItemsPerPageChange}
          />
        )}

        {/* Dialogs */}
        <WEConfirmDelete
          open={hooks.isRemoveDialogOpen}
          resourceName={hooks.selectedUser?.name || "this student"}
          onCancel={hooks.cancelRemove}
          onConfirm={hooks.confirmRemove}
        />

        <WEDialog
          open={hooks.isChangeStatusDialogOpen}
          title="Confirm Status Change"
          onCancel={hooks.cancelChangeStatus}
          onOk={hooks.confirmChangeStatus}
        >
          Are you sure you want to change status of {hooks.selectedUser?.name}{" "}
          to {hooks.selectedUser?.status === true ? "Inactive" : "Active"}?
        </WEDialog>
      </Stack>
    </LocalizationProvider>
  );
}
