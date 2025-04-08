import { Box, Container, Skeleton } from "@mui/material";

export default function RouteSkeleton() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: { xs: 4, md: 8 }, mb: 4 }}>
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ borderRadius: 2, mb: 2 }}
        />
        <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 3, width: "80%" }} />

        <Skeleton
          variant="rectangular"
          height={150}
          sx={{ borderRadius: 2, mb: 4 }}
        />

        <Box sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              variant="rectangular"
              height={120}
              sx={{ borderRadius: 2, mb: 2 }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
