import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { PreparationMakeSentences } from "interfaces";

interface SentenceViewProps {
  data: PreparationMakeSentences[];
  isEditMode: boolean;
  onEdit: (item: PreparationMakeSentences) => void;
  onDelete: (id: number) => void;
}

export default function SentenceView({
  data,
  isEditMode,
  onEdit,
  onDelete,
}: SentenceViewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: isDarkMode ? color.gray700 : color.gray50,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: isDarkMode ? color.gray600 : color.gray200,
            }}
          >
            <TableCell
              sx={{
                color: isDarkMode ? color.gray100 : color.gray900,
                fontWeight: "bold",
              }}
            >
              Sentence
            </TableCell>
            <TableCell
              sx={{
                color: isDarkMode ? color.gray100 : color.gray900,
                fontWeight: "bold",
              }}
            >
              Words
            </TableCell>
            <TableCell
              sx={{
                color: isDarkMode ? color.gray100 : color.gray900,
                fontWeight: "bold",
              }}
            >
              Status
            </TableCell>
            {isEditMode && (
              <TableCell
                align="right"
                sx={{
                  color: isDarkMode ? color.gray100 : color.gray900,
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: isDarkMode ? color.white : color.black,
                  fontWeight: "bold",
                }}
              >
                {item.sentences.join(" ")}
              </TableCell>
              <TableCell
                sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
              >
                {item.sentences.map((word, index) => (
                  <Chip
                    key={index}
                    label={word}
                    sx={{
                      mr: 1,
                      boxShadow: 1,
                      color: isDarkMode ? color.gray100 : color.gray900,
                      bgcolor: isDarkMode ? color.gray500 : color.gray200,
                    }}
                  />
                ))}
              </TableCell>
              <TableCell>
                <Chip
                  label={item.status ? "Active" : "Inactive"}
                  sx={{
                    color: isDarkMode ? color.white : color.white,
                    bgcolor: item.status
                      ? color.emerald500
                      : isDarkMode
                      ? color.gray600
                      : color.gray500,
                    fontWeight: "medium",
                  }}
                  size="small"
                />
              </TableCell>
              {isEditMode && (
                <TableCell align="right">
                  <IconButton
                    onClick={() => onEdit(item)}
                    sx={{
                      color: isDarkMode ? color.emerald400 : color.emerald600,
                      mr: 1,
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(item.id)}
                    sx={{ color: color.delete }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
