import { Test, TestFilter } from "interfaces";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { testService } from "services";
import { TestTypeEnum } from "interfaces";
import { WEPaginationSelect } from "components/pagination";
import { TestHeader, TestGrid } from "./listTest/";

interface ListTestProps {
  type: string;
  searchQuery?: string;
}

export default function ListTest({ type, searchQuery = "" }: ListTestProps) {
  const [page, setPage] = useState(0);
  const [testsPerPage, setTestsPerPage] = useState(8);
  const [tests, setTests] = useState<Test[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<TestFilter>({
    title: "",
    sortBy: "-createdAt",
    status: true,
  });

  const userId = 1; 

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setTestsPerPage(itemsPerPage);
    setPage(0);
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
        const newType = type.slice(0, -1) as keyof typeof TestTypeEnum;
        const typeEnum = TestTypeEnum[newType];

        setFilter(prev => ({
          ...prev,
          type: typeEnum,
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
          setTotalPages(response.data.totalPages);
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
      <TestHeader type={type as any} />

      <Box sx={{ margin: { xs: "1rem", md: "0 5% 2rem" } }}>
        <TestGrid tests={tests} loading={loading} />

        {!loading && tests.length > 0 && (
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
      </Box>
    </Box>
  );
}
