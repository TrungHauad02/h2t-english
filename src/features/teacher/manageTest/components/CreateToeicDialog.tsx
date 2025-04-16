import React from "react";
import { Stack } from "@mui/material";
import { WEDialog } from "components/display";
import { WETextField } from "components/input";
import { Toeic } from "interfaces";

interface CreateToeicDialogProps {
  isOpenCreateDialog: boolean;
  handleOpenCreateDialog: () => void;
  data: Partial<Toeic>;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDuration: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateToeic: () => void;
}

export default function CreateToeicDialog({
  isOpenCreateDialog,
  handleOpenCreateDialog,
  data,
  onChangeTitle,
  onChangeDuration,
  onCreateToeic,
}: CreateToeicDialogProps) {
  return (
    <WEDialog
      title="Create TOEIC Test"
      open={isOpenCreateDialog}
      onCancel={handleOpenCreateDialog}
      onOk={onCreateToeic}
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
      </Stack>
    </WEDialog>
  );
}