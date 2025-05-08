import { Box, Container, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestTitle, TestCard } from "./test";
import { useEffect, useState } from "react";
import { Test } from "interfaces";
import { testService } from "services";
import { toast } from "react-toastify";

export default function TestsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const resData = await testService.getTestsByTeacher(1, 3, {
          sortBy: "-createdAt",
          status: true,
        });
        setTests(resData.data.content);
      } catch (error) {
        toast.error("Fail to fetch tests data");
      }
    };

    fetchTests();
  }, []);

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
          {tests.map((test) => (
            <Grid item key={test.id} xs={12} sm={6} md={4}>
              <TestCard test={test} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
