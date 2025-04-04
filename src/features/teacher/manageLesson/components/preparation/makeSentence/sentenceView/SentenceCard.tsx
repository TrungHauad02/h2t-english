import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Divider,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { PreparationMakeSentences } from "interfaces";

interface SentenceCardProps {
  item: PreparationMakeSentences;
  isEditMode: boolean;
  onEdit: (item: PreparationMakeSentences) => void;
  onDelete: (id: number) => void;
}

export default function SentenceCard({
  item,
  isEditMode,
  onEdit,
  onDelete,
}: SentenceCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray700 : color.white,
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
          borderColor: isDarkMode ? color.teal600 : color.teal300,
        },
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              fontWeight: "bold",
              maxWidth: "70%",
            }}
          >
            {item.sentences.join(" ")}
          </Typography>

          <Box display="flex" alignItems="center">
            <Chip
              icon={
                item.status ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <Cancel fontSize="small" />
                )
              }
              label={item.status ? "Active" : "Inactive"}
              sx={{
                color: isDarkMode ? color.gray50 : color.white,
                bgcolor: item.status
                  ? isDarkMode
                    ? color.emerald600
                    : color.emerald500
                  : isDarkMode
                  ? color.red700
                  : color.red500,
                fontWeight: "medium",
                height: "28px",
                "& .MuiChip-icon": {
                  color: "inherit",
                },
              }}
              size="small"
            />

            {isEditMode && (
              <Box ml={1}>
                <Tooltip
                  title="Edit"
                  arrow
                  TransitionComponent={Zoom}
                  placement="top"
                >
                  <IconButton
                    size="small"
                    onClick={() => onEdit(item)}
                    sx={{
                      color: isDarkMode ? color.edit : color.edit,
                      bgcolor: isDarkMode ? color.gray800 : color.gray100,
                      mr: 1,
                      "&:hover": {
                        bgcolor: isDarkMode ? color.gray600 : color.gray200,
                      },
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title="Delete"
                  arrow
                  TransitionComponent={Zoom}
                  placement="top"
                >
                  <IconButton
                    size="small"
                    onClick={() => onDelete(item.id)}
                    sx={{
                      color: color.delete,
                      bgcolor: isDarkMode ? color.gray800 : color.gray100,
                      "&:hover": {
                        bgcolor: isDarkMode
                          ? "rgba(255,102,85,0.2)"
                          : "rgba(255,102,85,0.1)",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>

        <Divider
          sx={{
            my: 2,
            bgcolor: isDarkMode ? color.gray600 : color.gray200,
          }}
        />

        <Box display="flex" flexWrap="wrap" gap={1}>
          {item.sentences.map((word, index) => (
            <Chip
              key={index}
              label={word}
              sx={{
                color: isDarkMode ? color.gray100 : color.gray900,
                bgcolor: isDarkMode ? color.gray600 : color.gray200,
                boxShadow: 1,
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: isDarkMode ? color.teal800 : color.teal100,
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
