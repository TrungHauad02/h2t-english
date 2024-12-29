import { Box } from "@mui/material";
import { WESelect } from "components/input";
import WEPagination from "./WEPagination";

interface WEPaginationSelectProps {
  page: number;
  totalPage: number;
  itemsPerPage: number;
  itemOptions?: { label: string; value: number }[];
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

export default function WEPaginationSelect({
  page,
  totalPage,
  itemsPerPage,
  itemOptions,
  onPageChange,
  onItemsPerPageChange,
}: WEPaginationSelectProps) {
  const itemOptionsDefault = itemOptions
    ? itemOptions
    : [
        { label: "8", value: 8 },
        { label: "16", value: 16 },
        { label: "20", value: 20 },
      ];
  return (
    <Box
      sx={{
        mt: 4,
        mb: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <WEPagination
          page={page}
          totalPage={totalPage}
          onChange={onPageChange}
        />
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <WESelect
          label="Items per page"
          value={itemsPerPage}
          options={itemOptionsDefault}
          onChange={(value) => onItemsPerPageChange(value as number)}
        />
      </Box>
    </Box>
  );
}
