import { Box, Container } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  HeroSection,
  FeaturesSection,
  ResponseDetailsSection,
  WorkflowSection,
  BenefitsSection,
  CTASection,
  BackgroundDesign,
} from "../components/airesponse";

export default function AIResponseFeedbackPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        mt: 4,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: isDarkMode
          ? `linear-gradient(180deg, ${color.gray900} 0%, ${color.gray950} 100%)`
          : `linear-gradient(180deg, ${color.gray50} 0%, ${color.white} 100%)`,
      }}
    >
      <BackgroundDesign />

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <ResponseDetailsSection />
        <BenefitsSection />
        <CTASection />
      </Container>
    </Box>
  );
}
