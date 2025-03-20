import { CompetitionTest } from "interfaces";
import { listCompetitionTestService } from "../../services/listCompetitionTestService";
import { Box, Grid } from "@mui/material";
import CompetitionTestItem from "./CompetitionTestItem";
import { WEPagination } from "components/pagination";
import { useState } from "react";
import { WESelect } from "components/input";

export default function ListCompetitionTest() {
  const [page, setPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(8);
  const itemPerPageOptions = [
    { label: "8", value: 8 },
    { label: "16", value: 16 },
    { label: "20", value: 20 },
  ];

  const listCompetitionTest: CompetitionTest[] = listCompetitionTestService.getListCompetitionTest() || [];

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleTestsPerPageChange = (value: string | number) => {
    setTestsPerPage(value as number);
    setPage(1);
  };

  const paginatedTests = listCompetitionTest.slice(
    (page - 1) * testsPerPage,
    page * testsPerPage
  );

  return (
    <Box sx={{ mx: 4 }}>
      <Grid container spacing={3}>
        {paginatedTests.map((test) => (
          <CompetitionTestItem test={test} key={test.id} />
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
            totalPage={Math.ceil(listCompetitionTest.length / testsPerPage)}
            onChange={handleChangePage}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <WESelect
            label="Item per page"
            value={testsPerPage}
            options={itemPerPageOptions}
            onChange={handleTestsPerPageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
