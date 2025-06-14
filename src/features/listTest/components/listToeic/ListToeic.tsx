import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Toeic, ToeicFilter } from "interfaces";
import { toeicService } from "services";
import { WEPaginationSelect } from "components/pagination";
import LoadingSkeleton from "../common/LoadingSkeleton";
import ToeicItem from "./ToeicItem";
import useAuth from "hooks/useAuth";

interface ListToeicProps {
  searchQuery?: string;
}

export default function ListToeic({ searchQuery = "" }: ListToeicProps) {
  const [page, setPage] = useState(1); // Keep 1-based like useManageToeicPage
  const [toeicsPerPage, setToeicsPerPage] = useState(8);
  const [toeics, setToeics] = useState<Toeic[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState<ToeicFilter>({
    title: "",
    status: true,
  });
  const userId = Number(useAuth().userId);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // Use value directly (1-based) like useManageToeicPage
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setToeicsPerPage(itemsPerPage);
    setPage(1);
  };

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      title: searchQuery,
    }));
  }, [searchQuery]);

  useEffect(() => {
    const fetchToeicTests = async () => {
      setLoading(true);
      try {
        const response = await toeicService.getToeicsForStudent(
          page, // Use page directly since we're consistent with useManageToeicPage
          toeicsPerPage,
          userId,
          filter
        );

        if (response && response.data) {
          setToeics(response.data.content || []);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching TOEIC tests:", error);
        setToeics([]); // Reset on error
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchToeicTests();
  }, [page, toeicsPerPage, filter, userId]);

  return (
    <Box>
      <Box sx={{ margin: { xs: "1rem", md: "0 5% 2rem" } }}>
        {loading ? (
          <LoadingSkeleton isLoading={true} cardType="route" />
        ) : (
          <>
            <Grid container spacing={3}>
              {toeics.map((toeic) => (
                <ToeicItem key={toeic.id} toeic={toeic} />
              ))}
            </Grid>

            {toeics.length > 0 && (
              <Box
                sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "center" }}
              >
                <WEPaginationSelect
                  page={page} // Use page directly since we're keeping 1-based
                  totalPage={totalPages}
                  itemsPerPage={toeicsPerPage}
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