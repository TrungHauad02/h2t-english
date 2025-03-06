import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import useColor from "theme/useColor";

export default function RouteDetailsView({ data }: { data: Route }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              borderRadius: "1rem",
              overflow: "hidden",
              height: "100%",
              minHeight: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={data.image}
              alt={data.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: isDarkMode ? color.gray100 : color.gray900,
                  mb: 1,
                }}
              >
                {data.title}
              </Typography>
              <Chip
                label={data.status ? "Active" : "Inactive"}
                sx={{
                  backgroundColor: data.status
                    ? isDarkMode
                      ? color.emerald400
                      : color.emerald600
                    : isDarkMode
                    ? color.gray400
                    : color.gray500,
                  color: "white",
                  mb: 2,
                }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
                mb: 2,
              }}
            >
              {data.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={"/image.jpg"} alt="Owner" sx={{ mr: 2 }} />
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                }}
              >
                Created by: Teacher Name
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
