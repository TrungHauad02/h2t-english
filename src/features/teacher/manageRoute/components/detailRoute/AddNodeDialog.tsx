import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, TextField, IconButton } from "@mui/material";
import {
  WETextField,
  WESelect,
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
  TestTypeEnum,
  Writing,
} from "interfaces";
import { WEDialog } from "components/display";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { base64DocxToBlobUrl, base64ToBlobUrl } from "utils/convert";

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
  const [isTestNode, setIsTestNode] = useState<boolean>(false);
  const [tips, setTips] = useState<string[]>(
    (newLesson as Grammar)?.tips || []
  );

  useEffect(() => {
    const isTest =
      data.type === RouteNodeEnum.MIXING_TEST ||
      data.type === RouteNodeEnum.READING_TEST ||
      data.type === RouteNodeEnum.LISTENING_TEST ||
      data.type === RouteNodeEnum.SPEAKING_TEST ||
      data.type === RouteNodeEnum.WRITING_TEST;

    setIsTestNode(isTest);

    // Reset newLesson based on node type
    switch (data.type) {
      case RouteNodeEnum.GRAMMAR:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          routeNodeId: data.id,
          status: false,
          views: 0,
          definition: "",
          example: "",
          tips: [],
          file: "",
          questions: [],
          image: "",
        } as Grammar);
        break;
      case RouteNodeEnum.READING:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          routeNodeId: data.id,
          status: false,
          views: 0,
          file: "",
          questions: [],
          image: "",
        } as Reading);
        break;
      case RouteNodeEnum.LISTENING:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          routeNodeId: data.id,
          status: false,
          views: 0,
          audio: "",
          questions: [],
          image: "",
        } as Listening);
        break;
      case RouteNodeEnum.WRITING:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          routeNodeId: data.id,
          status: false,
          views: 0,
          topic: "",
          file: "",
          tips: [],
          paragraphs: "",
          questions: [],
          image: "",
        } as Writing);
        break;
      case RouteNodeEnum.SPEAKING:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          routeNodeId: data.id,
          status: false,
          views: 0,
          topic: "",
          duration: 0,
          image: "",
        } as Speaking);
        break;
      case RouteNodeEnum.MIXING_TEST:
      case RouteNodeEnum.READING_TEST:
      case RouteNodeEnum.LISTENING_TEST:
      case RouteNodeEnum.SPEAKING_TEST:
      case RouteNodeEnum.WRITING_TEST:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          type: isTest
            ? data.type === RouteNodeEnum.MIXING_TEST
              ? TestTypeEnum.MIXING
              : data.type === RouteNodeEnum.READING_TEST
              ? TestTypeEnum.READING
              : data.type === RouteNodeEnum.LISTENING_TEST
              ? TestTypeEnum.LISTENING
              : data.type === RouteNodeEnum.SPEAKING_TEST
              ? TestTypeEnum.SPEAKING
              : TestTypeEnum.WRITING
            : TestTypeEnum.MIXING,
          duration: 0,
          routeNodeId: data.id,
          status: false,
          parts: [],
          totalQuestions: 0,
          scoreLastOfTest: null,
        } as Test);
        break;
      default:
        setNewLesson({
          id: -1,
          title: data.title || "",
          description: data.description || "",
          routeNodeId: data.id,
          status: false,
          views: 0,
          questions: [],
          image: "",
        } as Topic);
    }
  }, [data.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Update newLesson
    setNewLesson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (value: string | number) => {
    setData({ ...data, type: value as RouteNodeEnum });
  };

  const handleImageChange = (base64: string) => {
    setData({ ...data, image: base64ToBlobUrl(base64) });
    setNewLesson((prev) => ({ ...prev, image: base64ToBlobUrl(base64) }));
  };

  const handleFileChange = (base64: string) => {
    setNewLesson((prev) => {
      if ("file" in prev) {
        return { ...prev, file: base64DocxToBlobUrl(base64) };
      }
      return prev;
    });
  };

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...tips];
    newTips[index] = value;
    setTips(newTips);

    // Update newLesson for Grammar or Writing
    setNewLesson((prev) => {
      if ("tips" in prev) {
        return { ...prev, tips: newTips };
      }
      return prev;
    });
  };

  const addTip = () => {
    const newTips = [...tips, ""];
    setTips(newTips);

    // Update newLesson for Grammar or Writing
    setNewLesson((prev) => {
      if ("tips" in prev) {
        return { ...prev, tips: newTips };
      }
      return prev;
    });
  };

  const removeTip = (index: number) => {
    const newTips = tips.filter((_, i) => i !== index);
    setTips(newTips);

    // Update newLesson for Grammar or Writing
    setNewLesson((prev) => {
      if ("tips" in prev) {
        return { ...prev, tips: newTips };
      }
      return prev;
    });
  };

  const nodeTypeOptions = Object.values(RouteNodeEnum).map((type) => ({
    label: type.replace(/_/g, " "),
    value: type,
  }));

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
              onChange={handleChange}
              name="serial"
              required
              disabled
            />
            <Stack sx={{ width: "100%" }}>
              <WESelect
                label="Node Type"
                value={data.type || ""}
                options={nodeTypeOptions}
                onChange={handleTypeChange}
                required
                showLabel
                name="type"
              />
            </Stack>
          </Stack>
        </Stack>
        <WETextField
          label="Title"
          type="text"
          value={data.title || ""}
          onChange={handleChange}
          name="title"
          required
          placeholder="Enter node title"
        />
        <WETextField
          label="Description"
          type="text"
          value={data.description || ""}
          onChange={handleChange}
          name="description"
          required
          placeholder="Enter node description"
          sx={{ mb: 2 }}
        />

        {/* Conditional Rendering Based on Node Type */}
        {!isTestNode && (
          <WESelectImage
            required
            label="Node Image"
            value={data.image || ""}
            onChange={handleImageChange}
            sx={{ mb: 2 }}
          />
        )}

        {/* Specific Fields for Different Node Types */}
        {data.type === RouteNodeEnum.GRAMMAR && (
          <>
            <WETextField
              label="Definition"
              type="text"
              value={(newLesson as Grammar).definition}
              onChange={(e) =>
                setNewLesson((prev) => ({
                  ...(prev as Grammar),
                  definition: e.target.value,
                }))
              }
              name="definition"
              required
              placeholder="Enter grammar definition"
              sx={{ mb: 2 }}
            />
            <WETextField
              label="Example"
              type="text"
              value={(newLesson as Grammar).example}
              onChange={(e) =>
                setNewLesson((prev) => ({
                  ...(prev as Grammar),
                  example: e.target.value,
                }))
              }
              name="example"
              required
              placeholder="Enter grammar example"
              sx={{ mb: 2 }}
            />
            <WEDocxInput
              label="Grammar File"
              value={(newLesson as Grammar).file}
              onChange={handleFileChange}
              required
            />
            {tips.map((tip, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <TextField
                  fullWidth
                  label={`Tip ${index + 1}`}
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                />
                <IconButton onClick={() => removeTip(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
              <IconButton onClick={addTip} color="primary">
                <AddIcon /> Add Tip
              </IconButton>
            </Stack>
          </>
        )}

        {/* Add similar sections for other node types */}
        {/* Reading, Listening, Writing nodes will have specific fields */}
        {data.type === RouteNodeEnum.READING && (
          <WEDocxInput
            label="Reading File"
            value={(newLesson as Reading).file}
            onChange={handleFileChange}
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
          <>
            <WETextField
              label="Writing Topic"
              type="text"
              value={(newLesson as Writing).topic}
              onChange={(e) =>
                setNewLesson((prev) => ({
                  ...(prev as Writing),
                  topic: e.target.value,
                }))
              }
              name="topic"
              required
              placeholder="Enter writing topic"
              sx={{ mb: 2 }}
            />
            <WEDocxInput
              label="Writing File"
              value={(newLesson as Writing).file}
              onChange={handleFileChange}
              required
            />
            {tips.map((tip, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <TextField
                  fullWidth
                  label={`Writing Tip ${index + 1}`}
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                />
                <IconButton onClick={() => removeTip(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
              <IconButton onClick={addTip} color="primary">
                <AddIcon /> Add Tip
              </IconButton>
            </Stack>
          </>
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

        {isTestNode && (
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
