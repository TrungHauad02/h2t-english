import { Box, Typography, Chip } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface QuestionExplanationProps {
  explanation: string;
  showExplanation: boolean;
  onToggleExplanation: () => void;
}

export default function QuestionExplanation({
  explanation,
  showExplanation,
  onToggleExplanation
}: QuestionExplanationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  if (!explanation) return null;

  return (
    <>
      {showExplanation ? (
        <Box 
          sx={{ 
            mt: 3, 
            pt: 3, 
            borderTop: `1px solid ${borderColor}` 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TipsAndUpdatesIcon sx={{ color: accentColor }} />
            <Typography 
              fontWeight="bold" 
              color={accentColor}
            >
              Explanation
            </Typography>
          </Box>
          
          <Typography 
            sx={{ 
              fontStyle: 'italic',
              color: isDarkMode ? color.gray300 : color.gray700
            }}
          >
            {explanation}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Chip
            icon={<TipsAndUpdatesIcon />}
            label="Show Explanation"
            onClick={onToggleExplanation}
            clickable
            sx={{
              backgroundColor: isDarkMode ? color.teal900 : color.teal50,
              color: accentColor,
              borderColor: accentColor,
              border: '1px solid',
              '&:hover': {
                backgroundColor: isDarkMode ? color.teal800 : color.teal100,
              }
            }}
          />
        </Box>
      )}
    </>
  );
}