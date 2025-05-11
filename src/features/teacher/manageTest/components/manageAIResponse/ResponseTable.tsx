import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { AIResponse } from "interfaces";
import EmptyState from "./EmptyState";
import ResponseRow from "./ResponseRow";

interface ResponseTableProps {
  data: AIResponse[];
  loading: boolean;
  onEvaluate: (response: AIResponse) => void;
  onViewDetail: (response: AIResponse) => void;
  error?: string | null;
  onRefresh?: () => void;
}

export default function ResponseTable({ 
  data, 
  loading, 
  onEvaluate,
  onViewDetail, 
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
        onViewDetail={onViewDetail}
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