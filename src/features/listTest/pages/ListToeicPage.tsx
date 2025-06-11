import React, { useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { MainPictureSection } from "components/sections";
import SearchTests from "../components/common/SearchTests";
import TestHeader from "../components/common/TestHeader";
import ListToeic from "../components/listToeic/ListToeic";

export default function ListToeicPage() {
  const siteInfo = {
    title: "Toeic",
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
  };

  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [searchQuery, setSearchQuery] = useState("");

  const backgroundColor = isDarkMode ? color.gray900 : color.gray50;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: backgroundColor,
        backgroundImage: isDarkMode
          ? `radial-gradient(${color.emerald900} 1px, transparent 1px)`
          : `radial-gradient(${color.emerald200} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        pt: 10,
        pb: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.emerald700 + "30" : color.emerald300 + "30"
          } 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.teal700 + "30" : color.teal300 + "30"
          } 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
     <Fade in timeout={1000}>
          <Box>
            <MainPictureSection siteInfo={siteInfo} />
          </Box>
        </Fade>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={1400}>
          <Box sx={{ mb: 4 }}>
            <SearchTests onSearch={handleSearch} />
          </Box>
        </Fade>
        <Fade in timeout={1200}>
          <Box sx={{ my: 4 }}>
          <TestHeader type={"toeic" as any} />
          </Box>
        </Fade>


        <Fade in timeout={1800}>
          <Box>
            <ListToeic searchQuery={searchQuery} />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
