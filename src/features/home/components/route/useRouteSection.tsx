import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Route } from "interfaces";
import { routeService } from "services";
import { toast } from "react-toastify";

export default function useRouteSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [activeTab, setActiveTab] = useState(0);
  const [longestRoutes, setLongestRoutes] = useState<Route[]>([]);
  const [recentRoutes, setRecentRoutes] = useState<Route[]>([]);
  const [isLongestRoutesLoaded, setIsLongestRoutesLoaded] = useState(false);
  const [isRecentRoutesLoaded, setIsRecentRoutesLoaded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLongestRoutes = async () => {
      if (!isLongestRoutesLoaded && activeTab === 0) {
        try {
          const resData = await routeService.getLongestRoute();
          setLongestRoutes(resData.data);
          setIsLongestRoutesLoaded(true);
        } catch (error) {
          console.log(error);
          toast.error("Fail to fetch longest routes data");
        }
      }
    };
    fetchLongestRoutes();
  }, [activeTab, isLongestRoutesLoaded]);

  useEffect(() => {
    const fetchRecentRoutes = async () => {
      if (!isRecentRoutesLoaded && activeTab === 1) {
        try {
          const resData = await routeService.getRecentRoutes();
          setRecentRoutes(resData.data);
          setIsRecentRoutesLoaded(true);
        } catch (error) {
          console.log(error);
          toast.error("Fail to fetch recent routes data");
        }
      }
    };
    fetchRecentRoutes();
  }, [activeTab, isRecentRoutesLoaded]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleExploreAll = () => {
    navigate("/routes");
  };

  const createDecorationElements = () => {
    const elements = [];
    for (let i = 0; i < 6; i++) {
      elements.push(
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: ["60px", "80px", "100px", "120px"][Math.floor(i / 2)],
            height: ["60px", "80px", "100px", "120px"][Math.floor(i / 2)],
            borderRadius: "30%",
            background:
              i % 2 === 0
                ? `linear-gradient(135deg, ${
                    isDarkMode ? colors.teal700 : colors.teal200
                  }, ${isDarkMode ? colors.teal800 : colors.teal100})`
                : `linear-gradient(135deg, ${
                    isDarkMode ? colors.emerald700 : colors.emerald200
                  }, ${isDarkMode ? colors.emerald800 : colors.emerald100})`,
            opacity: isDarkMode ? 0.15 : 0.25,
            top: [`${10 + i * 15}%`, `${5 + i * 10}%`, `${20 + i * 8}%`][i % 3],
            left: i % 2 === 0 ? [`${5 + i * 3}%`] : [`${75 - i * 3}%`],
            filter: "blur(40px)",
            transform: `rotate(${i * 45}deg)`,
            zIndex: 0,
            animation: `float${i} 15s ease-in-out infinite`,
            "@keyframes float0": {
              "0%, 100%": { transform: "rotate(0deg) translateY(0)" },
              "50%": { transform: "rotate(5deg) translateY(-15px)" },
            },
            "@keyframes float1": {
              "0%, 100%": { transform: "rotate(45deg) translateY(0)" },
              "50%": { transform: "rotate(40deg) translateY(-20px)" },
            },
            "@keyframes float2": {
              "0%, 100%": { transform: "rotate(90deg) translateY(0)" },
              "50%": { transform: "rotate(95deg) translateY(-10px)" },
            },
            "@keyframes float3": {
              "0%, 100%": { transform: "rotate(135deg) translateY(0)" },
              "50%": { transform: "rotate(130deg) translateY(-25px)" },
            },
            "@keyframes float4": {
              "0%, 100%": { transform: "rotate(180deg) translateY(0)" },
              "50%": { transform: "rotate(185deg) translateY(-15px)" },
            },
            "@keyframes float5": {
              "0%, 100%": { transform: "rotate(225deg) translateY(0)" },
              "50%": { transform: "rotate(220deg) translateY(-20px)" },
            },
          }}
        />
      );
    }
    return elements;
  };

  const learningRoutes = activeTab === 0 ? longestRoutes : recentRoutes;

  return {
    learningRoutes,
    activeTab,
    setActiveTab,
    navigate,
    isMobile,
    handleTabChange,
    handleExploreAll,
    createDecorationElements,
  };
}
