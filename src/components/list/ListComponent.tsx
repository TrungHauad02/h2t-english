import React from "react";
import { SxProps, Theme } from "@mui/material/styles";

interface ListComponentProps<T> {
  data: T[];
  renderItem: (item: T, index?: number) => React.ReactNode;
  tag?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
}

export default function ListComponent<T>({
  data,
  renderItem,
  tag: Tag = "div",
  className,
  style,
  sx,
}: ListComponentProps<T>) {
  const isHtmlTag = typeof Tag === "string";

  return isHtmlTag ? (
    <Tag className={className} style={style}>
      {data.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </Tag>
  ) : (
    <Tag className={className} sx={sx}>
      {data.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </Tag>
  );
}
