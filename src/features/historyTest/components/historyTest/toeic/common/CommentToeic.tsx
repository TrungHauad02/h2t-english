import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

interface Props {
  comment: string;
}

const CommentToeic: React.FC<Props> = ({ comment }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        my: 2,
        px: 3,
        py: 2,
        width:"80vw",
        borderRadius: 2,
        backgroundColor: isDarkMode ? color.blue900 : color.blue50,
        border: `2px solid ${isDarkMode ? color.blue500 : color.blue400}`,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color={isDarkMode ? color.blue100 : color.blue700}
        gutterBottom
      >
        Ai Comment:
      </Typography>
      <Typography
        variant="body1"
        color={isDarkMode ? color.blue50 : color.blue900}
        sx={{ whiteSpace: 'pre-line' }}
      >
        {comment}
      </Typography>
    </Box>
  );
};

export default CommentToeic;
