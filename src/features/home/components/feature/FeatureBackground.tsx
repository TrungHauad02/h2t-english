import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function FeatureBackground() {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <>
            <Box
                sx={{
                    position: "absolute",
                    top: { xs: -50, md: -150 },
                    right: { xs: -50, md: -150 },
                    width: { xs: 150, md: 300 },
                    height: { xs: 150, md: 300 },
                    borderRadius: "50%",
                    background: isDarkMode
                        ? `radial-gradient(circle, ${colors.teal900}, ${colors.transparent})`
                        : `radial-gradient(circle, ${colors.teal100}, ${colors.transparent})`,
                    opacity: 0.6,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: { xs: -70, md: -200 },
                    left: { xs: -70, md: -200 },
                    width: { xs: 200, md: 400 },
                    height: { xs: 200, md: 400 },
                    borderRadius: "50%",
                    background: isDarkMode
                        ? `radial-gradient(circle, ${colors.emerald900}, ${colors.transparent})`
                        : `radial-gradient(circle, ${colors.emerald100}, ${colors.transparent})`,
                    opacity: 0.5,
                }}
            />
        </>
    );
}
