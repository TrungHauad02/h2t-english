import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { WETextField, WESelectImage, WESelect } from "components/input";
import { RouteNode, RouteNodeEnum } from "interfaces";
import { WEDialog } from "components/display";

export default function AddNodeDialog({
  open,
  data,
  onCancel,
  onOk,
  setData,
}: {
  open: boolean;
  data: RouteNode;
  onCancel: () => void;
  onOk: () => void;
  setData: (data: RouteNode) => void;
}) {
  const [isTestNode, setIsTestNode] = useState<boolean>(false);

  useEffect(() => {
    if (
      data.type === RouteNodeEnum.MIXING_TEST ||
      data.type === RouteNodeEnum.READING_TEST ||
      data.type === RouteNodeEnum.LISTENING_TEST ||
      data.type === RouteNodeEnum.SPEAKING_TEST ||
      data.type === RouteNodeEnum.WRITING_TEST
    ) {
      setIsTestNode(true);
    } else setIsTestNode(false);
  }, [data.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (value: string | number) => {
    setData({
      ...data,
      type: value as RouteNodeEnum,
    });
  };

  const handleImageChange = (base64: string) => {
    setData({
      ...data,
      image: base64,
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
          alignItems={"flex-start"}
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
          </Stack>
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

        {!isTestNode && (
          <WESelectImage
            required
            label="Node Image"
            value={data.image || ""}
            onChange={handleImageChange}
            sx={{ mb: 2 }}
          />
        )}
      </Stack>
    </WEDialog>
  );
}
