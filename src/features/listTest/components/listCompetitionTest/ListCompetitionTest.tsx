import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Test, CompetitionTestFilter } from "interfaces";
import { competitionTestService } from "services";
import { WEPaginationSelect } from "components/pagination";
import LoadingSkeleton from "../common/LoadingSkeleton";
import CompetitionTestItem from "./CompetitionTestItem";
import useAuth from "hooks/useAuth";
interface ListCompetitionTestProps {
  searchQuery?: string;
}

export default function ListCompetitionTest({ searchQuery = "" }: ListCompetitionTestProps) {
  const [page, setPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(8);
  const [tests, setTests] = useState<Test[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<CompetitionTestFilter>({
    title: "",
    status: true,
  });

  const userId = Number(useAuth().userId);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
  setPage(value); 
};


  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setTestsPerPage(itemsPerPage);
    setPage(1);
  };

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      title: searchQuery,
    }));
  }, [searchQuery]);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await competitionTestService.getCompetitionTestsForStudent(
          page,
          testsPerPage,
          userId,
          filter
        );

        if (response && response.data) {
          setTests(response.data.content);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching competition tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [page, testsPerPage, filter, userId]);

  return (
    <Box>
      <Box sx={{ margin: { xs: "1rem", md: "0 5% 2rem" } }}>
        {loading ? (
          <LoadingSkeleton isLoading={true} cardType="route" />
        ) : (
          <>
            {tests.length > 0 && (
              <>
                <Grid container spacing={3}>
                  {tests.map((test) => (
                    <CompetitionTestItem key={test.id} test={test as any} />
                  ))}
                </Grid>
                <Box sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "center" }}>
                  <WEPaginationSelect
                    page={page}
                    totalPage={totalPages}
                    itemsPerPage={testsPerPage}
                    onPageChange={handleChangePage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}