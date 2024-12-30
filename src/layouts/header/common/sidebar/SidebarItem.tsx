import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: Array<SidebarItemProps>;
  expanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
}

export default function SidebarItem({
  text,
  icon,
  path,
  children,
  expanded,
  onExpand,
  onClose,
}: SidebarItemProps) {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <ListItem
        component={path ? Link : "div"}
        to={path || ""}
        onClick={() => {
          children && onExpand?.();
          path && onClose?.();
        }}
        sx={{
          borderRadius: "8px",
          mb: 0.5,
          backgroundColor: isActive(path || "")
            ? isDarkMode
              ? colors.teal900
              : colors.teal50
            : "transparent",
          color: isActive(path || "")
            ? isDarkMode
              ? colors.teal300
              : colors.teal700
            : "inherit",
          "&:hover": {
            backgroundColor: isDarkMode ? colors.teal900 : colors.teal50,
            color: isDarkMode ? colors.teal300 : colors.teal700,
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive(path || "")
              ? isDarkMode
                ? colors.teal300
                : colors.teal700
              : isDarkMode
              ? colors.gray400
              : colors.gray600,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: "0.875rem",
            fontWeight: isActive(path || "") ? 600 : 400,
          }}
        />
        {children && (
          <Box sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </Box>
        )}
      </ListItem>
      {children && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 2 }}>
            {children.map((child) => (
              <SidebarItem key={child.text} {...child} onClose={onClose} />
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
}
