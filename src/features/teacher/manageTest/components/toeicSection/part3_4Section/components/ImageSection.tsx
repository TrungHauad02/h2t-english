import { Box, CardMedia } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface ImageSectionProps {
  imageUrl: string;
}

export default function ImageSection({ imageUrl }: ImageSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  if (!imageUrl) return null;

  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  return (
    <Box>
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Question Image"
        sx={{
          borderRadius: '1rem',
          maxHeight: 250,
          width: 'auto',
          mx: 'auto',
          objectFit: 'contain',
          border: `1px solid ${borderColor}`
        }}
      />
    </Box>
  );
}