import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Test, TestFilter } from "interfaces";
import { testService } from "services";
import { TestTypeEnum } from "interfaces";
import { WEPaginationSelect } from "components/pagination";
import { TestGrid } from "./listTest/";

import LoadingSkeleton from "./common/LoadingSkeleton"; 
import useAuth from "hooks/useAuth";

interface ListTestProps {
  type: TestTypeEnum;
  searchQuery?: string;
}

export default function ListTest({ type, searchQuery = "" }: ListTestProps) {
  const [page, setPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(8);
  const [tests, setTests] = useState<Test[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const userId = Number(useAuth().userId);
  const [filter, setFilter] = useState<TestFilter>({
    title: "",
    type,
    status: true,
  });


  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setTestsPerPage(itemsPerPage);
    setPage(1);
  };

  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      title: searchQuery,
    }));
  }, [searchQuery]);

  useEffect(() => {
    if (type) {
      try {
        setFilter(prev => ({
          ...prev,
          type: type,
        }));
      } catch (error) {
        console.error("Error setting test type:", error);
      }
    }
  }, [type]);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await testService.getTestsForStudent(
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
        console.error("Error fetching tests:", error);
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
            <TestGrid tests={tests} loading={false} />
            {tests.length > 0 && (
              <Box sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "center" }}>
                <WEPaginationSelect
                  page={page + 1}
                  totalPage={totalPages}
                  itemsPerPage={testsPerPage}
                  onPageChange={handleChangePage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
