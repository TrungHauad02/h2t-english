import React from "react";
import { ListItemButton, ListItemText, Collapse, Box } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListComponent } from "components/list";

interface ListItemWithToggleProps {
  label: string;
  path: string;
  children?: { path: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
  isDarkMode: boolean;
  color: any;
}

export default function ListItemWithToggle({
  label,
  path,
  children,
  open,
  onToggle,
  onNavigate,
  isDarkMode,
  color,
}: ListItemWithToggleProps) {
  return (
    <Box>
      <ListItemButton
        onClick={children ? onToggle : () => onNavigate(path)}
        sx={{
          color: isDarkMode ? color.white : color.black,
          "&:hover": {
            bgcolor: isDarkMode ? color.gray700 : color.gray200,
          },
        }}
      >
        <ListItemText primary={label} />
        {children ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>

      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListComponent
            data={children}
            tag="div"
            style={{ padding: 0 }}
            renderItem={(child) => (
              <ListItemButton
                key={child.path}
                onClick={() => onNavigate(path + child.path)}
                sx={{
                  pl: 4,
                  color: isDarkMode ? color.white : color.black,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray700 : color.gray200,
                  },
                }}
              >
                <ListItemText primary={child.label} />
              </ListItemButton>
            )}
          />
        </Collapse>
      )}
    </Box>
  );
}
