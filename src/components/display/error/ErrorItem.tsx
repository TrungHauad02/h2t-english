import React from "react";
import { 
  ListItem, 
  ListItemText, 
  IconButton, 
  Box, 
  Typography, 
  Divider 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ErrorItem as ErrorItemType } from "./types";
import { getSeverityIcon, getSeverityColor, formatTimeString } from "./errorUtils";

interface ErrorItemProps {
  error: ErrorItemType;
  index: number;
  totalErrors: number;
  onDismiss: (id: string) => void;
  onShowDetails: (error: ErrorItemType) => void;
  isDarkMode: boolean;
  colors: any;
}

export default function ErrorItem({
  error,
  index,
  totalErrors,
  onDismiss,
  onShowDetails,
  isDarkMode,
  colors,
}: ErrorItemProps) {
  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            edge="end"
            onClick={() => onDismiss(error.id)}
            size="small"
            sx={{
              color: isDarkMode ? colors.gray500 : colors.gray600,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: isDarkMode
              ? colors.gray800
              : colors.gray100,
          },
          borderLeft: `4px solid ${getSeverityColor(
            error.severity,
            isDarkMode,
            colors
          )}`,
        }}
        onClick={() => onShowDetails(error)}
      >
        <ListItemText
          primary={
            <Box
              sx={{ display: "flex", alignItems: "center", pr: 4 }}
            >
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: getSeverityColor(error.severity, isDarkMode, colors),
                  mr: 1,
                }}
              >
                {getSeverityIcon(error.severity)}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: isDarkMode
                    ? colors.gray200
                    : colors.gray800,
                  wordBreak: "break-word",
                }}
              >
                {error.message}
              </Typography>
            </Box>
          }
          secondary={
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? colors.gray500 : colors.gray600,
                display: "block",
                mt: 0.5,
              }}
            >
              {formatTimeString(error.timestamp)}
            </Typography>
          }
        />
      </ListItem>
      {index < totalErrors - 1 && (
        <Divider
          component="li"
          sx={{
            backgroundColor: isDarkMode
              ? colors.gray800
              : colors.gray200,
          }}
        />
      )}
    </React.Fragment>
  );
}
