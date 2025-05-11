import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Collapse,
  Grid,
  Stack
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse } from "interfaces";
import { aiResponseService } from "services/features/aiResponseService";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatDistanceToNow, format } from "date-fns";

interface AIResponseTableProps {
  data: AIResponse[];
  onRefresh: () => void;
}

export default function AIResponseTable({ data, onRefresh }: AIResponseTableProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);

  // Toggle expanded row
  const handleToggleRow = (id: number) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  // View dialog handlers
  const handleViewOpen = (response: AIResponse) => {
    setSelectedResponse(response);
    setViewDialogOpen(true);
  };

  // Delete dialog handlers
  const handleDeleteOpen = (response: AIResponse) => {
    setSelectedResponse(response);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedResponse) {
      try {
        await aiResponseService.remove(selectedResponse.id);
        setDeleteDialogOpen(false);
        onRefresh();
      } catch (error) {
        console.error("Error deleting response:", error);
      }
    }
  };

  // Format truncated text
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Format date for display
  const formatDate = (date: string | Date | undefined) => {
    if (!date) {
      return {
        relative: 'Not available',
        full: 'Not available'
      };
    }
    const dateObj = new Date(date);
    return {
      relative: formatDistanceToNow(dateObj, { addSuffix: true }),
      full: format(dateObj, "PPpp") // Mon, Jan 1, 2021, 12:00 PM
    };
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          backgroundColor: "transparent",
          overflowX: "auto"
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                "& th": {
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontWeight: 600,
                  borderBottom: `2px solid ${isDarkMode ? color.gray600 : color.gray300}`,
                },
              }}
            >
              {!isMobile && <TableCell padding="checkbox"></TableCell>}
              <TableCell>User ID</TableCell>
              <TableCell>Request</TableCell>
              {!isMobile && <TableCell>Response</TableCell>}
              {!isMobile && <TableCell>Evaluation</TableCell>}
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((response) => (
              <>
                <TableRow
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
                        onClick={() => handleToggleRow(response.id)}
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
                    onClick={() => handleToggleRow(response.id)}
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
                    onClick={() => handleToggleRow(response.id)}
                    sx={{ 
                      color: isDarkMode ? color.gray300 : color.gray700
                    }}
                  >
                    {truncateText(response.request, 30)}
                  </TableCell>
                  {!isMobile && (
                    <TableCell 
                      onClick={() => handleToggleRow(response.id)}
                      sx={{ 
                        color: isDarkMode ? color.gray300 : color.gray700
                      }}
                    >
                      {truncateText(response.response, 30)}
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell 
                      onClick={() => handleToggleRow(response.id)}
                      sx={{ 
                        color: isDarkMode ? color.gray300 : color.gray700
                      }}
                    >
                      {response.evaluate ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ color: color.warning, fontSize: '0.9rem' }} />
                          {truncateText(response.evaluate, 20)}
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
                    onClick={() => handleToggleRow(response.id)}
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
                          onClick={() => handleViewOpen(response)}
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
                          onClick={() => handleDeleteOpen(response)}
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
                </TableRow>
                <TableRow>
                  <TableCell 
                    colSpan={isMobile ? 4 : 7} 
                    sx={{ 
                      p: 0, 
                      borderBottom: openRowId === response.id ? 
                        `1px solid ${isDarkMode ? color.gray700 : color.gray200}` : 
                        'none' 
                    }}
                  >
                    <Collapse 
                      in={openRowId === response.id} 
                      timeout="auto" 
                      unmountOnExit
                    >
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
                          </Grid>
                          
                          {/* Response */}
                          <Grid item xs={12}>
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
                                maxHeight: "200px",
                                overflow: "auto",
                              }}
                            >
                              {response.response}
                            </Typography>
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
                                onClick={() => handleDeleteOpen(response)}
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
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            backgroundImage: 'none',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          color: isDarkMode ? color.teal300 : color.teal700,
          borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          pb: 2
        }}>
          Response Details
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedResponse && (
            <Stack spacing={3}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: isDarkMode ? color.teal400 : color.teal600,
                    mb: 1,
                    fontWeight: 600
                  }}
                >
                  User ID
                </Typography>
                <Typography variant="body1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                  {selectedResponse.userId || "Unknown"}
                </Typography>
              </Box>
              
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: isDarkMode ? color.teal400 : color.teal600,
                    mb: 1,
                    fontWeight: 600
                  }}
                >
                  Request
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: isDarkMode ? color.gray300 : color.gray700,
                    p: 2,
                    backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                    borderRadius: 1,
                    borderLeft: `4px solid ${isDarkMode ? color.teal500 : color.teal600}`
                  }}
                >
                  {selectedResponse.request}
                </Typography>
              </Box>
              
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: isDarkMode ? color.teal400 : color.teal600,
                    mb: 1,
                    fontWeight: 600
                  }}
                >
                  Response
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                    borderRadius: 1,
                    borderLeft: `4px solid ${isDarkMode ? color.teal500 : color.teal600}`,
                    maxHeight: "300px",
                    overflow: "auto"
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: isDarkMode ? color.gray300 : color.gray700,
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    {selectedResponse.response}
                  </Typography>
                </Box>
              </Box>
              
              {selectedResponse.evaluate && (
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: isDarkMode ? color.teal400 : color.teal600,
                      mb: 1,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <StarIcon sx={{ color: color.warning }} />
                    Evaluation
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: isDarkMode ? color.gray300 : color.gray700,
                      p: 2,
                      backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                      borderRadius: 1,
                      borderLeft: `4px solid ${color.warning}`
                    }}
                  >
                    {selectedResponse.evaluate}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                color: isDarkMode ? color.gray500 : color.gray600
              }}>
                <Typography variant="body2">
                  Status: {' '}
                  <Chip
                    label={selectedResponse.evaluate ? "Evaluated" : "Not Evaluated"}
                    size="small"
                    sx={{
                      backgroundColor: selectedResponse.evaluate
                        ? isDarkMode ? color.green800 : color.green100
                        : isDarkMode ? color.red800 : color.red100,
                      color: selectedResponse.evaluate
                        ? isDarkMode ? color.green200 : color.green800
                        : isDarkMode ? color.red200 : color.red800,
                    }}
                  />
                </Typography>
                <Typography variant="body2">
                  Created: {selectedResponse.createdAt ? formatDate(selectedResponse.createdAt).full : 'Not available'}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`, px: 3, py: 2 }}>
          <Button 
            onClick={() => setViewDialogOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: isDarkMode ? color.teal700 : color.teal600,
              color: color.white,
              '&:hover': {
                backgroundColor: isDarkMode ? color.teal600 : color.teal500,
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            backgroundImage: 'none',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          color: isDarkMode ? color.red400 : color.red600,
          pb: 1
        }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
            Are you sure you want to delete this AI response? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{
              borderColor: isDarkMode ? color.gray600 : color.gray300,
              color: isDarkMode ? color.gray300 : color.gray700,
              '&:hover': {
                borderColor: isDarkMode ? color.gray500 : color.gray400,
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: isDarkMode ? color.red600 : color.red500,
              color: color.white,
              '&:hover': {
                backgroundColor: isDarkMode ? color.red700 : color.red600,
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}