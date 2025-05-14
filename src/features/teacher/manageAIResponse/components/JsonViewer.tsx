import { useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { formatJson, isValidJson } from "utils/jsonFormatter";

interface JsonViewerProps {
  data: string;
  title?: string;
  maxHeight?: string | number;
  showCopyButton?: boolean;
  showExpandButton?: boolean;
  initiallyExpanded?: boolean;
  compact?: boolean;
}

export default function JsonViewer({
  data,
  title,
  maxHeight = "300px",
  showCopyButton = true,
  showExpandButton = true,
  initiallyExpanded = false,
  compact = false,
}: JsonViewerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [copied, setCopied] = useState(false);

  // Kiểm tra xem dữ liệu có phải JSON không - chỉ tính toán một lần
  const isJson = useMemo(() => isValidJson(data), [data]);
  
  // Định dạng JSON để hiển thị - chỉ tính toán lại khi data hoặc expanded thay đổi
  const formattedData = useMemo(() => {
    return isJson ? formatJson(data, expanded) : data;
  }, [data, expanded, isJson]);

  // Xử lý copy to clipboard với useCallback
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    
    // Cleanup timeout để tránh memory leak
    return () => clearTimeout(timer);
  }, [data]);

  // Xử lý expand/collapse với useCallback
  const handleToggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {title && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal700,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {showExpandButton && isJson && (
              <Button
                size="small"
                variant="text"
                onClick={handleToggleExpand}
                startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  color: isDarkMode ? color.teal400 : color.teal600,
                  p: 0,
                  minWidth: "auto",
                  textTransform: "none",
                }}
              >
                {expanded ? "Collapse" : "Expand"}
              </Button>
            )}
            {showCopyButton && (
              <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                <IconButton 
                  size="small" 
                  onClick={handleCopy}
                  sx={{
                    color: isDarkMode ? 
                      (copied ? color.green400 : color.teal400) : 
                      (copied ? color.green600 : color.teal600),
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
      <Box
        component={Paper}
        elevation={0}
        sx={{
          p: compact ? 1 : 1.5,
          backgroundColor: isDarkMode ? color.gray900 : color.white,
          borderRadius: 1,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          overflow: "auto",
          maxHeight: maxHeight,
          position: "relative",
          fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
          fontSize: compact ? "0.75rem" : "0.875rem",
          lineHeight: compact ? 1.4 : 1.5,
          whiteSpace: "pre-wrap",
          color: isDarkMode ? color.gray300 : color.gray700,
        }}
      >
        {formattedData}
      </Box>
    </Box>
  );
}