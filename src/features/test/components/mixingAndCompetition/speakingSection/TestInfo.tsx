import { 
    Box, 
    Typography, 
    Chip, 
    Badge,
    Divider
  } from "@mui/material";
  import useColor from "theme/useColor";
  
  interface TestInfoProps {
    testTitle: string;
    questionIndex: number;
    questionCount: number;
    globalIndex: number;
    globalCount: number;
    serialNumber: number;
    hasRecording: boolean;
    isDarkMode: boolean;
  }
  
  export default function TestInfo({
    testTitle,
    questionIndex,
    questionCount,
    globalIndex,
    globalCount,
    serialNumber,
    hasRecording,
    isDarkMode
  }: TestInfoProps) {
    const color = useColor();
  
    return (
      <Box 
        sx={{ 
          p: { xs: 2, sm: 3 },
          borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
      >
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            justifyContent: 'space-between',
            alignItems: {xs: 'flex-start', sm: 'center'},
            gap: {xs: 2, sm: 0},
            mb: 2
          }}
        >
          <Box>
            <Typography 
              variant="h6" 
              sx={{
                color: isDarkMode ? color.teal200 : color.teal700,
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                mb: 0.5
              }}
            >
              {testTitle}
            </Typography>
            
            <Chip
              size="small"
              label={`Serial ${serialNumber}`}
              sx={{
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                color: isDarkMode ? color.gray300 : color.gray600,
                fontSize: '0.75rem',
                height: 20
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge 
              badgeContent={hasRecording ? "✓" : null}
              color="success"
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: color.success,
                  color: color.white,
                  right: -6,
                  top: -2
                }
              }}
            >
              <Chip
                label={`${globalIndex}/${globalCount}`}
                size="small"
                sx={{
                  bgcolor: isDarkMode ? color.teal700 : color.teal100,
                  color: isDarkMode ? color.teal100 : color.teal800,
                  fontWeight: 500,
                  mr: 1
                }}
              />
            </Badge>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: isDarkMode ? color.gray700 : color.gray50,
            borderRadius: '8px',
            px: 2,
            py: 1
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box component="span" sx={{ color: isDarkMode ? color.teal300 : color.teal600, mr: 0.5, fontWeight: 500 }}>
              Current test:
            </Box>
            Question {questionIndex} of {questionCount}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              fontWeight: 500,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {hasRecording ? '✓ Recorded' : '• Not recorded yet'}
          </Typography>
        </Box>
      </Box>
    );
  }