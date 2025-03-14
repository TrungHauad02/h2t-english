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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { PreparationMatchWordSentences } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WordSentenceTableProps {
  data: PreparationMatchWordSentences[];
  isEditMode: boolean;
  onEdit: (item: PreparationMatchWordSentences) => void;
  onDelete: (id: number) => void;
}

export default function WordSentenceTable({
  data,
  isEditMode,
  onEdit,
  onDelete,
}: WordSentenceTableProps) {
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
              Word
            </TableCell>
            <TableCell
              sx={{
                color: isDarkMode ? color.gray100 : color.gray900,
                fontWeight: "bold",
              }}
            >
              Sentence
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
                {item.word}
              </TableCell>
              <TableCell
                sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
              >
                {item.sentence}
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
