import { Paper, Tab, Tabs } from "@mui/material";
import FadeIn from "./FadeInRoute";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface RouteTabProps {
    activeTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
    isMobile: boolean;
}

export default function RouteTab({ activeTab, handleTabChange, isMobile }: RouteTabProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <FadeIn delay={200} duration={800}>
            <Paper
                elevation={0}
                sx={{
                    mb: 5,
                    borderRadius: 4,
                    backgroundColor: isDarkMode
                        ? `${colors.gray800}99`
                        : `${colors.white}bb`,
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 8px 32px ${isDarkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)"
                        }`,
                    overflow: "hidden",
                    border: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                        }`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        boxShadow: `0 12px 40px ${isDarkMode ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.08)"
                            }`,
                        transform: "translateY(-2px)",
                    },
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant={isMobile ? "fullWidth" : "standard"}
                    centered={!isMobile}
                    sx={{
                        "& .MuiTab-root": {
                            color: isDarkMode ? colors.gray400 : colors.gray600,
                            fontWeight: "medium",
                            py: 2.5,
                            px: 4,
                            "&.Mui-selected": {
                                color: isDarkMode ? colors.teal300 : colors.teal700,
                                fontWeight: "bold",
                            },
                            "&:hover": {
                                color: isDarkMode ? colors.teal400 : colors.teal600,
                                backgroundColor: isDarkMode
                                    ? colors.gray700 + "33"
                                    : colors.gray100,
                            },
                            transition: "all 0.2s",
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: isDarkMode ? colors.teal400 : colors.teal600,
                            height: 3,
                            borderRadius: "3px 3px 0 0",
                            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        },
                    }}
                >
                    <Tab
                        label="All Paths"
                        icon={<AutoAwesomeIcon />}
                        iconPosition="start"
                        sx={{
                            minHeight: 60,
                            transition: "all 0.2s",
                            position: "relative",
                            overflow: "hidden",
                            "&:after": {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "3px",
                                background: `linear-gradient(90deg, ${colors.teal400}, ${colors.teal600})`,
                                opacity: activeTab === 0 ? 1 : 0,
                                transition: "opacity 0.3s ease",
                            },
                        }}
                    />
                    <Tab
                        label="Popular"
                        icon={<TrendingUpIcon />}
                        iconPosition="start"
                        sx={{
                            minHeight: 60,
                            transition: "all 0.2s",
                            position: "relative",
                            overflow: "hidden",
                            "&:after": {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "3px",
                                background: `linear-gradient(90deg, ${colors.teal400}, ${colors.teal600})`,
                                opacity: activeTab === 1 ? 1 : 0,
                                transition: "opacity 0.3s ease",
                            },
                        }}
                    />
                    <Tab
                        label="New"
                        icon={<NewReleasesIcon />}
                        iconPosition="start"
                        sx={{
                            minHeight: 60,
                            transition: "all 0.2s",
                            position: "relative",
                            overflow: "hidden",
                            "&:after": {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "3px",
                                background: `linear-gradient(90deg, ${colors.teal400}, ${colors.teal600})`,
                                opacity: activeTab === 2 ? 1 : 0,
                                transition: "opacity 0.3s ease",
                            },
                        }}
                    />
                </Tabs>
            </Paper>
        </FadeIn>
    );
}