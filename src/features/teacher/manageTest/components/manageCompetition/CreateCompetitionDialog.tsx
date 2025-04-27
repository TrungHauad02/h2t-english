import React from "react";
import { Stack } from "@mui/material";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface CreateCompetitionDialogProps {
  isOpenCreateDialog: boolean;
  handleOpenCreateDialog: () => void;
  data: Partial<CompetitionTest>;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDuration: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTotalQuestions: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartTime: (date: Date | null) => void;
  onChangeEndTime: (date: Date | null) => void;
  onCreateCompetition: () => void;
}

export default function CreateCompetitionDialog({
  isOpenCreateDialog,
  handleOpenCreateDialog,
  data,
  onChangeTitle,
  onChangeDuration,
  onChangeStartTime,
  onChangeEndTime,
  onCreateCompetition,
}: CreateCompetitionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getInputBackground = () => {
    return isDarkMode ? color.gray800 : color.white;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <WEDialog
        title="Create Competition"
        open={isOpenCreateDialog}
        onCancel={handleOpenCreateDialog}
        onOk={onCreateCompetition}
      >
        <Stack spacing={2}>
          <WETextField
            label="Title"
            value={data.title || ""}
            onChange={onChangeTitle}
            type="text"
            required
          />
          <WETextField
            label="Duration (minutes)"
            value={data.duration || ""}
            onChange={onChangeDuration}
            type="number"
            required
          />
          
          <DateTimePicker
            label="Start Time"
            value={data.startTime || null}
            onChange={onChangeStartTime}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                required: true,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: getInputBackground(),
                  },
                },
              },
            }}
          />
          
          <DateTimePicker
            label="End Time"
            value={data.endTime || null}
            onChange={onChangeEndTime}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                required: true,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: getInputBackground(),
                  },
                },
              },
            }}
          />
        </Stack>
      </WEDialog>
    </LocalizationProvider>
  );
}