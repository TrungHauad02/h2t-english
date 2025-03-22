import React, { useState, useEffect } from "react";
import { useDarkMode } from "hooks/useDarkMode";
import { Grammar } from "interfaces";
import useColor from "theme/useColor";
import {
  Box,
  Card,
  CardContent,
  Fade,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Info as InfoIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";
import TipsTab from "./TipsTab";
import ExampleTab from "./ExampleTab";
import DefinitionTab from "./DefinitionTab";
import HeaderSection from "./HeaderSection";

export default function GrammarDefinition({ lesson }: { lesson: Grammar }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect when component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const theme = {
    background: isDarkMode ? color.gray900 : color.white,
    paper: isDarkMode ? color.gray800 : color.gray50,
    primaryText: isDarkMode ? color.gray100 : color.gray900,
    secondaryText: isDarkMode ? color.gray300 : color.gray700,
    accent: isDarkMode ? color.teal400 : color.teal600,
    secondaryAccent: isDarkMode ? color.emerald400 : color.emerald600,
    tertiaryAccent: isDarkMode ? color.green400 : color.green600,
    divider: isDarkMode ? color.gray700 : color.gray300,
    exampleBackground: isDarkMode ? `${color.teal900}80` : `${color.teal100}80`,
    definitionBackground: isDarkMode
      ? `${color.emerald900}30`
      : `${color.emerald100}60`,
    shadow: isDarkMode
      ? "0px 8px 24px rgba(0, 0, 0, 0.5)"
      : "0px 8px 24px rgba(0, 0, 0, 0.1)",
    cardHoverShadow: isDarkMode
      ? "0px 12px 28px rgba(0, 0, 0, 0.7)"
      : "0px 12px 28px rgba(14, 165, 233, 0.15)",
  };

  const TabPanel = (props: {
    children?: React.ReactNode;
    index: number;
    value: number;
  }) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`grammar-tabpanel-${index}`}
        aria-labelledby={`grammar-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Fade in={value === index} timeout={500}>
              <Box>{children}</Box>
            </Fade>
          </Box>
        )}
      </div>
    );
  };

  return (
    <Fade in={isLoaded} timeout={800}>
      <Container maxWidth="lg" disableGutters>
        <Card
          sx={{
            backgroundColor: theme.background,
            color: theme.primaryText,
            boxShadow: theme.shadow,
            borderRadius: "16px",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "&:hover": {
              boxShadow: theme.cardHoverShadow,
              transform: "translateY(-8px)",
            },
            border: isDarkMode ? `1px solid ${color.gray700}` : "none",
          }}
        >
          {/* Header Section */}
          <HeaderSection
            isLoaded={isLoaded}
            title={lesson.title}
            theme={theme}
          />

          {/* Tabs navigation */}
          <Box sx={{ borderBottom: 1, borderColor: theme.divider }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: theme.secondaryText,
                  transition: "all 0.2s",
                  py: 1.5,
                },
                "& .Mui-selected": {
                  color: theme.accent,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.accent,
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              <Tab
                icon={<InfoIcon />}
                iconPosition="start"
                label="Definition"
                id="grammar-tab-0"
                aria-controls="grammar-tabpanel-0"
              />
              <Tab
                icon={<SchoolIcon />}
                iconPosition="start"
                label="Example"
                id="grammar-tab-1"
                aria-controls="grammar-tabpanel-1"
              />
              <Tab
                icon={<LightbulbIcon />}
                iconPosition="start"
                label={`Tips (${lesson.tips.length})`}
                id="grammar-tab-2"
                aria-controls="grammar-tabpanel-2"
              />
            </Tabs>
          </Box>

          <CardContent sx={{ padding: 0 }}>
            {/* Definition Tab */}
            <TabPanel value={currentTab} index={0}>
              <DefinitionTab
                definition={lesson.definition}
                theme={theme}
                setCurrentTab={setCurrentTab}
              />
            </TabPanel>

            {/* Example Tab */}
            <TabPanel value={currentTab} index={1}>
              <ExampleTab
                example={lesson.example}
                theme={theme}
                setCurrentTab={setCurrentTab}
              />
            </TabPanel>

            {/* Tips Tab */}
            <TabPanel value={currentTab} index={2}>
              <TipsTab
                tips={lesson.tips}
                theme={theme}
                setCurrentTab={setCurrentTab}
              />
            </TabPanel>
          </CardContent>
        </Card>
      </Container>
    </Fade>
  );
}
