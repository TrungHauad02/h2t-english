import { CardMedia, Stack, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { SiteInfo } from "./types";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface MainPictureSectionProps {
  siteInfo: SiteInfo;
}

function MainPictureSection({ siteInfo }: MainPictureSectionProps) {
  const color = useColor();
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  const imageSrc = imgError
    ? location.pathname.includes("lesson")
      ? "/h2t-english-lessons-banner.svg"
      : "/h2t-english-tests-banner.svg"
    : siteInfo.bgUrl;

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative", height: "100%", width: "100%" }}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt="main"
        sx={{ width: "100vw", height: "300px", objectFit: "cover" }}
        onError={() => setImgError(true)}
      />
      <Typography
        variant="h4"
        component="h2"
        sx={{
          position: "absolute",
          fontWeight: "bold",
          textTransform: "capitalize",
          bottom: "0",
          left: "0",
          color: "#fff",
          background: `linear-gradient(90deg, ${color.emerald400} 0%, ${color.emerald800} 80%)`,
          paddingY: "1rem",
          paddingX: { xs: "2rem", sm: "4rem" },
          borderRadius: "0 1rem 0 0",
          transition: "all 2s",
          ":hover": {
            paddingX: { xs: "4rem", sm: "8rem" },
            color: "#000",
          },
        }}
      >
        {siteInfo.title}
      </Typography>
    </Stack>
  );
}

export default MainPictureSection;
