import { Box, Container, Grid } from "@mui/material";
import { featuredTests } from "../services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import TestCard from "./test/TestCard";
import TestTitle from "./test/TestTitle";

export default function TestsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? `${colors.teal900}20`
            : `${colors.teal100}50`,
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg">
        <TestTitle />
        <Grid container spacing={4}>
          {featuredTests.map((test) => (
            <Grid item key={test.id} xs={12} sm={6} md={4}>
              <TestCard test={test} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
