import React from "react";
import {
  Box,
  Stack,
  Skeleton,
  LinearProgress,
  CircularProgress,
  Typography,
  Fade,
  Container,
  Paper,
} from "@mui/material";

import { WEPaginationSelect } from "components/pagination";
import useManageToeicPage from "../hooks/useManageToeicPage";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ToeicsList from "../components/manageToeic/ToeicsList";
import ToeicsHeader from "../components/manageToeic/ToeicsHeader";

export default function ManageToeicPage() {
  const hooks = useManageToeicPage();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const skeletonColor = isDarkMode ? color.gray700 : color.gray200;
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
            }}
          >
            <Stack direction={"column"} sx={{ minHeight: "80vh" }}>
              {/* Header */}
              <ToeicsHeader
                searchText={hooks.searchText}
                setSearchText={hooks.setSearchText}
                statusFilter={hooks.statusFilter}
                handleStatusFilterChange={hooks.handleStatusFilterChange}
                handleSearch={hooks.handleSearch}
                createToeicTest={hooks.createToeicTest}
              />

              {/* Loading State */}
              {hooks.loading ? (
                <Fade in={hooks.loading} timeout={300}>
                  <Box sx={{ py: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                      <CircularProgress
                        size={32}
                        sx={{
                          color: loadingBarColor,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      align="center"
                      sx={{
                        mb: 4,
                        color: isDarkMode ? color.gray400 : color.gray600,
                        fontStyle: "italic",
                      }}
                    >
                      Loading TOEIC tests...
                    </Typography>

                    {/* Skeleton tests */}
                    <Stack spacing={2} sx={{ px: 2 }}>
                      {[1, 2, 3, 4].map((item) => (
                        <Box
                          key={item}
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            justifyContent: "center",
                          }}
                        >
                          {[1, 2, 3].map((card) => (
                            <Box
                              key={`${item}-${card}`}
                              sx={{
                                width: 345,
                                height: 220,
                                borderRadius: 2,
                                overflow: "hidden",
                                backgroundColor: isDarkMode
                                  ? color.gray800
                                  : color.white,
                                boxShadow: `0 4px 12px rgba(0,0,0,${
                                  isDarkMode ? 0.3 : 0.08
                                })`,
                                border: `1px solid ${
                                  isDarkMode ? color.gray700 : color.gray200
                                }`,
                              }}
                            >
                              {/* Title Skeleton */}
                              <Box sx={{ p: 2 }}>
                                <Skeleton
                                  variant="text"
                                  width="70%"
                                  height={32}
                                  sx={{
                                    backgroundColor: skeletonColor,
                                  }}
                                />

                                {/* Details Skeleton */}
                                <Skeleton
                                  variant="text"
                                  width="100%"
                                  height={20}
                                  sx={{
                                    backgroundColor: skeletonColor,
                                    mt: 1,
                                  }}
                                />
                                <Skeleton
                                  variant="text"
                                  width="90%"
                                  height={20}
                                  sx={{
                                    backgroundColor: skeletonColor,
                                    mb: 1,
                                  }}
                                />

                                {/* Divider Skeleton */}
                                <Skeleton
                                  variant="rectangular"
                                  width="100%"
                                  height={1}
                                  sx={{
                                    backgroundColor: skeletonColor,
                                    my: 2,
                                  }}
                                />

                                {/* Action buttons Skeleton */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Skeleton
                                    variant="rectangular"
                                    width={120}
                                    height={36}
                                    sx={{
                                      backgroundColor: skeletonColor,
                                      borderRadius: 1,
                                    }}
                                  />
                                  <Skeleton
                                    variant="circular"
                                    width={36}
                                    height={36}
                                    sx={{
                                      backgroundColor: skeletonColor,
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Fade>
              ) : (
                /* List TOEIC tests - shown when not loading */
                <ToeicsList 
                  toeicTests={hooks.displayedToeicTests}
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