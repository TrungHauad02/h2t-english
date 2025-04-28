import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { FeatureCard, FeatureTitle, FeatureBackground } from "./feature";
import { features } from "./feature/featuresData";
import { useNavigate } from "react-router-dom";

export default function FeaturesSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
      }}
    >
      <FeatureBackground />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={animate} timeout={800}>
          <Box>
            <FeatureTitle />
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                onClick={() => handleFeatureClick(feature.path)}
                index={index}
                delay={index * 150}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
