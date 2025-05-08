import { 
    Box, 
    Typography, 
    Fab, 
    CircularProgress,
    Card,
    alpha
  } from "@mui/material";
  import MicIcon from "@mui/icons-material/Mic";
  import StopIcon from "@mui/icons-material/Stop";
  import useColor from "theme/useColor";
  
  interface RecordingControlProps {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    recordingTime: number;
    formatTime: (seconds: number) => string;
    saving: boolean;
    audioSource: string | null;
    isDarkMode: boolean;
  }
  
  export default function RecordingControl({ 
    isRecording, 
    startRecording, 
    stopRecording,
    recordingTime,
    formatTime,
    saving,
    audioSource,
    isDarkMode
  }: RecordingControlProps) {
    const color = useColor();
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 2,
          pb: 4
        }}
      >
        {/* Recording animation */}
        {isRecording && (
          <Box 
            sx={{
              position: 'absolute',
              width: { xs: 90, sm: 100 },
              height: { xs: 90, sm: 100 },
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(color.teal400, 0)} 40%, ${alpha(color.teal400, 0.2)} 50%, ${alpha(color.teal400, 0.1)} 60%, ${alpha(color.teal400, 0)} 70%)`,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.95)', opacity: 0.7 },
                '50%': { transform: 'scale(1.05)', opacity: 0.9 },
                '100%': { transform: 'scale(0.95)', opacity: 0.7 },
              },
            }}
          />
        )}
  
        <Fab
          color="primary"
          size="large"
          onClick={isRecording ? stopRecording : startRecording}
          sx={{
            backgroundColor: isRecording 
              ? (isDarkMode ? color.red700 : color.red500) 
              : (isDarkMode ? color.teal700 : color.teal500),
            '&:hover': {
              backgroundColor: isRecording 
                ? (isDarkMode ? color.red800 : color.red600) 
                : (isDarkMode ? color.teal800 : color.teal600),
            },
            mb: 2,
            width: { xs: 72, sm: 80 },
            height: { xs: 72, sm: 80 },
            boxShadow: isRecording 
              ? `0 0 12px ${isDarkMode ? color.red700 : color.red400}` 
              : `0 4px 10px ${alpha(color.teal700, 0.3)}`,
            transition: 'all 0.3s ease',
          }}
        >
          {isRecording ? <StopIcon fontSize="large" /> : <MicIcon fontSize="large" />}
        </Fab>
        
        {/* Recording status or instruction */}
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray600,
            mt: 2,
            fontWeight: isRecording ? 500 : 400
          }}
        >
          {isRecording 
            ? <Box sx={{ 
                color: isDarkMode ? color.red400 : color.red500, 
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                  '100%': { opacity: 1 },
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}>
                <Box 
                  component="span" 
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: isDarkMode ? color.red400 : color.red500,
                  }}
                />
                Recording in progress... {formatTime(recordingTime)}
              </Box> 
            : "Click the microphone button to start recording"}
        </Typography>
        
        {/* Saving indicator */}
        {saving && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 2 
          }}>
            <CircularProgress 
              size={16} 
              sx={{ mr: 1, color: isDarkMode ? color.teal400 : color.teal500 }} 
            />
            <Typography 
              variant="body2" 
              sx={{ color: isDarkMode ? color.teal300 : color.teal600 }}
            >
              Saving recording...
            </Typography>
          </Box>
        )}
        
        {/* Audio player */}
        {audioSource && (
          <Card
            elevation={0}
            sx={{ 
              mt: 3,
              width: '100%',
              maxWidth: '500px',
              borderRadius: '12px',
              p: 2,
              backgroundColor: isDarkMode ? color.gray700 : color.gray50,
              border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
            }}
          >
            <audio 
              controls 
              src={audioSource} 
              style={{ 
                width: '100%',
                borderRadius: '8px',
                backgroundColor: isDarkMode ? color.gray600 : color.gray100,
              }} 
            />
          </Card>
        )}
      </Box>
    );
  }