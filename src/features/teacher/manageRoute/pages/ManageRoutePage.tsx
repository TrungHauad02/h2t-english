import {
  Box,
  Stack,
  Skeleton,
  LinearProgress,
  CircularProgress,
  Typography,
  Fade,
} from "@mui/material";
import ListRoutes from "../components/ListRoutes";
import { WEPaginationSelect } from "components/pagination";
import ListRoutesHeader from "../components/ListRoutesHeader";
import useManageRoutePage from "../hooks/useManageRoutePage";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function ManageRoutePage() {
  const hooks = useManageRoutePage();
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const skeletonColor = isDarkMode ? color.gray700 : color.gray200;
  const loadingBarColor = isDarkMode ? color.teal400 : color.teal600;

  return (
    <Box sx={{ mt: 6, position: "relative" }}>
      {/* Top Loading Bar - appears during loading */}
      {hooks.isLoading && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: -8,
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

      <Stack direction={"column"} sx={{ minHeight: "88vh" }}>
        {/* Header */}
        <ListRoutesHeader
          filter={hooks.filter}
          updateFilter={hooks.updateFilter}
          handleSearch={hooks.handleSearch}
        />

        {/* Loading State */}
        {hooks.isLoading ? (
          <Fade in={hooks.isLoading} timeout={300}>
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
                Loading routes...
              </Typography>

              {/* Skeleton routes */}
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
                          height: 360,
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
                        {/* Image Skeleton */}
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={180}
                          sx={{
                            backgroundColor: skeletonColor,
                          }}
                        />

                        <Box sx={{ p: 2 }}>
                          {/* Title Skeleton */}
                          <Skeleton
                            variant="text"
                            width="70%"
                            height={32}
                            sx={{
                              backgroundColor: skeletonColor,
                            }}
                          />

                          {/* Description Skeleton */}
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
          /* List Routes - shown when not loading */
          <ListRoutes list={hooks.listRoutes} fetchData={hooks.fetchData} />
        )}

        {/* Pagination */}
        <Box
          sx={{
            mt: "auto",
            opacity: hooks.isLoading ? 0.5 : 1,
            pointerEvents: hooks.isLoading ? "none" : "auto",
          }}
        >
          <WEPaginationSelect
            page={hooks.page}
            totalPage={hooks.totalPages}
            itemsPerPage={hooks.itemsPerPage}
            onPageChange={hooks.handleChangePage}
            onItemsPerPageChange={hooks.handleLessonsPerPageChange}
          />
        </Box>
      </Stack>
    </Box>
  );
}
