import { Box, Button, Chip, Divider, Card, CardContent } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useState } from "react";
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

  const [expanded, setExpanded] = useState(false);

  const visibleItemsCount = 5;
  const hasMoreItems = item.members.length > visibleItemsCount;
  const displayedMembers = expanded
    ? item.members
    : item.members.slice(0, visibleItemsCount);
  const remainingCount = item.members.length - visibleItemsCount;

  const firstLetter = item.groupName.charAt(0).toUpperCase();

  const getGroupColor = (name: string) => {
    const colors = [
      color.teal500,
      color.emerald500,
      color.green500,
      color.teal400,
      color.teal600,
      color.emerald400,
      color.emerald600,
      color.green400,
      color.green600,
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const groupColor = getGroupColor(item.groupName);

  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.white,
        borderRadius: 2,
        position: "relative",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >
      {isEditMode && <ActionButtons onEdit={onEdit} onDelete={onDelete} />}

      <ClassifyCardHeader
        firstLetter={firstLetter}
        groupColor={groupColor}
        item={item}
        isEditMode={isEditMode}
      />

      <Divider
        sx={{
          mx: 2,
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
        }}
      />

      <CardContent>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {/* Display the first 5 members */}
          {displayedMembers.map((member, index) => (
            <Chip
              key={index}
              label={member}
              size="small"
              sx={{
                backgroundColor: isDarkMode
                  ? `${groupColor}33`
                  : `${groupColor}15`,
                color: isDarkMode ? groupColor : groupColor,
                borderRadius: "16px",
                mb: 1,
                fontWeight: "medium",
                border: `1px solid ${
                  isDarkMode ? `${groupColor}66` : `${groupColor}33`
                }`,
              }}
            />
          ))}

          {/* Display "show more" chip if there are more members */}
          {hasMoreItems && !expanded && (
            <Chip
              label={`+${remainingCount} more`}
              size="small"
              onClick={() => setExpanded(true)}
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode ? color.gray300 : color.gray700,
                borderRadius: "16px",
                mb: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray300,
                },
              }}
            />
          )}
        </Box>

        {/* Show "show less" button if there are more members */}
        {hasMoreItems && (
          <Button
            variant="text"
            size="small"
            onClick={() => setExpanded(!expanded)}
            startIcon={expanded ? <ExpandLess /> : <ExpandMore />}
            sx={{
              mt: 1,
              color: isDarkMode ? color.teal400 : color.teal600,
              fontSize: "0.75rem",
              padding: "0",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: color.transparent,
                textDecoration: "underline",
              },
            }}
          >
            {expanded ? "Show less" : "Show all"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
