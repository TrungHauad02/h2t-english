import { Box, Typography, Container, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestimonialCard } from "./testimonial";
import { testimonials } from "../services/mockData";

export default function TestimonialsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: isDarkMode ? colors.teal300 : colors.teal700,
          }}
        >
          Success Stories
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 6,
            maxWidth: 700,
            mx: "auto",
            color: isDarkMode ? colors.gray300 : colors.gray700,
          }}
        >
          See what our students are saying about their learning experience
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item key={index} xs={12} md={4}>
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
                testimonial={testimonial.comment}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
