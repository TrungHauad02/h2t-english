import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function HeroSectionImage() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    const mainImage =
        "https://images.unsplash.com/photo-1742603096268-0efc93dcc95a?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return(
        <Box
        sx={{
            position: "relative",
            display: { xs: "none", md: "block" },
            mx: "auto",
        }}
    >
        <Box
            sx={{
                position: "absolute",
                top: -10,
                left: -10,
                right: 10,
                bottom: 10,
                borderRadius: 3,
                border: `3px solid ${isDarkMode ? colors.teal700 : colors.teal300
                    }`,
                zIndex: 1,
            }}
        />
        <Box
            component="img"
            src={mainImage}
            alt="Learning English online"
            sx={{
                width: "100%",
                borderRadius: 3,
                objectFit: "cover",
                objectPosition: "center",
                boxShadow: `0 20px 40px ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)"
                    }`,
                transform: "perspective(1000px) rotateY(-5deg)",
                transition: "all 0.5s ease",
                zIndex: 2,
                position: "relative",
                "&:hover": {
                    transform: "perspective(1000px) rotateY(0deg)",
                },
            }}
        />
    </Box>
    );
}