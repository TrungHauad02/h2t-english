import React from "react";
import {
  Box,
  Stack,
  LinearProgress,
  Container,
  Paper,
  Fade,
} from "@mui/material";

import { WEPaginationSelect } from "components/pagination";
import useManageToeicPage from "../hooks/useManageToeicPage";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ToeicsList from "../components/manageToeic/ToeicsList";
import ToeicsHeader from "../components/manageToeic/ToeicsHeader";
import LoadingSkeleton from "../components/common/LoadingSkeleton";

export default function ManageToeicPage() {
  const hooks = useManageToeicPage();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const loadingBarColor = isDarkMode ? color.teal400 : color.teal600;

  const backgroundGradient = isDarkMode
    ? `linear-gradient(135deg, ${color.gray900}, ${color.gray800})`
    : `linear-gradient(135deg, ${color.emerald50}, ${color.teal50})`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
        position: "relative",
      }}
    >
      {/* Top Loading Bar - appears during loading */}
      {hooks.loading && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            borderRadius: 1,
            "& .MuiLinearProgress-bar": {
              backgroundColor: loadingBarColor,
            },
            zIndex: 5,
          }}
        />
      )}

      <Container maxWidth="xl">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={isDarkMode ? 3 : 1}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              boxShadow: isDarkMode
                ? "0 6px 24px rgba(0,0,0,0.4)"
                : "0 6px 24px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: `linear-gradient(90deg, ${color.teal500}, ${color.emerald400})`,
              },
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isDarkMode
                  ? "0 8px 28px rgba(0,0,0,0.5)"
                  : "0 8px 28px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Stack direction={"column"} sx={{ minHeight: "80vh" }}>
              {/* Header */}
              <ToeicsHeader
                filter={hooks.filter}
                updateFilter={hooks.updateFilter}
                handleSearch={hooks.handleSearch}
                createToeicTest={hooks.createToeicTest}
              />

              {/* Loading State */}
              <LoadingSkeleton 
                isLoading={hooks.loading}
                message="Loading TOEIC tests..."
                cardType="toeic"
              />

              {/* List TOEIC tests - shown when not loading */}
              {!hooks.loading && (
                <ToeicsList 
                  toeicTests={hooks.toeicTests}
                  fetchData={hooks.handleSearch}
                  deleteToeicTest={hooks.deleteToeicTest}
                  updateToeicTest={hooks.updateToeicTest}
                />
              )}

              <Box
                sx={{
                  mt: "auto",
                  opacity: hooks.loading ? 0.5 : 1,
                  pointerEvents: hooks.loading ? "none" : "auto",
                }}
              >
                <WEPaginationSelect
                  page={hooks.page}
                  totalPage={hooks.totalPages}
                  itemsPerPage={hooks.itemsPerPage}
                  onPageChange={hooks.handleChangePage}
                  onItemsPerPageChange={hooks.handleItemsPerPageChange}
                />
              </Box>
            </Stack>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}