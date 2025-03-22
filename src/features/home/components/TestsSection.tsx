import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
} from "@mui/material";

import { Test, TestTypeEnum } from "interfaces";
import { featuredTests } from "../services/mockData";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface TestCardProps {
  test: Test;
}

function TestCard({ test }: TestCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  const getTestTypeColor = (type: TestTypeEnum) => {
    switch (type) {
      case TestTypeEnum.MIXING:
        return isDarkMode ? colors.emerald300 : colors.emerald600;
      case TestTypeEnum.READING:
        return isDarkMode ? colors.teal300 : colors.teal600;
      case TestTypeEnum.LISTENING:
        return isDarkMode ? colors.green300 : colors.green600;
      case TestTypeEnum.SPEAKING:
        return isDarkMode ? colors.warning : colors.warningDarkMode;
      case TestTypeEnum.WRITING:
        return isDarkMode ? colors.info : colors.infoDarkMode;
      default:
        return isDarkMode ? colors.gray300 : colors.gray600;
    }
  };

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
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip
            label={test.type}
            size="small"
            sx={{
              backgroundColor: getTestTypeColor(test.type),
              color: "white",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          component="h3"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {test.title}
        </Typography>
        <Typography
          variant="body2"
          color={isDarkMode ? colors.gray300 : colors.gray700}
          sx={{ mb: 3 }}
        >
          {test.description}
        </Typography>

        <Divider
          sx={{
            my: 2,
            borderColor: isDarkMode ? colors.gray700 : colors.gray200,
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon
              fontSize="small"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray500,
                mr: 0.5,
              }}
            />
            <Typography
              variant="body2"
              color={isDarkMode ? colors.gray400 : colors.gray500}
            >
              {test.duration} min
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HelpOutlineIcon
              fontSize="small"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray500,
                mr: 0.5,
              }}
            />
            <Typography
              variant="body2"
              color={isDarkMode ? colors.gray400 : colors.gray500}
            >
              {test.totalQuestions} questions
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            backgroundColor: colors.teal600,
            "&:hover": {
              backgroundColor: colors.teal700,
            },
          }}
        >
          Take Test
        </Button>
      </CardContent>
    </Card>
  );
}

export default function TestsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? colors.teal300 : colors.teal700,
              }}
            >
              Practice Tests
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              Assess your skills and track your progress with our comprehensive
              tests
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: isDarkMode ? colors.teal400 : colors.teal600,
              color: isDarkMode ? colors.teal400 : colors.teal600,
              "&:hover": {
                borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                backgroundColor: "transparent",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Browse All Tests
          </Button>
        </Box>

        <Grid container spacing={4}>
          {featuredTests.map((test) => (
            <Grid item key={test.id} xs={12} sm={6} md={4}>
              <TestCard test={test} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
