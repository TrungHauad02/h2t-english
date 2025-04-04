import {
  Box,
  Button,
  Chip,
  Card,
  CardContent,
  useMediaQuery,
  Theme,
  alpha,
  Stack,
  Collapse,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { ExpandMore, ExpandLess, Groups } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useState, useEffect } from "react";
import ActionButtons from "./ActionButtons";
import ClassifyCardHeader from "./ClassifyCardHeader";

interface ClassifyGroupCardProps {
  item: {
    id: number;
    groupName: string;
    members: string[];
    status: boolean;
  };
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClassifyGroupCard({
  item,
  isEditMode,
  onEdit,
  onDelete,
}: ClassifyGroupCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Removed favorite state
  const [animate, setAnimate] = useState(false);

  // Effect for entrance animation
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const visibleItemsCount = isMobile ? 3 : 5;
  const hasMoreItems = item.members.length > visibleItemsCount;
  const displayedMembers = expanded
    ? item.members
    : item.members.slice(0, visibleItemsCount);
  const remainingCount = item.members.length - visibleItemsCount;

  const firstLetter = item.groupName.charAt(0).toUpperCase();

  // Enhanced color selection algorithm
  const getGroupColor = (name: string) => {
    const colors = [
      color.teal500,
      color.emerald500,
      color.green500,
      color.teal600,
      color.emerald600,
      color.green600,
      color.teal400,
      color.emerald400,
      color.green400,
    ];

    // More sophisticated hash function for better color distribution
    const hash = name
      .split("")
      .reduce((acc, char, idx) => acc + char.charCodeAt(0) * (idx + 1), 0);
    return colors[hash % colors.length];
  };

  const groupColor = getGroupColor(item.groupName);

  // Enhanced background with subtle pattern effect
  const getBackgroundPattern = () => {
    const patternColor = isDarkMode
      ? alpha(groupColor, 0.03)
      : alpha(groupColor, 0.02);

    return {
      backgroundColor: isDarkMode
        ? isHovered
          ? alpha(color.gray800, 0.95)
          : color.gray900
        : isHovered
        ? alpha(color.white, 0.97)
        : color.white,
      backgroundImage: `radial-gradient(${patternColor} 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    };
  };

  // Generating sparkle positions for the card
  const generateSparkles = () => {
    const sparkles = [];
    const count = Math.floor(Math.random() * 3) + 2; // 2-4 sparkles

    for (let i = 0; i < count; i++) {
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const size = Math.floor(Math.random() * 4) + 2; // 2-5px
      const delay = Math.random() * 0.5;

      sparkles.push({
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
      });
    }

    return sparkles;
  };

  const sparkles = generateSparkles();

  return (
    <Card
      elevation={isHovered ? 8 : 3}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        ...getBackgroundPattern(),
        borderRadius: 4,
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: animate
          ? "scale(1) translateY(0)"
          : isHovered
          ? "scale(1.02) translateY(-6px)"
          : "scale(1) translateY(0)",
        overflow: "visible",
        border: `1px solid ${
          isDarkMode
            ? isHovered
              ? alpha(groupColor, 0.3)
              : alpha(groupColor, 0.15)
            : isHovered
            ? alpha(groupColor, 0.15)
            : alpha(groupColor, 0.08)
        }`,
        boxShadow: isHovered
          ? `0 10px 30px -5px ${
              isDarkMode ? alpha(color.black, 0.5) : alpha(groupColor, 0.2)
            }, 0 0 5px ${alpha(groupColor, 0.1)}`
          : `0 5px 15px -5px ${
              isDarkMode ? alpha(color.black, 0.3) : alpha(color.gray400, 0.1)
            }`,
        "&::before": isHovered
          ? {
              content: "''",
              position: "absolute",
              bottom: -8,
              left: "10%",
              right: "10%",
              height: 8,
              background: `linear-gradient(to right, transparent, ${alpha(
                groupColor,
                isDarkMode ? 0.4 : 0.3
              )}, transparent)`,
              filter: "blur(4px)",
              borderRadius: "50%",
            }
          : {},
        "&::after": animate
          ? {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at center, ${alpha(
                groupColor,
                0.15
              )} 0%, transparent 70%)`,
              opacity: 1,
              animation: "pulse 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              pointerEvents: "none",
              borderRadius: 4,
              "@keyframes pulse": {
                "0%": { opacity: 0.8, transform: "scale(0.7)" },
                "100%": { opacity: 0, transform: "scale(1.1)" },
              },
            }
          : {},
      }}
    >
      {/* Decorative elements - Animated sparkles */}
      {isHovered &&
        sparkles.map((sparkle, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              ...sparkle,
              borderRadius: "50%",
              backgroundColor: alpha(groupColor, 0.8),
              zIndex: 10,
              animation: "sparkle 1.5s ease-in-out infinite",
              "@keyframes sparkle": {
                "0%": { opacity: 0, transform: "scale(0)" },
                "50%": { opacity: 1, transform: "scale(1)" },
                "100%": { opacity: 0, transform: "scale(0)" },
              },
            }}
          />
        ))}

      {/* Main content */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <ClassifyCardHeader
          firstLetter={firstLetter}
          groupColor={groupColor}
          item={item}
          isEditMode={isEditMode}
        />
      </Box>

      {/* Content separator - 3D effect */}
      <Box
        sx={{
          position: "relative",
          height: 2,
          mx: 2,
          background: isDarkMode
            ? `linear-gradient(90deg, transparent, ${alpha(
                color.gray600,
                0.7
              )}, transparent)`
            : `linear-gradient(90deg, transparent, ${alpha(
                color.gray300,
                0.7
              )}, transparent)`,
          "&::before": {
            content: "''",
            position: "absolute",
            top: -1,
            left: "10%",
            right: "10%",
            height: 1,
            background: isDarkMode
              ? `linear-gradient(90deg, transparent, ${alpha(
                  color.gray500,
                  0.3
                )}, transparent)`
              : `linear-gradient(90deg, transparent, ${alpha(
                  color.white,
                  0.8
                )}, transparent)`,
          },
          "&::after": {
            content: "''",
            position: "absolute",
            bottom: -1,
            left: "10%",
            right: "10%",
            height: 1,
            background: isDarkMode
              ? `linear-gradient(90deg, transparent, ${alpha(
                  color.black,
                  0.3
                )}, transparent)`
              : `linear-gradient(90deg, transparent, ${alpha(
                  color.gray200,
                  0.5
                )}, transparent)`,
          },
        }}
      />

      <CardContent
        sx={{
          pt: 2.5,
          pb: hasMoreItems ? 0 : 2.5,
          px: isMobile ? 2 : 2.5,
        }}
      >
        {/* Group members count indicator */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1.5,
            opacity: 0.85,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDarkMode
                ? alpha(groupColor, 0.15)
                : alpha(groupColor, 0.08),
              color: groupColor,
              borderRadius: "50%",
              p: 0.7,
              mr: 1,
            }}
          >
            <Groups sx={{ fontSize: "0.95rem" }} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          >
            {item.members.length === 1
              ? "1 Member"
              : `${item.members.length} Members`}
          </Typography>
        </Box>

        {/* Members chips container */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.8,
            minHeight: expanded ? "auto" : isMobile ? "90px" : "80px",
            transition: "min-height 0.3s ease",
          }}
        >
          {displayedMembers.map((member, index) => (
            <Tooltip
              key={index}
              title={`Member: ${member}`}
              placement="top"
              arrow
            >
              <Chip
                label={member}
                size="small"
                sx={{
                  backgroundColor: isDarkMode
                    ? alpha(groupColor, 0.15)
                    : alpha(groupColor, 0.08),
                  color: isDarkMode ? groupColor : groupColor,
                  borderRadius: "16px",
                  mb: 1,
                  fontWeight: 500,
                  border: `1px solid ${
                    isDarkMode ? alpha(groupColor, 0.3) : alpha(groupColor, 0.2)
                  }`,
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    backgroundColor:
                      index === 0
                        ? alpha(groupColor, 0.9)
                        : isDarkMode
                        ? alpha(groupColor, 0.25)
                        : alpha(groupColor, 0.15),
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: `0 4px 8px ${
                      isDarkMode
                        ? alpha(color.black, 0.3)
                        : alpha(color.gray400, 0.2)
                    }`,
                  },
                  fontSize: isMobile ? "0.65rem" : "0.75rem",
                  height: isMobile ? 26 : 30,
                  px: 1,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                  "& .MuiChip-icon": {
                    ml: 0.5,
                    mr: -0.3,
                  },
                }}
              />
            </Tooltip>
          ))}

          {hasMoreItems && !expanded && (
            <Chip
              label={`+${remainingCount} more`}
              size="small"
              onClick={() => setExpanded(true)}
              sx={{
                backgroundColor: isDarkMode
                  ? alpha(color.gray700, 0.7)
                  : alpha(color.gray200, 0.8),
                color: isDarkMode ? color.gray300 : color.gray700,
                borderRadius: "16px",
                mb: 1,
                cursor: "pointer",
                fontSize: isMobile ? "0.65rem" : "0.75rem",
                height: isMobile ? 26 : 30,
                fontWeight: 600,
                border: `1px dashed ${
                  isDarkMode
                    ? alpha(color.gray600, 0.8)
                    : alpha(color.gray400, 0.3)
                }`,
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? alpha(groupColor, 0.15)
                    : alpha(groupColor, 0.08),
                  color: groupColor,
                  transform: "scale(1.05) translateY(-2px)",
                  border: `1px dashed ${
                    isDarkMode ? alpha(groupColor, 0.4) : alpha(groupColor, 0.3)
                  }`,
                  boxShadow: `0 4px 8px ${
                    isDarkMode
                      ? alpha(color.black, 0.25)
                      : alpha(color.gray400, 0.15)
                  }`,
                },
              }}
            />
          )}
        </Box>

        {/* Footer actions */}
        <Collapse in={hasMoreItems || isEditMode} sx={{ width: "100%" }}>
          <Divider
            sx={{
              my: 1,
              opacity: 0.5,
              backgroundColor: isDarkMode
                ? alpha(color.gray700, 0.5)
                : alpha(color.gray300, 0.5),
            }}
          />

          <Stack
            direction="row"
            justifyContent={
              hasMoreItems && isEditMode
                ? "space-between"
                : hasMoreItems
                ? "flex-start"
                : "flex-end"
            }
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {hasMoreItems && (
              <Button
                variant="text"
                size="small"
                onClick={() => setExpanded(!expanded)}
                startIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  mt: 0.5,
                  mb: 1,
                  color: isDarkMode ? color.teal400 : color.teal600,
                  fontSize: isMobile ? "0.7rem" : "0.75rem",
                  padding: "6px 12px",
                  minWidth: "auto",
                  borderRadius: "20px",
                  fontWeight: 600,
                  textTransform: "none",
                  letterSpacing: 0.3,
                  border: `1px solid ${
                    isDarkMode
                      ? alpha(color.teal500, 0.3)
                      : alpha(color.teal500, 0.2)
                  }`,
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? alpha(color.teal500, 0.15)
                      : alpha(color.teal500, 0.08),
                    color: isDarkMode ? color.teal300 : color.teal700,
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 8px ${
                      isDarkMode
                        ? alpha(color.black, 0.2)
                        : alpha(color.gray400, 0.15)
                    }`,
                  },
                }}
              >
                {expanded ? "Show less" : "Show all"}
              </Button>
            )}
            {isEditMode && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pt: 0.5,
                  pr: 0.5,
                  pb: 0,
                }}
              >
                <ActionButtons onEdit={onEdit} onDelete={onDelete} />
              </Box>
            )}
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}
