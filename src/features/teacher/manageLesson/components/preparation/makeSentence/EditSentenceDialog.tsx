import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Stack,
  FormGroup,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Add, Clear, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import React, { useState } from "react";
import { PreparationMakeSentences } from "interfaces";

interface EditSentenceDialogProps {
  isDialogOpen: boolean;
  editItem: PreparationMakeSentences | null;
  tempItem: PreparationMakeSentences;
  setTempItem: (item: PreparationMakeSentences) => void;
  handleCloseDialog: () => void;
  handleSaveItem: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditSentenceDialog({
  isDialogOpen,
  editItem,
  tempItem,
  setTempItem,
  handleCloseDialog,
  handleSaveItem,
  handleInputChange,
}: EditSentenceDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [newWord, setNewWord] = useState<string>("");

  const handleAddWord = () => {
    if (newWord.trim() === "") return;

    setTempItem({
      ...tempItem,
      sentences: [...tempItem.sentences, newWord.trim()],
    });

    setNewWord("");
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...tempItem.sentences];
    updatedMembers.splice(index, 1);

    setTempItem({
      ...tempItem,
      sentences: updatedMembers,
    });
  };

  const handleMoveWordUp = (index: number) => {
    if (index <= 0) return; // Không thể di chuyển lên nếu đã ở vị trí đầu tiên

    const updatedSentences = [...tempItem.sentences];
    // Hoán đổi vị trí hiện tại với vị trí trước đó
    [updatedSentences[index], updatedSentences[index - 1]] = [
      updatedSentences[index - 1],
      updatedSentences[index],
    ];

    setTempItem({
      ...tempItem,
      sentences: updatedSentences,
    });
  };

  const handleMoveWordDown = (index: number) => {
    if (index >= tempItem.sentences.length - 1) return; // Không thể di chuyển xuống nếu đã ở vị trí cuối cùng

    const updatedSentences = [...tempItem.sentences];
    // Hoán đổi vị trí hiện tại với vị trí sau đó
    [updatedSentences[index], updatedSentences[index + 1]] = [
      updatedSentences[index + 1],
      updatedSentences[index],
    ];

    setTempItem({
      ...tempItem,
      sentences: updatedSentences,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddWord();
    }
  };

  return (
    <WEDialog
      open={isDialogOpen}
      title={editItem ? "Edit Make Sentence" : "Add New Sentence"}
      onCancel={handleCloseDialog}
      onOk={handleSaveItem}
    >
      <Box sx={{ mt: 2 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                name="status"
                value={tempItem.status}
                checked={tempItem.status}
                onChange={handleInputChange}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: isDarkMode ? color.teal300 : color.teal600,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: isDarkMode ? color.teal300 : color.teal600,
                  },
                }}
              />
            }
            label="Active"
          />
        </FormGroup>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: isDarkMode ? color.gray100 : color.gray800,
          }}
        >
          Sentence preview
        </Typography>
        <Box
          sx={{
            mb: 2,
            bgcolor: isDarkMode ? color.gray700 : color.gray100,
            p: 2,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="body1">
            {tempItem.sentences.join(" ")}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: isDarkMode ? color.gray100 : color.gray800,
          }}
        >
          Words
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <WETextField
              label="Add New Member"
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddWord}
              sx={{
                ml: 1,
                backgroundColor: isDarkMode ? color.teal500 : color.teal600,
                color: color.white,
                "&:hover": {
                  backgroundColor: isDarkMode ? color.teal600 : color.teal700,
                },
                height: 56,
              }}
            >
              <Add />
            </Button>
          </Box>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            borderRadius: 2,
          }}
        >
          {tempItem.sentences.length > 0 ? (
            <Stack spacing={1}>
              {tempItem.sentences.map((word, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: isDarkMode ? color.gray700 : color.white,
                    border: `1px solid ${
                      isDarkMode ? color.gray600 : color.gray300
                    }`,
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      color: isDarkMode ? color.gray100 : color.gray800,
                    }}
                  >
                    {word}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleMoveWordUp(index)}
                      disabled={index === 0}
                      sx={{
                        color:
                          index === 0
                            ? isDarkMode
                              ? color.gray500
                              : color.gray400
                            : isDarkMode
                            ? color.emerald400
                            : color.emerald500,
                        "&:hover": {
                          backgroundColor:
                            index === 0
                              ? "transparent"
                              : isDarkMode
                              ? "rgba(66, 153, 225, 0.1)"
                              : "rgba(66, 153, 225, 0.1)",
                        },
                        opacity: index === 0 ? 0.5 : 1,
                      }}
                    >
                      <ArrowUpward fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMoveWordDown(index)}
                      disabled={index === tempItem.sentences.length - 1}
                      sx={{
                        color:
                          index === tempItem.sentences.length - 1
                            ? isDarkMode
                              ? color.gray500
                              : color.gray400
                            : isDarkMode
                            ? color.emerald400
                            : color.emerald500,
                        "&:hover": {
                          backgroundColor:
                            index === tempItem.sentences.length - 1
                              ? "transparent"
                              : isDarkMode
                              ? "rgba(66, 153, 225, 0.1)"
                              : "rgba(66, 153, 225, 0.1)",
                        },
                        opacity:
                          index === tempItem.sentences.length - 1 ? 0.5 : 1,
                      }}
                    >
                      <ArrowDownward fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveMember(index)}
                      sx={{
                        color: isDarkMode ? color.red400 : color.red500,
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? "rgba(240, 82, 82, 0.1)"
                            : "rgba(240, 82, 82, 0.1)",
                        },
                      }}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography
              align="center"
              sx={{
                py: 2,
                color: isDarkMode ? color.gray400 : color.gray500,
                fontStyle: "italic",
              }}
            >
              No words added yet
            </Typography>
          )}
        </Paper>
      </Box>
    </WEDialog>
  );
}
