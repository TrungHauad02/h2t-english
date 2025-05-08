import React, { useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { MainPictureSection } from "components/sections";
import ListCompetitionTest from "../components/listCompetitionTest/ListCompetitionTest";
import SearchTests from "../components/listCompetitionTest/SearchCompetitionTests";

export default function ListTestPage() {
  const siteInfo = {
    title: "Competition",
    bgUrl:
      "http://138.2.91.94:9000/h2t-english/static%2Fmain_picture_competition.jpg",
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
      <Container maxWidth="xl" sx={{ position: "relative",}}>
      <Box>
            <MainPictureSection siteInfo={siteInfo} />
          </Box>
          <Fade in timeout={1400}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 4,
                mt: 4,
                maxWidth: "100%",
              }}
            >
              <SearchTests onSearch={handleSearch} />
            </Box>
          </Fade>
        <Fade in timeout={1800}>
          <Box>
            <ListCompetitionTest searchQuery={searchQuery} />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
