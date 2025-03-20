import { Box, Typography } from "@mui/material";

export default function TimeRemaining() {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2,mr:2, marginRight:'5%' }}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          px: 2,
          py: 1,
          bgcolor: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Time remaining:
        </Typography>
      </Box>
    </Box>
  );
}
