import { Test } from "interfaces";
import { listTestService } from "../services/listTestServices";
import { Box, Grid } from "@mui/material";
import TestItem from "./TestItem";
import { WEPagination } from "components/pagination";
import { useState } from "react";
import { WESelect } from "components/input";

interface ListTestProps {
  type: string;
}

export default function ListTest({ type }: ListTestProps) {
  const [page, setPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(8);
  const itemPerPageOptions = [
    { label: "8", value: 8 },
    { label: "16", value: 16 },
    { label: "20", value: 20 },
  ];
  const listTest: Test[] = listTestService.getListTestByType(type) || [];

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

  const paginatedTests = listTest.slice(
    (page - 1) * testsPerPage,
    page * testsPerPage
  );

  return (
    <Box sx={{ mx: 4 }}>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {paginatedTests.map((test) => (
          <TestItem test={test} key={test.id} />
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
            totalPage={Math.ceil(listTest.length / testsPerPage)}
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
