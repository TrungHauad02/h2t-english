import React, { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";
import {
  WETextField,
  WESelectImage,
  WEDocxInput,
  WEAudioInputVer2,
} from "components/input";
import {
  Grammar,
  Listening,
  Reading,
  RouteNode,
  RouteNodeEnum,
  Speaking,
  Test,
  Topic,
  Writing,
} from "interfaces";
import { WEDialog } from "components/display";
import {
  GrammarFields,
  NodeTypeSelect,
  useAddNodeDialog,
  WritingFields,
} from "./addNode";

interface AddNodeDialogProps {
  open: boolean;
  data: RouteNode;
  newLesson: Topic | Grammar | Listening | Reading | Speaking | Writing | Test;
  setNewLesson: Dispatch<
    SetStateAction<
      Topic | Grammar | Listening | Reading | Speaking | Writing | Test
    >
  >;
  onCancel: () => void;
  onOk: () => void;
  setData: (data: RouteNode) => void;
}

export default function AddNodeDialog({
  open,
  data,
  newLesson,
  setNewLesson,
  onCancel,
  onOk,
  setData,
}: AddNodeDialogProps) {
  const hooks = useAddNodeDialog({ data, setData });

  return (
    <WEDialog
      title="Add New Lesson / Test"
      open={open}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Stack spacing={2} sx={{ p: 2, width: "100%" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-start"
        >
          <Stack sx={{ width: "100%" }}>
            <WETextField
              label="Serial Number"
              type="number"
              value={data.serial}
              onChange={hooks.handleChange}
              name="serial"
              required
              disabled
            />
            <Stack sx={{ width: "100%" }}>
              <NodeTypeSelect
                value={data.type || ""}
                onChange={hooks.handleTypeChange}
              />
            </Stack>
          </Stack>
        </Stack>
        <WETextField
          label="Title"
          type="text"
          value={data.title || ""}
          onChange={hooks.handleChange}
          name="title"
          required
          placeholder="Enter node title"
        />
        <WETextField
          label="Description"
          type="text"
          value={data.description || ""}
          onChange={hooks.handleChange}
          name="description"
          required
          placeholder="Enter node description"
          sx={{ mb: 2 }}
        />

        {/* Conditional Rendering Based on Node Type */}
        {!hooks.isTestNode && (
          <WESelectImage
            required
            label="Node Image"
            value={data.image || ""}
            onChange={hooks.handleImageChange}
            sx={{ mb: 2 }}
          />
        )}

        {/* Specific Fields for Different Node Types */}
        {data.type === RouteNodeEnum.GRAMMAR && (
          <GrammarFields
            newLesson={newLesson as Grammar}
            tips={hooks.tips}
            setNewLesson={
              setNewLesson as React.Dispatch<React.SetStateAction<Grammar>>
            }
            handleTipChange={hooks.handleTipChange}
            addTip={hooks.addTip}
            removeTip={hooks.removeTip}
            handleFileChange={hooks.handleFileChange}
          />
        )}

        {/* Add similar sections for other node types */}
        {/* Reading, Listening, Writing nodes will have specific fields */}
        {data.type === RouteNodeEnum.READING && (
          <WEDocxInput
            label="Reading File"
            value={(newLesson as Reading).file}
            onChange={hooks.handleFileChange}
            required
          />
        )}

        {data.type === RouteNodeEnum.LISTENING && (
          <WEAudioInputVer2
            label="Listening Audio"
            value={(newLesson as Listening).audio}
            onChange={(base64) =>
              setNewLesson((prev) => ({
                ...(prev as Listening),
                audio: base64,
              }))
            }
            accept=".mp3,.wav"
            required
          />
        )}

        {data.type === RouteNodeEnum.WRITING && (
          <WritingFields
            newLesson={newLesson as Writing}
            tips={hooks.tips}
            setNewLesson={
              setNewLesson as React.Dispatch<React.SetStateAction<Writing>>
            }
            handleTipChange={hooks.handleTipChange}
            addTip={hooks.addTip}
            removeTip={hooks.removeTip}
            handleFileChange={hooks.handleFileChange}
          />
        )}

        {data.type === RouteNodeEnum.SPEAKING && (
          <>
            <WETextField
              label="Speaking Topic"
              type="text"
              value={(newLesson as Speaking).topic}
              onChange={(e) =>
                setNewLesson((prev) => ({
                  ...(prev as Speaking),
                  topic: e.target.value,
                }))
              }
              name="topic"
              required
              placeholder="Enter speaking topic"
              sx={{ mb: 2 }}
            />
            <WETextField
              label="Duration (minutes)"
              type="number"
              value={(newLesson as Speaking).duration}
              onChange={(e) =>
                setNewLesson((prev) => ({
                  ...(prev as Speaking),
                  duration: Number(e.target.value),
                }))
              }
              name="duration"
              required
              placeholder="Enter speaking duration"
            />
          </>
        )}

        {hooks.isTestNode && (
          <>
            <WETextField
              label="Test Duration (minutes)"
              type="number"
              value={(newLesson as Test).duration}
              onChange={(e) =>
                setNewLesson((prev) => ({
                  ...(prev as Test),
                  duration: Number(e.target.value),
                }))
              }
              name="duration"
              required
              placeholder="Enter test duration"
              sx={{ mb: 2 }}
            />
          </>
        )}
      </Stack>
    </WEDialog>
  );
}
