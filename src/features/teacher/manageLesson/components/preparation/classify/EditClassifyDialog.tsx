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
import { Add, Clear } from "@mui/icons-material";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { PreparationClassify } from "interfaces";
import React, { useState } from "react";

interface EditClassifyDialogProps {
  isDialogOpen: boolean;
  editItem: PreparationClassify | null;
  tempItem: PreparationClassify;
  setTempItem: (item: PreparationClassify) => void;
  handleCloseDialog: () => void;
  handleSaveItem: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditClassifyDialog({
  isDialogOpen,
  editItem,
  tempItem,
  setTempItem,
  handleCloseDialog,
  handleSaveItem,
  handleInputChange,
}: EditClassifyDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [newMember, setNewMember] = useState("");

  const handleAddMember = () => {
    if (newMember.trim() === "") return;

    setTempItem({
      ...tempItem,
      members: [...tempItem.members, newMember.trim()],
    });

    setNewMember("");
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...tempItem.members];
    updatedMembers.splice(index, 1);

    setTempItem({
      ...tempItem,
      members: updatedMembers,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddMember();
    }
  };

  return (
    <WEDialog
      open={isDialogOpen}
      title={
        editItem ? "Edit Classification Group" : "Add New Classification Group"
      }
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
        <WETextField
          label="Group Name"
          type="text"
          name="groupName"
          value={tempItem.groupName || ""}
          onChange={handleInputChange}
          required
          sx={{ mb: 3 }}
        />

        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: isDarkMode ? color.gray100 : color.gray800,
          }}
        >
          Members
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <WETextField
              label="Add New Member"
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddMember}
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
          {tempItem.members.length > 0 ? (
            <Stack spacing={1}>
              {tempItem.members.map((member, index) => (
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
                    {member}
                  </Typography>
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
              No members added yet
            </Typography>
          )}
        </Paper>
      </Box>
    </WEDialog>
  );
}
