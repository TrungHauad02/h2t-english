import React from "react";
import { Stack, TextField } from "@mui/material";
import { WESelect, WEButton } from "components/input";
import { Search } from "@mui/icons-material";
import { CompetitionTestFilter, ToeicFilter } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface SearchBarProps {
  filter: CompetitionTestFilter | ToeicFilter;
  updateFilter: (updates: Partial<CompetitionTestFilter | ToeicFilter>) => void;
  onSearch: () => void;
  onOpenFilterDialog: () => void;
  statusOptions?: {label: string; value: string}[];
  sortByOptions?: {label: string; value: string}[];
}

export default function SearchBar({
  filter,
  updateFilter,
  onSearch,
  onOpenFilterDialog,
  statusOptions = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Unpublished", value: "unpublished" },
  ],
  sortByOptions = [
    { label: "Created At (Newest)", value: "-createdAt" },
    { label: "Created At (Oldest)", value: "createdAt" },
    { label: "Updated At (Newest)", value: "-updatedAt" },
    { label: "Updated At (Oldest)", value: "updatedAt" },
  ],
}: SearchBarProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Status filter value mapping
  const getStatusFilterValue = () => {
    if (filter.status === null) return "all";
    return filter.status ? "published" : "unpublished";
  };

  // Sort By filter value mapping
  const getSortByValue = () => {
    return filter.sortBy || "-createdAt";
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={2}
      alignItems={{ xs: "flex-start", sm: "flex-start", md: "center" }}
      sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}
    >
      <TextField
        fullWidth
        variant="outlined"
        type="text"
        value={filter.title || ""}
        onChange={(e) => updateFilter({ title: e.target.value })}
        placeholder="Search"
        InputProps={{
          endAdornment: (
            <Search
              sx={{ color: isDarkMode ? color.emerald100 : color.teal900 }}
            />
          ),
          sx: {
            borderRadius: 2,
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            color: isDarkMode ? color.emerald100 : color.teal900,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? color.gray100 : color.gray400,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? color.emerald400 : color.emerald500,
            },
          },
        }}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: "100%" }}
      >
        <WESelect
          label="Filter"
          onChange={(value) => {
            switch (value) {
              case "all":
                updateFilter({ status: null });
                break;
              case "published":
                updateFilter({ status: true });
                break;
              case "unpublished":
                updateFilter({ status: false });
                break;
            }
          }}
          options={statusOptions}
          value={getStatusFilterValue()}
        />
        <WESelect
          label="Sort By"
          onChange={(value) => {
            updateFilter({ sortBy: value as CompetitionTestFilter["sortBy"] });
          }}
          options={sortByOptions}
          value={getSortByValue()}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: "100%" }}
      >
        <WEButton variant="contained" onClick={onSearch}>
          <Search />
        </WEButton>
        <WEButton variant="outlined" onClick={onOpenFilterDialog}>
          Filters
        </WEButton>
      </Stack>
    </Stack>
  );
}