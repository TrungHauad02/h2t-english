import React from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { BaseFilter } from "interfaces";
import { convertToDate } from "utils/convert";
import { WEDialog } from "components/display";

interface WEAdvanceFilterProps {
  filter: BaseFilter;
  updateFilter: (updates: Partial<BaseFilter>) => void;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}

export default function WEAdvanceFilter({
  filter,
  updateFilter,
  open,
  onClose,
  onApply,
}: WEAdvanceFilterProps) {
  return (
    <WEDialog
      title="Advanced Filters"
      open={open}
      onCancel={onClose}
      onOk={() => {
        onClose();
        onApply();
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Created At</Typography>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            filter.startCreatedAt
              ? filter.startCreatedAt.toISOString().slice(0, 10)
              : ""
          }
          onChange={(e) => {
            const dateString = e.target.value;
            updateFilter({
              startCreatedAt: convertToDate(dateString),
            });
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            filter.endCreatedAt
              ? filter.endCreatedAt.toISOString().slice(0, 10)
              : ""
          }
          onChange={(e) => {
            const dateString = e.target.value;
            updateFilter({
              endCreatedAt: convertToDate(dateString),
            });
          }}
          fullWidth
          margin="normal"
        />

        <Typography variant="h6">Updated At</Typography>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            filter.startUpdatedAt
              ? filter.startUpdatedAt.toISOString().slice(0, 10)
              : ""
          }
          onChange={(e) => {
            const dateString = e.target.value;
            updateFilter({
              startUpdatedAt: convertToDate(dateString),
            });
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={
            filter.endUpdatedAt
              ? filter.endUpdatedAt.toISOString().slice(0, 10)
              : ""
          }
          onChange={(e) => {
            const dateString = e.target.value;
            updateFilter({
              endUpdatedAt: convertToDate(dateString),
            });
          }}
          fullWidth
          margin="normal"
        />
      </Stack>
    </WEDialog>
  );
}
