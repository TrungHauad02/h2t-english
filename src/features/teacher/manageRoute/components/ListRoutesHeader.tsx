import { Stack } from "@mui/material";
import { WEButton, WESelect, WETexField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Search } from "@mui/icons-material";

interface ListRoutesHeaderProps {
  searchText: string;
  setSearchText: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleSearch: () => void;
}

export default function ListRoutesHeader({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  handleSearch,
}: ListRoutesHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent={"space-between"}
      spacing={2}
    >
      {/* Search bar */}
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <WETexField
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: { xs: "0.75rem", sm: "1rem" },
              width: "100%",
              paddingLeft: "0.2rem",
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${color.gray400}`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${
                  isDarkMode ? color.emerald400 : color.emerald500
                }`,
              },
              fontSize: "1rem",
              margin: 0,
            },
          }}
        />
        <WESelect
          label="Filter"
          onChange={(value) => setStatusFilter(value as string)}
          options={[
            { label: "All", value: "all" },
            { label: "Published", value: "published" },
            { label: "Unpublished", value: "unpublished" },
          ]}
          value={statusFilter}
        />
        <WEButton
          variant="contained"
          sx={{ width: "40px", height: "40px" }}
          onClick={handleSearch}
        >
          <Search />
        </WEButton>
      </Stack>
      {/* Actions */}
      <Stack direction={"row"} alignItems={"center"}>
        <WEButton variant="contained">Create Route</WEButton>
      </Stack>
    </Stack>
  );
}
