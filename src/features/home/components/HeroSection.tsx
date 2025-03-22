import { Box, Container, Grid, Paper, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { HeroSectionTitle } from ".";
import { HeroSectionButtons } from ".";
import { HeroSectionImage } from ".";
import { HeroSectionInfo } from ".";
import useHeroSection from "../hooks/useHeroSection";

export default function HeroSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hooks = useHeroSection();

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: isDarkMode ? colors.gray800 : colors.teal50,
        color: isDarkMode ? colors.white : colors.gray900,
        overflow: "hidden",
        position: "relative",
        mt: 8,
        "&:hover": {
          boxShadow: 8,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box pt={isMobile ? 8 : 10} pb={6}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <HeroSectionTitle />
                <HeroSectionButtons handleNavigation={hooks.handleNavigation} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <HeroSectionImage />
            </Grid>
          </Grid>
        </Box>
        <Divider
          sx={{
            my: 3,
            borderColor: isDarkMode ? colors.gray700 : colors.gray200,
          }}
        />

        <HeroSectionInfo />

      </Container>
    </Paper>
  );
}
