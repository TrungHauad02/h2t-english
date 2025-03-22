import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Route, RouteNodeEnum, User } from "interfaces";
import { learningRoutes, mockTeacher } from "../services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils/format";

const FadeIn = ({ children, delay = 0, duration = 500, ...props }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Animation triggers when element becomes visible in viewport
      if (entries[0].isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
      }
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        height: "100%",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

interface RouteCardProps {
  route: Route;
  owner: User;
  delay: number;
}

function RouteCard({ route, owner, delay }: RouteCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();
  const [expandedNodes, setExpandedNodes] = useState(false);
  const [hover, setHover] = useState(false);

  // Animation states
  const [cardScale, setCardScale] = useState(1);
  const [imageHover, setImageHover] = useState(false);
  const [chipHover, setChipHover] = useState<number | null>(null);

  // Determine how many nodes to display
  const initialNodeCount = 5;
  const maxNodeCount = 10;
  const hasMoreNodes = route.routeNodes.length > initialNodeCount;
  const hasDetailPage = route.routeNodes.length > maxNodeCount;

  const visibleNodes = expandedNodes
    ? route.routeNodes.slice(0, maxNodeCount)
    : route.routeNodes.slice(0, initialNodeCount);

  // Function to get color for node type chip
  const getChipColor = (type: RouteNodeEnum) => {
    switch (type) {
      case RouteNodeEnum.VOCABULARY:
        return isDarkMode ? colors.teal300 : colors.teal600;
      case RouteNodeEnum.GRAMMAR:
        return isDarkMode ? colors.emerald300 : colors.emerald600;
      case RouteNodeEnum.READING:
        return isDarkMode ? colors.green300 : colors.green600;
      case RouteNodeEnum.WRITING:
        return isDarkMode ? colors.info : colors.infoDarkMode;
      case RouteNodeEnum.SPEAKING:
        return isDarkMode ? colors.warning : colors.warningDarkMode;
      case RouteNodeEnum.LISTENING:
        return isDarkMode ? colors.success : colors.successDarkMode;
      default:
        return isDarkMode ? colors.gray300 : colors.gray600;
    }
  };

  const handleShowMore = () => {
    setExpandedNodes(true);
  };

  const handleViewDetail = () => {
    navigate(`/routes/${route.id}`);
  };

  // Get first letter of owner name for avatar fallback
  const ownerInitial = owner.name.charAt(0).toUpperCase();

  // Smooth hover animations
  useEffect(() => {
    if (hover) {
      setCardScale(1.02);
    } else {
      setCardScale(1);
    }
  }, [hover]);

  return (
    <FadeIn delay={delay} duration={800}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDarkMode ? colors.gray800 : colors.white,
          color: isDarkMode ? colors.gray100 : colors.gray900,
          borderRadius: 4,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
          boxShadow: hover
            ? `0 20px 30px -10px ${
                isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(15, 118, 110, 0.2)"
              }`
            : `0 10px 15px -5px ${
                isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(15, 118, 110, 0.1)"
              }`,
          transform: `translateY(${
            hover ? "-8px" : "0px"
          }) scale(${cardScale})`,
          border: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200}`,
          position: "relative",
          willChange: "transform, box-shadow",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
        >
          <CardMedia
            component="img"
            height="200"
            image={route.image}
            alt={route.title}
            sx={{
              filter: imageHover ? "brightness(1.05)" : "none",
              transition: "filter 0.5s ease, transform 0.5s ease",
              transform: imageHover ? "scale(1.05)" : "scale(1)",
              willChange: "transform, filter",
            }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: `linear-gradient(transparent, ${
                isDarkMode ? colors.gray900 + "e6" : colors.gray800 + "99"
              })`,
              transition: "opacity 0.3s ease",
              opacity: imageHover ? 0.9 : 0.7,
            }}
          />

          {/* Level badge */}
          <Chip
            size="small"
            label={owner.levelEnum}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: isDarkMode
                ? `${colors.teal700}cc`
                : `${colors.teal100}cc`,
              color: isDarkMode ? colors.gray100 : colors.teal800,
              fontWeight: "medium",
              backdropFilter: "blur(4px)",
              border: `1px solid ${
                isDarkMode ? colors.teal600 : colors.teal300
              }`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              transform: hover ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hover
                ? `0 4px 8px ${
                    isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(13, 148, 136, 0.2)"
                  }`
                : "none",
            }}
          />
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 3,
            pt: 2.5,
            display: "flex",
            flexDirection: "column",
            overflow: "visible", // Fixed overflow issue
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            fontWeight="bold"
            sx={{
              mb: 1,
              color: isDarkMode ? colors.teal300 : colors.teal700,
              position: "relative",
              pl: 0,
              transition: "color 0.3s",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              "&:hover": {
                color: isDarkMode ? colors.teal200 : colors.teal800,
              },
            }}
          >
            {route.title}
          </Typography>

          <Typography
            variant="body2"
            color={isDarkMode ? colors.gray300 : colors.gray700}
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "2.5rem",
            }}
          >
            {route.description}
          </Typography>

          {/* Teacher information - REDESIGNED as per your request */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                fontWeight="bold"
                color={isDarkMode ? colors.gray100 : colors.gray900}
                sx={{ mr: 1 }}
              >
                {owner.name}
              </Typography>

              {/* Avatar moved to right of owner name */}
              <Avatar
                src={owner.avatar}
                alt={owner.name}
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: "12px",
                  border: `1px solid ${
                    isDarkMode ? colors.teal600 : colors.teal500
                  }`,
                  bgcolor: isDarkMode ? colors.teal700 : colors.teal100,
                  color: isDarkMode ? colors.gray100 : colors.teal800,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform: hover ? "scale(1.1)" : "scale(1)",
                }}
              >
                {!owner.avatar && ownerInitial}
              </Avatar>
            </Box>
          </Box>

          {/* Date information - MOVED BELOW owner */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <DateRangeIcon
                fontSize="small"
                sx={{
                  mr: 1,
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  fontSize: "0.875rem",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? colors.gray400 : colors.gray600,
                }}
              >
                Created: {formatDate(route.createdAt)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon
                fontSize="small"
                sx={{
                  mr: 1,
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  fontSize: "0.875rem",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? colors.gray400 : colors.gray600,
                }}
              >
                Updated: {formatDate(route.updatedAt || route.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              my: 2,
              borderColor: isDarkMode ? colors.gray700 : colors.gray200,
            }}
          />

          {/* List of route nodes - only showing serial and type */}
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: isDarkMode ? colors.teal300 : colors.teal700,
            }}
          >
            Learning Modules:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 3,
              minHeight: "80px",
            }}
          >
            {visibleNodes.map((node, index) => (
              <Chip
                key={node.id}
                label={`${node.serial}. ${node.type}`}
                size="small"
                sx={{
                  backgroundColor: getChipColor(node.type),
                  color: "white",
                  fontWeight: "medium",
                  boxShadow:
                    chipHover === index
                      ? `0 4px 8px ${
                          isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"
                        }`
                      : `0 2px 4px ${
                          isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
                        }`,
                  transition:
                    "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                  transform:
                    chipHover === index ? "translateY(-4px)" : "translateY(0)",
                  willChange: "transform",
                  "&:hover": {
                    backgroundColor: getChipColor(node.type), // Keep color but make brighter
                    opacity: 0.9,
                  },
                }}
                onMouseEnter={() => setChipHover(index)}
                onMouseLeave={() => setChipHover(null)}
              />
            ))}
          </Box>

          {/* Show More / View Detail buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "auto",
              gap: 2,
            }}
          >
            {hasMoreNodes && !expandedNodes && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleShowMore}
                sx={{
                  borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  flexGrow: 1,
                  borderRadius: "20px",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                    backgroundColor: isDarkMode
                      ? colors.teal900
                      : colors.teal50,
                    boxShadow: `0 4px 8px ${
                      isDarkMode
                        ? "rgba(0,0,0,0.3)"
                        : "rgba(15, 118, 110, 0.15)"
                    }`,
                  },
                }}
              >
                Show More
              </Button>
            )}

            {hasDetailPage &&
              (expandedNodes ||
                route.routeNodes.length <= initialNodeCount) && (
                <Button
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  onClick={handleViewDetail}
                  sx={{
                    backgroundColor: isDarkMode
                      ? colors.teal500
                      : colors.teal600,
                    color: "white",
                    flexGrow: 1,
                    borderRadius: "20px",
                    boxShadow: `0 4px 12px ${
                      isDarkMode
                        ? "rgba(94, 234, 212, 0.2)"
                        : "rgba(13, 148, 136, 0.3)"
                    }`,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    overflow: "hidden",
                    position: "relative",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, ${
                        isDarkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.2)"
                      }, transparent)`,
                      transition: "left 0.7s ease",
                    },
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? colors.teal400
                        : colors.teal700,
                      boxShadow: `0 6px 16px ${
                        isDarkMode
                          ? "rgba(94, 234, 212, 0.3)"
                          : "rgba(13, 148, 136, 0.4)"
                      }`,
                      transform: "translateY(-3px)",
                      "&:before": {
                        left: "100%",
                      },
                    },
                  }}
                >
                  View Path
                </Button>
              )}
          </Box>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

export default function RoutesSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getRouteOwner = (ownerId: number): User => {
    return mockTeacher;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleExploreAll = () => {
    navigate("/routes");
  };

  // Create background decoration elements
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

  return (
    <Box
      sx={{
        py: 8,
        background: isDarkMode
          ? `linear-gradient(to bottom, ${colors.gray800}, ${colors.gray900})`
          : `linear-gradient(to bottom, ${colors.gray100}, ${colors.gray50})`,
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${isDarkMode ? colors.gray800 : colors.gray200}`,
        borderBottom: `1px solid ${
          isDarkMode ? colors.gray800 : colors.gray200
        }`,
      }}
    >
      {/* Background decorations */}
      {createDecorationElements()}

      {/* Background mesh with subtle animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${
            isDarkMode ? colors.gray800 : colors.gray200
          } 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          opacity: isDarkMode ? 0.05 : 0.1,
          zIndex: 0,
          animation: "meshAnimation 120s linear infinite",
          "@keyframes meshAnimation": {
            "0%": { backgroundPosition: "0 0" },
            "100%": { backgroundPosition: "30px 30px" },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <FadeIn duration={1000}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 6,
              flexWrap: { xs: "wrap", sm: "nowrap" },
              position: "relative",
            }}
          >
            {/* Title section with enhanced styling */}
            <Box sx={{ mb: { xs: 4, sm: 0 }, position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <AutoAwesomeIcon
                  sx={{
                    color: isDarkMode ? colors.teal300 : colors.teal600,
                    mr: 1.5,
                    fontSize: "28px",
                    animation: "sparkle 3s ease-in-out infinite",
                    "@keyframes sparkle": {
                      "0%, 100%": {
                        transform: "scale(1) rotate(0deg)",
                        opacity: 1,
                      },
                      "50%": {
                        transform: "scale(1.2) rotate(15deg)",
                        opacity: 0.9,
                      },
                    },
                  }}
                />
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    color: isDarkMode ? colors.teal300 : colors.teal700,
                    textShadow: isDarkMode
                      ? "0 0 15px rgba(94, 234, 212, 0.25)"
                      : "none",
                  }}
                >
                  Learning Paths
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100px",
                  height: "4px",
                  background: `linear-gradient(to right, ${
                    isDarkMode ? colors.teal500 : colors.teal500
                  }, ${isDarkMode ? "transparent" : "transparent"})`,
                  borderRadius: "2px",
                  mb: 2,
                  position: "relative",
                  overflow: "hidden",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${
                      isDarkMode
                        ? "rgba(94, 234, 212, 0.5)"
                        : "rgba(13, 148, 136, 0.5)"
                    }, transparent)`,
                    animation: "shimmer 2s infinite",
                  },
                  "@keyframes shimmer": {
                    "100%": { left: "100%" },
                  },
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? colors.gray300 : colors.gray700,
                  maxWidth: { sm: "400px", md: "500px" },
                }}
              >
                Follow structured learning paths to master English
                systematically and achieve your language goals efficiently.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleExploreAll}
              endIcon={<NavigateNextIcon />}
              sx={{
                backgroundColor: isDarkMode ? colors.teal500 : colors.teal600,
                color: "white",
                width: { xs: "100%", sm: "auto" },
                py: 1.5,
                px: 3,
                borderRadius: "24px",
                boxShadow: `0 4px 15px ${
                  isDarkMode
                    ? "rgba(94, 234, 212, 0.2)"
                    : "rgba(13, 148, 136, 0.2)"
                }`,
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, ${
                    isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.2)"
                  }, transparent)`,
                  transition: "left 0.7s ease",
                },
                "&:hover": {
                  boxShadow: `0 6px 20px ${
                    isDarkMode
                      ? "rgba(94, 234, 212, 0.3)"
                      : "rgba(13, 148, 136, 0.3)"
                  }`,
                  backgroundColor: isDarkMode ? colors.teal400 : colors.teal700,
                  transform: "translateY(-3px)",
                  "&:before": {
                    left: "100%",
                  },
                },
              }}
            >
              Explore All Paths
            </Button>
          </Box>
        </FadeIn>

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
              boxShadow: `0 8px 32px ${
                isDarkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)"
              }`,
              overflow: "hidden",
              border: `1px solid ${
                isDarkMode ? colors.gray700 : colors.gray200
              }`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: `0 12px 40px ${
                  isDarkMode ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.08)"
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

        <Grid container spacing={4}>
          {learningRoutes.map((route, index) => (
            <Grid item key={route.id} xs={12} sm={6} lg={4}>
              <RouteCard
                route={route}
                owner={getRouteOwner(route.ownerId)}
                delay={150 * index}
              />
            </Grid>
          ))}
        </Grid>

        {/* View more button at bottom with enhanced styling */}
        <FadeIn delay={300} duration={1000}>
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleExploreAll}
              startIcon={
                <AutoAwesomeIcon
                  sx={{
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.2)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
              }
              endIcon={<NavigateNextIcon />}
              sx={{
                borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                color: isDarkMode ? colors.teal400 : colors.teal600,
                px: 4,
                py: 1.5,
                borderRadius: "24px",
                backdropFilter: "blur(5px)",
                backgroundColor: isDarkMode
                  ? `${colors.gray800}80`
                  : `${colors.white}80`,
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, ${
                    isDarkMode
                      ? "rgba(94, 234, 212, 0.15)"
                      : "rgba(13, 148, 136, 0.15)"
                  }, transparent)`,
                  transition: "left 0.7s ease",
                },
                "&:hover": {
                  borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                  backgroundColor: isDarkMode
                    ? `${colors.gray700}40`
                    : `${colors.teal50}80`,
                  boxShadow: `0 4px 15px ${
                    isDarkMode
                      ? "rgba(94, 234, 212, 0.15)"
                      : "rgba(13, 148, 136, 0.15)"
                  }`,
                  transform: "translateY(-3px)",
                  "&:before": {
                    left: "100%",
                  },
                },
                border: `2px solid ${
                  isDarkMode ? colors.teal400 : colors.teal600
                }`,
              }}
            >
              View More Learning Paths
            </Button>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
}
