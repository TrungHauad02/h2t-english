import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  IconButton,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import {
  Edit,
  Delete,
  ExpandMore,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { PreparationMakeSentences } from "interfaces";

interface SentenceMobileViewProps {
  data: PreparationMakeSentences[];
  isEditMode: boolean;
  onEdit: (item: PreparationMakeSentences) => void;
  onDelete: (id: number) => void;
}

export default function SentenceMobileView({
  data,
  isEditMode,
  onEdit,
  onDelete,
}: SentenceMobileViewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack spacing={1.5}>
      {data.map((item) => (
        <Accordion
          key={item.id}
          sx={{
            backgroundColor: isDarkMode ? color.gray700 : color.white,
            borderRadius: "12px !important",
            overflow: "hidden",
            border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
            "&:before": {
              display: "none", // Remove the default divider
            },
            boxShadow: 2,
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMore
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            sx={{
              backgroundColor: isDarkMode
                ? `rgba(${parseInt(color.teal800.slice(1, 3), 16)}, ${parseInt(
                    color.teal800.slice(3, 5),
                    16
                  )}, ${parseInt(color.teal800.slice(5, 7), 16)}, 0.3)`
                : `rgba(${parseInt(color.teal50.slice(1, 3), 16)}, ${parseInt(
                    color.teal50.slice(3, 5),
                    16
                  )}, ${parseInt(color.teal50.slice(5, 7), 16)}, 0.7)`,
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                pr: 2,
              }}
            >
              <Typography
                sx={{
                  color: isDarkMode ? color.white : color.gray900,
                  fontWeight: "bold",
                  flexGrow: 1,
                  mr: 1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {item.sentences.join(" ")}
              </Typography>

              <Chip
                icon={
                  item.status ? (
                    <CheckCircle fontSize="small" />
                  ) : (
                    <Cancel fontSize="small" />
                  )
                }
                label={item.status ? "Active" : "Inactive"}
                size="small"
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
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                  minWidth: "90px",
                }}
              />
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? color.gray700 : color.white,
            }}
          >
            <Box display="flex" flexWrap="wrap" gap={1} mb={isEditMode ? 2 : 0}>
              {item.sentences.map((word, index) => (
                <Chip
                  key={index}
                  label={word}
                  sx={{
                    color: isDarkMode ? color.gray100 : color.gray900,
                    bgcolor: isDarkMode ? color.gray600 : color.gray200,
                    boxShadow: 1,
                    "&:hover": {
                      bgcolor: isDarkMode ? color.teal700 : color.teal100,
                    },
                  }}
                />
              ))}
            </Box>

            {isEditMode && (
              <>
                <Divider
                  sx={{
                    my: 2,
                    bgcolor: isDarkMode ? color.gray600 : color.gray200,
                  }}
                />

                <Box display="flex" justifyContent="flex-end">
                  <IconButton
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

                  <IconButton
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
                </Box>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
