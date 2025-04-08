import React, { useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Header, ListRoute, SearchRoutes } from "../components";
import { WEPaginationSelect } from "components/pagination";

export default function ListRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(8);

  const backgroundColor = isDarkMode ? color.gray900 : color.gray50;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleItemPerPageChange = (itemPerPage: number) => {
    setItemPerPage(itemPerPage);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: backgroundColor,
        backgroundImage: isDarkMode
          ? `radial-gradient(${color.teal900} 1px, transparent 1px)`
          : `radial-gradient(${color.teal200} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        pt: 10,
        pb: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Abstract background elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.teal700 + "30" : color.teal300 + "30"
          } 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.emerald700 + "30" : color.emerald300 + "30"
          } 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header section with title and description */}
        <Header />

        {/* Search box with improved styling */}
        <Fade in timeout={1600}>
          <Box sx={{ mb: 5 }}>
            <SearchRoutes onSearch={handleSearch} />
          </Box>
        </Fade>

        {/* Routes list component */}
        <Fade in timeout={1800}>
          <Box>
            <ListRoute
              searchQuery={searchQuery}
              page={page}
              itemPerPage={itemPerPage}
              setTotalPages={setTotalPages}
            />
            <WEPaginationSelect
              page={page}
              totalPage={totalPages}
              itemsPerPage={itemPerPage}
              onPageChange={handleChangePage}
              onItemsPerPageChange={handleItemPerPageChange}
            />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
