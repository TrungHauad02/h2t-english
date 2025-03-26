import { Box, Typography, Card, CardContent, Button, Divider, Chip } from "@mui/material";
import { Test, TestTypeEnum } from "interfaces";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface TestCardProps {
    test: Test;
  }
  
export default function TestCard({ test }: TestCardProps) {
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