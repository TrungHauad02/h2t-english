import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Chip,
  Stack
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse } from "interfaces";
import JsonViewer from "../ResponseTable/JsonViewer";
import { isValidJson } from "utils/jsonFormatter";

interface ViewDialogProps {
  open: boolean;
  response: AIResponse | null;
  onClose: () => void;
  formatDate: (date: string | Date | undefined) => { relative: string; full: string };
}

export default function ViewDialog({
  open,
  response,
  onClose,
  formatDate
}: ViewDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!response) return null;

  // Kiểm tra xem request và response có phải là JSON không
  const requestIsJson = isValidJson(response.request);
  const responseIsJson = isValidJson(response.response);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
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
              {response.userId || "Unknown"}
            </Typography>
          </Box>
          
          {/* Request */}
          <Box>
            {requestIsJson ? (
              <JsonViewer 
                data={response.request}
                title="Request"
                maxHeight="200px"
                showCopyButton={true}
                showExpandButton={true}
                initiallyExpanded={true}
              />
            ) : (
              <>
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
                  {response.request}
                </Typography>
              </>
            )}
          </Box>
          
          {/* Response */}
          <Box>
            {responseIsJson ? (
              <JsonViewer 
                data={response.response}
                title="Response"
                maxHeight="300px"
                showCopyButton={true}
                showExpandButton={true}
                initiallyExpanded={true}
              />
            ) : (
              <>
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
                    {response.response}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          
          {/* Evaluation if exists */}
          {response.evaluate && (
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
                {response.evaluate}
              </Typography>
            </Box>
          )}
          
          {/* Status and date info */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            color: isDarkMode ? color.gray500 : color.gray600
          }}>
            <Typography variant="body2">
              Status: {' '}
              <Chip
                label={response.evaluate ? "Evaluated" : "Not Evaluated"}
                size="small"
                sx={{
                  backgroundColor: response.evaluate
                    ? isDarkMode ? color.green800 : color.green100
                    : isDarkMode ? color.red800 : color.red100,
                  color: response.evaluate
                    ? isDarkMode ? color.green200 : color.green800
                    : isDarkMode ? color.red200 : color.red800,
                }}
              />
            </Typography>
            <Typography variant="body2">
              Created: {response.createdAt ? formatDate(response.createdAt).full : 'Not available'}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`, px: 3, py: 2 }}>
        <Button 
          onClick={onClose}
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
  );
}