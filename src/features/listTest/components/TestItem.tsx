import { Test } from "interfaces";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function TestItem({ test }: { test: Test }) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [hovered, setHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: 400,
          margin: "16px auto",
          boxShadow: hovered ? 6 : 3,
          borderRadius: 2,
          overflow: "hidden",
          transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          cursor: "pointer",
          backgroundColor: isDarkMode
            ? hovered
              ? color.gray800
              : color.gray900
            : hovered
            ? color.teal50
            : color.gray50,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardContent
          sx={{
            backgroundColor: isDarkMode
              ? hovered
                ? color.gray700
                : color.gray800
              : hovered
              ? color.teal100 + "40"
              : color.gray100,
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              color: isDarkMode
                ? hovered
                  ? color.teal400
                  : color.teal200
                : hovered
                ? color.teal700
                : color.gray800,
              transition: "color 0.3s ease-in-out",
            }}
          >
            {test?.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
            paragraph
          >
            Duration: {test?.duration} minutes
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
            paragraph
          >
            Total question: {test?.totalQuestions}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
            paragraph
          >
            Score: {test?.scoreLastOfTest || 0}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                padding: 0,
                color: isDarkMode ? color.teal300 : color.teal700,
                borderColor: isDarkMode ? color.teal300 : color.teal700,
                textDecoration: "underline",
                borderRadius: "99rem",
                marginRight: "auto",
                ":hover": {
                  bgcolor: isDarkMode
                    ? hovered
                      ? color.gray700
                      : color.gray800
                    : hovered
                    ? color.teal100
                    : color.gray100,
                },
              }}
            >
              See History
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: "0.5rem 1rem",
                backgroundColor: isDarkMode ? color.teal700 : color.teal600,
                color: color.white,
                borderRadius: "0.5rem",
                transition: "0.3s ease-in-out",
                marginLeft: "auto",
                ":hover": {
                  backgroundColor: isDarkMode ? color.teal600 : color.teal500,
                },
              }}
            >
              Do Test
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
