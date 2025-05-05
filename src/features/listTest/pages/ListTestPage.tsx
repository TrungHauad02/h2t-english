import React, { useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { MainPictureSection } from "components/sections";
import useListTestPage from "../hooks/useListTestPage";
import ListTest from "../components/ListTest";
import SearchTests from "../components/common/SearchTests";
import { TestTypeEnum } from "interfaces";

export default function ListTestPage() {
  const { type = "" } = useParams<{ type?: string }>();
  const trimmedType = type.slice(0, -1).toUpperCase();
  

  
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const listTestPage = useListTestPage();
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const backgroundColor = isDarkMode ? color.gray900 : color.gray50;
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
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

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
 
        <Fade in timeout={1000}>
          <Box>
            <MainPictureSection siteInfo={listTestPage.getSiteInfo(type)} />
          </Box>
        </Fade>
        

        <Fade in timeout={1400}>
          <Box sx={{ mb: 4, mt: 4 }}>
            <SearchTests onSearch={handleSearch} />
          </Box>
        </Fade>
        
        {/* Tests list component */}
        <Fade in timeout={1800}>
          <Box>
            <ListTest type={trimmedType as TestTypeEnum} searchQuery={searchQuery} />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}