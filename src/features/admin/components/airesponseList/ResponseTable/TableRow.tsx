import {
  TableRow as MuiTableRow,
  TableCell,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse } from "interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CodeIcon from "@mui/icons-material/Code";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { truncateJson, isValidJson } from "utils/jsonFormatter";

interface TableRowProps {
  response: AIResponse;
  openRowId: number | null;
  isMobile: boolean;
  onToggleRow: (id: number) => void;
  onView: (response: AIResponse) => void;
  onDelete: (response: AIResponse) => void;
}

export default function TableRow({
  response,
  openRowId,
  isMobile,
  onToggleRow,
  onView,
  onDelete,
}: TableRowProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // Xử lý hiển thị request và response có thể ở dạng JSON
  const displayRequest = isValidJson(response.request) 
    ? truncateJson(response.request, 30)
    : response.request.length > 30 
      ? response.request.substring(0, 30) + "..." 
      : response.request;
  
  const displayResponse = isValidJson(response.response) 
    ? truncateJson(response.response, 30)
    : response.response.length > 30 
      ? response.response.substring(0, 30) + "..." 
      : response.response;

  return (
    <MuiTableRow
      key={response.id}
      sx={{
        "&:hover": {
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
        },
        borderBottom: `1px solid ${
          isDarkMode ? color.gray700 : color.gray200
        }`,
        cursor: "pointer",
      }}
    >
      {!isMobile && (
        <TableCell padding="checkbox">
          <IconButton
            size="small"
            onClick={() => onToggleRow(response.id)}
          >
            {openRowId === response.id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
      )}
      
      <TableCell 
        onClick={() => onToggleRow(response.id)}
        sx={{ 
          color: isDarkMode ? color.gray300 : color.gray700
        }}
      >
        <Chip
          label={response.userId || "Unknown"}
          size="small"
          sx={{
            backgroundColor: isDarkMode ? color.teal800 : color.teal100,
            color: isDarkMode ? color.teal200 : color.teal800,
            fontWeight: 600,
          }}
        />
      </TableCell>
      
      <TableCell 
        onClick={() => onToggleRow(response.id)}
        sx={{ 
          color: isDarkMode ? color.gray300 : color.gray700
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isValidJson(response.request) && (
            <CodeIcon 
              fontSize="small" 
              sx={{ 
                color: isDarkMode ? color.gray500 : color.gray400,
                fontSize: '0.9rem' 
              }} 
            />
          )}
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: isValidJson(response.request) 
                ? "Menlo, Monaco, Consolas, 'Courier New', monospace" 
                : 'inherit'
            }}
          >
            {displayRequest}
          </Typography>
        </Box>
      </TableCell>
      
      {!isMobile && (
        <TableCell 
          onClick={() => onToggleRow(response.id)}
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {isValidJson(response.response) && (
              <CodeIcon 
                fontSize="small" 
                sx={{ 
                  color: isDarkMode ? color.gray500 : color.gray400,
                  fontSize: '0.9rem' 
                }} 
              />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: isValidJson(response.response) 
                  ? "Menlo, Monaco, Consolas, 'Courier New', monospace" 
                  : 'inherit'
              }}
            >
              {displayResponse}
            </Typography>
          </Box>
        </TableCell>
      )}
      
      {!isMobile && (
        <TableCell 
          onClick={() => onToggleRow(response.id)}
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700
          }}
        >
          {response.evaluate ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: color.warning, fontSize: '0.9rem' }} />
              <Typography variant="body2">
                {response.evaluate.length > 20 
                  ? response.evaluate.substring(0, 20) + "..."
                  : response.evaluate}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarBorderIcon sx={{ color: isDarkMode ? color.gray500 : color.gray400, fontSize: '0.9rem' }} />
              <Typography variant="body2" sx={{ color: isDarkMode ? color.gray500 : color.gray400 }}>
                No evaluation
              </Typography>
            </Box>
          )}
        </TableCell>
      )}
      
      <TableCell 
        align="center"
        onClick={() => onToggleRow(response.id)}
      >
        <Chip
          icon={
            response.evaluate ? (
              <CheckCircleIcon fontSize="small" />
            ) : (
              <CancelIcon fontSize="small" />
            )
          }
          label={response.evaluate ? "Evaluated" : "Not Evaluated"}
          size="small"
          sx={{
            backgroundColor: response.evaluate
              ? isDarkMode
                ? color.green800
                : color.green100
              : isDarkMode
              ? color.red800
              : color.red100,
            color: response.evaluate
              ? isDarkMode
                ? color.green200
                : color.green800
              : isDarkMode
              ? color.red200
              : color.red800,
          }}
        />
      </TableCell>
      
      <TableCell align="center">
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onView(response);
              }}
              sx={{
                color: isDarkMode ? color.teal400 : color.teal600,
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(response);
              }}
              sx={{
                color: isDarkMode ? color.red400 : color.red600,
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </MuiTableRow>
  );
}