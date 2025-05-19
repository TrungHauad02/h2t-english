import React from "react";
import { Stack } from "@mui/material";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";
import WEDateTimeField from "components/input/WEDateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CompetitionTest } from "interfaces";

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
          
      <WEDateTimeField
        label="Start Time"
        value={new Date(data.startTime || new Date())}
        onChange={onChangeStartTime}
        name="startTime"
        required={true}
        placeholder="Select start time"
        sx={{
          width: "100%",
        }}
      />

      <WEDateTimeField
        label="End Time"
        value={new Date(data.endTime || new Date())}
        onChange={onChangeEndTime}
        name="endTime"
        required={true}
        placeholder="Select end time"
        sx={{
          width: "100%",
        }}
      />
        </Stack>
      </WEDialog>
    </LocalizationProvider>
  );
}