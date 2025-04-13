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
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

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
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useAddNodeDialog({ data, setData, newLesson, setNewLesson });

  return (
    <WEDialog
      title="Add New Lesson / Test"
      open={open}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Stack
        spacing={2}
        sx={{
          p: 2,
          width: "100%",
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          borderRadius: 2,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-start"
          sx={{
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            borderRadius: 1,
            p: 2,
          }}
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
            <Stack
              sx={{
                width: "100%",
                mt: 2,
                borderTop: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray300
                }`,
                pt: 2,
              }}
            >
              <NodeTypeSelect
                value={data.type || ""}
                onChange={hooks.handleTypeChange}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            borderRadius: 1,
            p: 2,
          }}
        >
          <WETextField
            label="Title"
            type="text"
            value={newLesson.title || ""}
            onChange={hooks.handleChange}
            name="title"
            required
            placeholder="Enter node title"
          />
          <WETextField
            label="Description"
            type="text"
            value={newLesson.description || ""}
            onChange={hooks.handleChange}
            name="description"
            required
            placeholder="Enter node description"
          />
        </Stack>

        {/* Conditional Rendering Based on Node Type */}
        {!hooks.isTestNode && (
          <Stack
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
            }}
          >
            <WESelectImage
              required
              label="Node Image"
              value={data.image || ""}
              onChange={hooks.handleImageChange}
            />
          </Stack>
        )}

        {/* Specific Fields for Different Node Types */}
        {data.type === RouteNodeEnum.GRAMMAR && (
          <Stack
            spacing={2}
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
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
          </Stack>
        )}

        {data.type === RouteNodeEnum.READING && (
          <Stack
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
            <WEDocxInput
              label="Reading File"
              value={(newLesson as Reading).file}
              onChange={hooks.handleFileChange}
              required
            />
          </Stack>
        )}

        {data.type === RouteNodeEnum.LISTENING && (
          <Stack
            direction="column"
            spacing={2}
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
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

            <WETextField
              label="Transcript"
              type="text"
              value={(newLesson as Listening).transcript}
              onChange={hooks.handleChange}
              name="transcript"
              required
              placeholder="Enter listening transcript"
            />
          </Stack>
        )}

        {data.type === RouteNodeEnum.WRITING && (
          <Stack
            spacing={2}
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
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
          </Stack>
        )}

        {data.type === RouteNodeEnum.SPEAKING && (
          <Stack
            spacing={2}
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
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
          </Stack>
        )}

        {hooks.isTestNode && (
          <Stack
            sx={{
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              borderRadius: 1,
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }}
          >
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
            />
          </Stack>
        )}
      </Stack>
    </WEDialog>
  );
}
