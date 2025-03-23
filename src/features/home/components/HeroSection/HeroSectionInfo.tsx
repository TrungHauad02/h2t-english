import { Box, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CountUp from "react-countup";

export default function HeroSectionInfo() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();

    interface Statistic {
        label: string;
        value: number;
        suffix?: string;
    }

    const statistics: Statistic[] = [
        { label: "Students", value: 1200, suffix: "+"},
        { label: "Lessons", value: 800, suffix: "+" },
        { label: "Teachers", value: 500, suffix: "+"  },
        { label: "Average Improvement", value: 35, suffix: "%" },
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
                                    backgroundColor: isDarkMode
                                        ? colors.gray900
                                        : colors.teal50,
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
                                <CountUp start={0} end={stat.value} duration={2} separator="," suffix={stat.suffix || ""} />
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