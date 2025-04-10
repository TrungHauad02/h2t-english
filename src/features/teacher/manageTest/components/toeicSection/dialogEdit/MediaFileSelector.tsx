import React from 'react';
import { Grid } from '@mui/material';
import { WEAudioInput, WESelectImage } from 'components/input';

interface MediaFileSelectorProps {
  audioValue: string;
  imageValue?: string;
  onAudioChange: (base64: string) => void;
  onImageChange?: (base64: string) => void;
  showImageSelector?: boolean;
  audioRequired?: boolean;
  imageRequired?: boolean;
}

export default function MediaFileSelector({
  audioValue,
  imageValue = '',
  onAudioChange,
  onImageChange,
  showImageSelector = false,
  audioRequired = true,
  imageRequired = false
}: MediaFileSelectorProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <WEAudioInput
          label="Audio File"
          value={audioValue}
          onChange={onAudioChange}
          required={audioRequired}
        />
      </Grid>
      
      {showImageSelector && onImageChange && (
        <Grid item xs={12}>
          <WESelectImage
            label="Image"
            value={imageValue}
            onChange={onImageChange}
            required={imageRequired}
          />
        </Grid>
      )}
    </Grid>
  );
}