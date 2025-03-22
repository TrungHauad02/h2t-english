import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
} from "@mui/material";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface TestimonialProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  testimonial: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "David Lee",
    role: "Business Professional",
    avatar: "/images/testimonials/user1.jpg",
    rating: 5,
    testimonial:
      "This platform has completely transformed my business English. The interactive lessons and real-world examples helped me gain confidence in international meetings.",
  },
  {
    name: "Maria Garcia",
    role: "University Student",
    avatar: "/images/testimonials/user2.jpg",
    rating: 5,
    testimonial:
      "I needed to improve my TOEIC score for graduation, and this site helped me go from 650 to 880 in just two months! The practice tests were incredibly accurate.",
  },
  {
    name: "Thomas Wilson",
    role: "Software Engineer",
    avatar: "/images/testimonials/user3.jpg",
    rating: 4,
    testimonial:
      "The technical English vocabulary section was exactly what I needed for my career. Now I can communicate confidently with international colleagues.",
  },
];

function TestimonialCard({
  testimonial,
  name,
  role,
  avatar,
  rating,
}: TestimonialProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
        color: isDarkMode ? colors.gray100 : colors.gray900,
        borderRadius: 2,
        transition: "transform 0.3s, box-shadow 0.3s",
        position: "relative",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <FormatQuoteIcon
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            fontSize: 40,
            color: isDarkMode ? `${colors.teal700}40` : `${colors.teal200}`,
            opacity: 0.6,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            mt: 3,
            fontStyle: "italic",
            color: isDarkMode ? colors.gray300 : colors.gray700,
          }}
        >
          "{testimonial}"
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 50, height: 50, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray600,
                mb: 0.5,
              }}
            >
              {role}
            </Typography>
            <Rating
              value={rating}
              readOnly
              size="small"
              sx={{
                color: isDarkMode ? colors.teal400 : colors.teal600,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

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
                testimonial={testimonial.testimonial}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
