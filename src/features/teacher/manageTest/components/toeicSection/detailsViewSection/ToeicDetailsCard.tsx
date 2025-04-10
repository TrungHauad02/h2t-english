import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  TextField, 
  Chip,
  Stack
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { Toeic } from 'interfaces';

interface ToeicDetailsCardProps {
  data: Toeic, 
  isEditMode: boolean, 
  onEdit: (field: string, value: any) => void
}

export default function ToeicDetailsCard({ 
  data, 
  isEditMode, 
  onEdit 
}: ToeicDetailsCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const renderTestTitle = () => {
    if (isEditMode) {
      return (
        <TextField
          fullWidth
          label="Test Title"
          value={data.title}
          onChange={(e) => onEdit('title', e.target.value)}
          variant="outlined"
          size="small"
          sx={{ 
            maxWidth: 400,
            '& .MuiOutlinedInput-root': { 
              borderRadius: 2 
            }
          }}
        />
      );
    }
    return (
      <Typography 
        variant="h5" 
        fontWeight="bold"
        color={isDarkMode ? color.gray200 : color.gray900}
      >
        {data.title}
      </Typography>
    );
  };

  return (
    <Box>
      {/* Test Title and Status */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}
      >
        {renderTestTitle()}
        <Chip 
          label={data.status ? "Published" : "Draft"} 
          color={data.status ? "success" : "default"}
          sx={{ 
            fontWeight: 'bold',
            backgroundColor: data.status 
              ? (isDarkMode ? color.emerald700 : color.emerald500)
              : (isDarkMode ? color.gray700 : color.gray300),
            color: data.status ? color.white : (isDarkMode ? color.gray300 : color.gray800)
          }}
        />
      </Box>
      
      <Grid container spacing={3}>
        {/* Duration */}
        <Grid item xs={12} md={6}>
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: isDarkMode ? color.gray700 : color.gray100 
            }}
          >
            <AccessTimeIcon 
              sx={{ 
                color: isDarkMode ? color.teal300 : color.teal600,
                fontSize: 32 
              }} 
            />
            <Box>
              <Typography 
                variant="subtitle1"
                color={isDarkMode ? color.gray300 : color.gray700}
              >
                Duration
              </Typography>
              {isEditMode ? (
                <TextField
                  type="number"
                  value={data.duration}
                  onChange={(e) => onEdit('duration', parseInt(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    width: 100,
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2 
                    }
                  }}
                />
              ) : (
                <Typography 
                  variant="h6"
                  fontWeight="bold"
                  color={isDarkMode ? color.white : color.gray900}
                >
                  {data.duration} minutes
                </Typography>
              )}
            </Box>
          </Stack>
        </Grid>

        {/* Total Questions */}
        <Grid item xs={12} md={6}>
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: isDarkMode ? color.gray700 : color.gray100 
            }}
          >
            <QuizIcon 
              sx={{ 
                color: isDarkMode ? color.teal300 : color.teal600,
                fontSize: 32 
              }} 
            />
            <Box>
              <Typography 
                variant="subtitle1"
                color={isDarkMode ? color.gray300 : color.gray700}
              >
                Total Questions
              </Typography>
              <Typography 
                variant="h6"
                fontWeight="bold"
                color={isDarkMode ? color.white : color.gray900}
              >
                {data.totalQuestions || 200}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Questions per Part */}
        <Grid item xs={12}>
          <Divider 
            sx={{ 
              my: 2, 
              borderColor: isDarkMode ? color.gray600 : color.gray300 
            }} 
          />
          <Typography 
            variant="subtitle1" 
            fontWeight="bold" 
            mt={2} 
            mb={1}
            color={isDarkMode ? color.gray200 : color.gray900}
          >
            Questions per Part
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7].map((part) => (
              <Grid item xs={6} sm={3} key={part}>
                <Typography 
                  variant="body2"
                  color={isDarkMode ? color.gray300 : color.gray700}
                >
                
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}