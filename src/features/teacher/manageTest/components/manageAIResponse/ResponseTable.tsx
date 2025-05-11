import { useState } from "react";
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Collapse,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AIResponse } from "interfaces";
import { format } from 'date-fns';
import EmptyState from "./EmptyState";

interface ResponseTableProps {
  data: AIResponse[];
  loading: boolean;
  onEvaluate: (response: AIResponse) => void;
  error?: string | null;
  onRefresh?: () => void;
}

export default function ResponseTable({ 
  data, 
  loading, 
  onEvaluate, 
  error, 
  onRefresh 
}: ResponseTableProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Render table content based on state
  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
            <EmptyState type="loading" message="Loading AI responses..." />
          </TableCell>
        </TableRow>
      );
    }
    
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
            <EmptyState type="error" message={error} onRefresh={onRefresh} />
          </TableCell>
        </TableRow>
      );
    }
    
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
            <EmptyState 
              type="empty" 
              message="No AI responses found" 
              onRefresh={onRefresh} 
            />
          </TableCell>
        </TableRow>
      );
    }
    
    return data.map((row) => (
      <ResponseRow 
        key={row.id} 
        row={row} 
        onEvaluate={onEvaluate} 
        isMobile={isMobile}
      />
    ));
  };
  
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: isDarkMode ? color.gray900 : color.teal50,
              }}
            >
              <TableCell 
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal800,
                  fontWeight: 700,
                  display: { xs: 'none', md: 'table-cell' }
                }}
              >
                ID
              </TableCell>
              <TableCell 
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal800,
                  fontWeight: 700 
                }}
              >
                Request
              </TableCell>
              <TableCell 
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal800,
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'table-cell' }
                }}
              >
                Created At
              </TableCell>
              <TableCell 
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal800,
                  fontWeight: 700 
                }}
              >
                Status
              </TableCell>
              <TableCell 
                align="center"
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal800,
                  fontWeight: 700 
                }}
              >
                Actions
              </TableCell>
              <TableCell sx={{ width: 50 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableContent()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

interface ResponseRowProps {
  row: AIResponse;
  onEvaluate: (response: AIResponse) => void;
  isMobile: boolean;
}

function ResponseRow({ row, onEvaluate, isMobile }: ResponseRowProps) {
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
                  color: isDarkMode ? color.gray200 : color.gray800
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
                  fontStyle: row.evaluate ? 'normal' : 'italic'
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