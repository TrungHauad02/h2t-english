import React, { useState } from "react";
import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";

interface SidebarListProps {
  items: Array<{
    text: string;
    icon: React.ReactNode;
    path?: string;
    children?: Array<{
      text: string;
      icon: React.ReactNode;
      path: string;
    }>;
  }>;
  onClose?: () => void;
}

export default function SidebarList({ items, onClose }: SidebarListProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpand = (item: string) => {
    setExpanded(expanded === item ? null : item);
  };

  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {items.map((item) => (
        <SidebarItem
          key={item.text}
          {...item}
          expanded={expanded === item.text}
          onExpand={() => handleExpand(item.text)}
          onClose={onClose}
        />
      ))}
    </List>
  );
}
