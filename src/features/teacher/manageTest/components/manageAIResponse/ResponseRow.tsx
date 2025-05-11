import { useState } from "react";
import { 
  Box, 
  TableCell, 
  TableRow,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Collapse
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AIResponse } from "interfaces";
import { format } from 'date-fns';

interface ResponseRowProps {
  row: AIResponse;
  onEvaluate: (response: AIResponse) => void;
  isMobile: boolean;
}

export default function ResponseRow({ row, onEvaluate, isMobile }: ResponseRowProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
  };
  
  return (
    <>
      <TableRow 
        sx={{ 
          '&:hover': { 
            backgroundColor: isDarkMode ? `${color.gray700}50` : `${color.gray100}80` 
          },
          borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
        }}
      >
        <TableCell 
          sx={{ 
            color: isDarkMode ? color.gray200 : color.gray800,
            display: { xs: 'none', md: 'table-cell' }
          }}
        >
          {row.id}
        </TableCell>
        <TableCell 
          sx={{ 
            color: isDarkMode ? color.gray200 : color.gray800 
          }}
        >
          <Typography 
            sx={{ 
              maxWidth: { xs: '150px', sm: '250px', md: '350px' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {row.request}
          </Typography>
        </TableCell>
        <TableCell 
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700,
            display: { xs: 'none', sm: 'table-cell' }
          }}
        >
          {formatDate(row.createdAt)}
        </TableCell>
        <TableCell>
          <Chip 
            label={row.status ? "Evaluated" : "Not Evaluated"}
            size="small"
            sx={{
              backgroundColor: row.status 
                ? (isDarkMode ? color.green800 : color.green100)
                : (isDarkMode ? color.gray700 : color.gray200),
              color: row.status
                ? (isDarkMode ? color.green300 : color.green800)
                : (isDarkMode ? color.gray300 : color.gray700),
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Tooltip title="View Details">
              <IconButton
                size="small"
                onClick={() => setOpen(!open)}
                sx={{
                  color: isDarkMode ? color.teal400 : color.teal600,
                  '&:hover': {
                    backgroundColor: isDarkMode ? `${color.teal800}40` : `${color.teal100}80`,
                  }
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Evaluate Response">
              <IconButton
                size="small"
                onClick={() => onEvaluate(row)}
                sx={{
                  color: isDarkMode ? color.emerald400 : color.emerald600,
                  '&:hover': {
                    backgroundColor: isDarkMode ? `${color.emerald800}40` : `${color.emerald100}80`,
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell 
          style={{ paddingBottom: 0, paddingTop: 0 }} 
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box 
              sx={{ 
                m: 2, 
                px: 2, 
                py: 3, 
                borderRadius: '0.5rem',
                backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
              }}
            >
              <Typography 
                variant="subtitle2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  color: isDarkMode ? color.teal300 : color.teal700,
                  pb: 1,
                  borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
                }}
              >
                Full Request:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1, 
                  mb: 3,
                  whiteSpace: 'pre-wrap',
                  color: isDarkMode ? color.gray200 : color.gray800
                }}
              >
                {row.request}
              </Typography>
              
              <Typography 
                variant="subtitle2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  color: isDarkMode ? color.teal300 : color.teal700,
                  pb: 1,
                  borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
                }}
              >
                AI Response:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  mb: 3,
                  whiteSpace: 'pre-wrap',
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  lineHeight: 1.6,
                  p: 1.5,
                  backgroundColor: isDarkMode ? `${color.gray800}60` : `${color.gray200}30`,
                  borderRadius: '0.5rem',
                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
                }}
              >
                {row.response}
              </Typography>
              
              <Typography 
                variant="subtitle2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  color: isDarkMode ? color.teal300 : color.teal700,
                  pb: 1,
                  borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
                }}
              >
                Evaluation:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  whiteSpace: 'pre-wrap',
                  color: row.evaluate 
                    ? (isDarkMode ? color.gray200 : color.gray800)
                    : (isDarkMode ? color.gray500 : color.gray500),
                  fontStyle: row.evaluate ? 'normal' : 'italic',
                  p: row.evaluate ? 1.5 : 0,
                  backgroundColor: row.evaluate ? (isDarkMode ? `${color.gray800}60` : `${color.gray200}30`) : 'transparent',
                  borderRadius: row.evaluate ? '0.5rem' : 0,
                  border: row.evaluate ? `1px solid ${isDarkMode ? color.gray700 : color.gray300}` : 'none'
                }}
              >
                {row.evaluate || 'No evaluation provided yet. Click the edit button to add evaluation.'}
              </Typography>
              
              {isMobile && (
                <Box sx={{ mt: 3, pt: 2, borderTop: `1px dashed ${isDarkMode ? color.gray700 : color.gray300}` }}>
                  <Typography 
                    variant="caption" 
                    display="block"
                    sx={{ 
                      color: isDarkMode ? color.gray400 : color.gray600,
                      mb: 0.5
                    }}
                  >
                    ID: {row.id}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    display="block"
                    sx={{ 
                      color: isDarkMode ? color.gray400 : color.gray600
                    }}
                  >
                    Created: {formatDate(row.createdAt)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}