import { Toeic } from "interfaces";
import { listToeicService } from "../../services/listToeicService";
import { Box, Grid } from "@mui/material";
import ToeicItem from "./ToeicItem";
import { WEPagination } from "components/pagination";
import { useState } from "react";
import { WESelect } from "components/input";

export default function ListToeic() {
  const [page, setPage] = useState(1);
  const [toeicsPerPage, setToeicsPerPage] = useState(8);

  const itemPerPageOptions = [
    { label: "8", value: 8 },
    { label: "16", value: 16 },
    { label: "20", value: 20 },
  ];

  const listToeic: Toeic[] = listToeicService.getListToeic() || [];

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleToeicsPerPageChange = (value: string | number) => {
    setToeicsPerPage(value as number);
    setPage(1);
  };

  const paginatedToeics = listToeic.slice(
    (page - 1) * toeicsPerPage,
    page * toeicsPerPage
  );

  return (
    <Box sx={{ mx: 4, mt: 2 }}>
      <Grid container spacing={3}>
        {paginatedToeics.map((toeic) => (
          <ToeicItem toeic={toeic} key={toeic.id} />
        ))}
      </Grid>
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
            totalPage={Math.ceil(listToeic.length / toeicsPerPage)}
            onChange={handleChangePage}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <WESelect
            label="Item per page"
            value={toeicsPerPage}
            options={itemPerPageOptions}
            onChange={handleToeicsPerPageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}