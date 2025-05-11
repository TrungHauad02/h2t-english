import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Button,
  Grid,
  Tooltip
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse } from "interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { isValidJson } from "utils/jsonFormatter";
import JsonViewer from "./JsonViewer";

interface ExpandedRowProps {
  open: boolean;
  response: AIResponse;
  isMobile: boolean;
  cellCount: number;
  onDelete: (response: AIResponse) => void;
  formatDate: (date: string | Date | undefined) => { relative: string; full: string };
}

export default function ExpandedRow({
  open,
  response,
  isMobile,
  cellCount,
  onDelete,
  formatDate
}: ExpandedRowProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Kiểm tra xem request và response có phải là JSON không
  const requestIsJson = isValidJson(response.request);
  const responseIsJson = isValidJson(response.response);

  return (
    <TableRow>
      <TableCell 
        colSpan={cellCount} 
        sx={{ 
          p: 0, 
          borderBottom: open ? 
            `1px solid ${isDarkMode ? color.gray700 : color.gray200}` : 
            'none' 
        }}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box 
            sx={{ 
              py: 2, 
              px: 3, 
              backgroundColor: isDarkMode ? color.gray800 : color.gray50 
            }}
          >
            <Grid container spacing={2}>
              {/* Request */}
              <Grid item xs={12}>
                {requestIsJson ? (
                  <JsonViewer 
                    data={response.request}
                    title="Request"
                    maxHeight="200px"
                    showCopyButton={true}
                    showExpandButton={true}
                  />
                ) : (
                  <>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: isDarkMode ? color.teal300 : color.teal700,
                        fontWeight: 600
                      }}
                    >
                      Request:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        p: 1.5,
                        backgroundColor: isDarkMode ? color.gray900 : color.white,
                        borderRadius: 1,
                        color: isDarkMode ? color.gray300 : color.gray700,
                        borderLeft: `3px solid ${isDarkMode ? color.teal500 : color.teal400}`,
                      }}
                    >
                      {response.request}
                    </Typography>
                  </>
                )}
              </Grid>
              
              {/* Response */}
              <Grid item xs={12}>
                {responseIsJson ? (
                  <JsonViewer 
                    data={response.response}
                    title="Response"
                    maxHeight="300px"
                    showCopyButton={true}
                    showExpandButton={true}
                  />
                ) : (
                  <>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: isDarkMode ? color.teal300 : color.teal700,
                        fontWeight: 600
                      }}
                    >
                      Response:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        p: 1.5,
                        backgroundColor: isDarkMode ? color.gray900 : color.white,
                        borderRadius: 1,
                        color: isDarkMode ? color.gray300 : color.gray700,
                        borderLeft: `3px solid ${isDarkMode ? color.teal500 : color.teal400}`,
                        maxHeight: "300px",
                        overflow: "auto",
                      }}
                    >
                      {response.response}
                    </Typography>
                  </>
                )}
              </Grid>
              
              {/* Evaluation if exists */}
              {response.evaluate && (
                <Grid item xs={12}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: isDarkMode ? color.teal300 : color.teal700,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <StarIcon sx={{ color: color.warning, fontSize: '1rem' }} />
                    Evaluation:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      p: 1.5,
                      backgroundColor: isDarkMode ? color.gray900 : color.white,
                      borderRadius: 1,
                      color: isDarkMode ? color.gray300 : color.gray700,
                      borderLeft: `3px solid ${color.warning}`,
                    }}
                  >
                    {response.evaluate}
                  </Typography>
                </Grid>
              )}
              
              {/* Additional info (createdAt, updatedAt) */}
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mt: 1,
                    color: isDarkMode ? color.gray500 : color.gray600,
                    fontSize: '0.75rem'
                  }}
                >
                  <Typography variant="caption">
                    Created: {response.createdAt ? formatDate(response.createdAt).relative : 'Not available'} 
                    {response.createdAt && (
                      <Tooltip title={formatDate(response.createdAt).full}>
                        <Box component="span" sx={{ cursor: 'help', pl: 0.5 }}>
                          ℹ️
                        </Box>
                      </Tooltip>
                    )}
                  </Typography>
                  
                  <Typography variant="caption">
                    Updated: {response.updatedAt ? formatDate(response.updatedAt).relative : 'Not available'}
                    {response.updatedAt && (
                      <Tooltip title={formatDate(response.updatedAt).full}>
                        <Box component="span" sx={{ cursor: 'help', pl: 0.5 }}>
                          ℹ️
                        </Box>
                      </Tooltip>
                    )}
                  </Typography>
                </Box>
              </Grid>
              
              {/* Action buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(response)}
                    sx={{
                      borderColor: isDarkMode ? color.red400 : color.red500,
                      color: isDarkMode ? color.red400 : color.red500,
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(244, 67, 54, 0.08)' : 'rgba(244, 67, 54, 0.04)',
                        borderColor: isDarkMode ? color.red300 : color.red600,
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}