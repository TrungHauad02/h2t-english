import React from "react";
import { Stack, FormGroup, FormControlLabel, Switch, Box } from "@mui/material";
import { WEAudioInput, WETextField } from "components/input";
import { WEDialog } from "components/display";
import StyledCard from "../../StyledCard";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface EditExerciseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  isNewItem: boolean;
  selectedItem: {
    id?: number;
    audio: string;
    serial: number;
    sentence: string;
    missingIndex: number;
    correctAnswer: string;
    status: boolean; // Thêm status vào selectedItem
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAudioChange: (base64: string) => void;
}

export default function EditExerciseDialog({
  open,
  onClose,
  onSave,
  isNewItem,
  selectedItem,
  onInputChange,
  onAudioChange,
}: EditExerciseDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
  };

  const isFormValid =
    selectedItem.sentence && selectedItem.correctAnswer && selectedItem.audio;

  // Hàm xử lý thay đổi trạng thái của Switch
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked;
    onInputChange({
      target: { name: "status", value: newStatus },
    } as any);
  };

  return (
    <WEDialog
      open={open}
      title={isNewItem ? "Add New Exercise" : "Edit Exercise"}
      onCancel={handleCancel}
      onOk={isFormValid ? handleSave : () => null}
      sx={{ maxWidth: "md", width: "100%" }}
    >
      <Stack spacing={3} sx={{ mt: 1 }}>
        {/* Thêm Switch để chỉnh sửa status */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={selectedItem.status}
                  onChange={handleStatusChange}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: accentColor,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: accentColor,
                    },
                  }}
                />
              }
              label="Active"
            />
          </FormGroup>
        </Box>
        <StyledCard>
          <WETextField
            name="serial"
            label="Serial Number"
            type="number"
            value={selectedItem.serial}
            onChange={onInputChange}
            placeholder="Enter serial number"
            required
            sx={{ maxWidth: "100%" }}
            disabled
          />
        </StyledCard>

        <StyledCard>
          <WETextField
            name="sentence"
            label="Sentence"
            type="text"
            value={selectedItem.sentence}
            onChange={onInputChange}
            placeholder="Write sentence without the missing word"
            required
            sx={{ maxWidth: "100%" }}
          />
        </StyledCard>

        <StyledCard>
          <WETextField
            name="missingIndex"
            label="Missing Word Index (0-based)"
            type="number"
            value={selectedItem.missingIndex}
            onChange={onInputChange}
            placeholder="Position where the missing word should be inserted (starting from 0)"
            required
            sx={{ maxWidth: "100%" }}
          />
        </StyledCard>

        <StyledCard>
          <WETextField
            name="correctAnswer"
            label="Correct Answer"
            type="text"
            value={selectedItem.correctAnswer}
            onChange={onInputChange}
            placeholder="The word that should be inserted at the missing index"
            required
            sx={{ maxWidth: "100%" }}
          />
        </StyledCard>

        <StyledCard>
          <WEAudioInput
            value={selectedItem.audio}
            onChange={onAudioChange}
            label="Audio File"
            required
          />
        </StyledCard>
      </Stack>
    </WEDialog>
  );
}
