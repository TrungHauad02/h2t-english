import { Card, CardContent, Stack, Grid, Skeleton } from "@mui/material";

export const renderSkeletons = (isDarkMode: boolean, color: any) => {
  return Array(8)
    .fill(0)
    .map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
        <Card
          sx={{
            height: "100%",
            bgcolor: isDarkMode ? color.gray800 : color.white,
            boxShadow: `0 4px 12px ${
              isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"
            }`,
            borderRadius: 3,
          }}
        >
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
          />
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Skeleton
                variant="circular"
                width={48}
                height={48}
                sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={32}
                sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
              />
            </Stack>
            <Skeleton
              variant="text"
              width="90%"
              height={32}
              sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={80}
              sx={{ bgcolor: isDarkMode ? color.gray700 : color.gray200 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{
                mt: 2,
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    ));
};
