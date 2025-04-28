import { Box, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { heroInfoService } from "services";
import { toast } from "react-toastify";

interface HeroInfo {
  students: number;
  teachers: number;
  lessons: number;
  tests: number;
}
interface Statistic {
  label: string;
  value: number;
  suffix?: string;
}
export default function HeroSectionInfo() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [data, setData] = useState<HeroInfo>({
    students: 0,
    teachers: 0,
    lessons: 0,
    tests: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await heroInfoService.getHeroInfo();
        setData(resData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch hero info data");
      }
    };

    fetchData();
  }, []);

  const statistics: Statistic[] = [
    {
      label: "Students",
      value: data.students,
      suffix: data.students < 10 ? "" : "+",
    },
    {
      label: "Teachers",
      value: data.teachers,
      suffix: data.teachers < 10 ? "" : "+",
    },
    {
      label: "Lessons",
      value: data.lessons,
      suffix: data.lessons < 10 ? "" : "+",
    },
    {
      label: "Tests",
      value: data.tests,
      suffix: data.tests < 10 ? "" : "+",
    },
  ];

  return (
    <Box pb={6}>
      <Grid container spacing={2}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: isDarkMode ? colors.gray700 : colors.white,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: isDarkMode ? colors.gray900 : colors.teal50,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? colors.teal300 : colors.teal600,
                  mb: 1,
                }}
              >
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2}
                  separator=","
                  suffix={stat.suffix || ""}
                />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? colors.gray300 : colors.gray600,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
