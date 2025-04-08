import { Grid } from "@mui/material";
import StatsCard from "./StatsCard";
import {
  FormatListBulleted as FormatListBulletedIcon,
  MenuBook as MenuBookIcon,
  Quiz as QuizIcon,
} from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface StatsCardSectionProps {
  totalRoutes: number;
  numberLessons: number;
  totalTests: number;
  totalViews: number;
}

export default function StatsCardSection({
  totalRoutes,
  numberLessons,
  totalTests,
  totalViews,
}: StatsCardSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          icon={<FormatListBulletedIcon />}
          title="Number of routes"
          value={totalRoutes}
          bgColor={isDarkMode ? color.teal900 : color.teal100}
          changePercentage={12}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          icon={<MenuBookIcon />}
          title="Number of lessons"
          value={numberLessons}
          bgColor={isDarkMode ? color.emerald900 : color.emerald100}
          changePercentage={8}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          icon={<QuizIcon />}
          title="Number of tests"
          value={totalTests}
          bgColor={isDarkMode ? color.green900 : color.green100}
          changePercentage={15}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          icon={<QuizIcon />}
          title="Views this month"
          value={totalViews}
          bgColor={isDarkMode ? color.green900 : color.green100}
          changePercentage={-12}
        />
      </Grid>
    </Grid>
  );
}
