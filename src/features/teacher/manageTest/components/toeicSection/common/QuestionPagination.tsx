import React from 'react';
import { Box, IconButton, Pagination, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface QuestionPaginationProps {
  title?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function QuestionPagination({
  title,
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext
}: QuestionPaginationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page - 1); // Convert to 0-based index
  };

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3
    }}>
      {title && (
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        <IconButton
          onClick={onPrevious}
          disabled={currentPage === 0}
          sx={{
            color: isDarkMode ? color.teal400 : color.teal600,
            '&.Mui-disabled': {
              color: isDarkMode ? color.gray500 : color.gray400
            }
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        
        <Pagination
          count={totalPages}
          page={currentPage + 1} // Convert to 1-based for display
          onChange={handlePageChange}
          color="primary"
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              color: isDarkMode ? color.gray300 : color.gray700,
            },
            '& .Mui-selected': {
              backgroundColor: isDarkMode ? color.teal700 : color.teal100,
              color: isDarkMode ? color.white : color.teal800,
              '&:hover': {
                backgroundColor: isDarkMode ? color.teal600 : color.teal200,
              }
            }
          }}
        />
        
        <IconButton
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          sx={{
            color: isDarkMode ? color.teal400 : color.teal600,
            '&.Mui-disabled': {
              color: isDarkMode ? color.gray500 : color.gray400
            }
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}