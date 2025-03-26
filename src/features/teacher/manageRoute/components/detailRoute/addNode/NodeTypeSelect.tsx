import React from "react";
import { RouteNodeEnum } from "interfaces";
import { WESelect } from "components/input";

interface NodeTypeSelectProps {
  value: RouteNodeEnum | string;
  onChange: (value: string | number) => void;
}

export default function NodeTypeSelect({
  value,
  onChange,
}: NodeTypeSelectProps) {
  const nodeTypeOptions = Object.values(RouteNodeEnum).map((type) => ({
    label: type.replace(/_/g, " "),
    value: type,
  }));

  return (
    <WESelect
      label="Node Type"
      value={value || ""}
      options={nodeTypeOptions}
      onChange={onChange}
      required
      showLabel
      name="type"
    />
  );
}
