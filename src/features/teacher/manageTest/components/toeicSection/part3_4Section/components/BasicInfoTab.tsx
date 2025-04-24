import React from 'react';
import { Grid, Typography} from '@mui/material';
import { ToeicPart3_4 } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { FormSectionCard, StatusSwitch, MediaFileSelector } from '../../dialogEdit';

interface BasicInfoTabProps {
  editedQuestion: ToeicPart3_4;
  partNumber: number;
  partIcon: React.ReactNode;
  onStatusChange: (value: boolean) => void;
  onAudioChange: (base64: string) => void;
  onImageChange: (base64: string) => void;
  onTranscriptChange: (value: string) => void;
}

export default function BasicInfoTab({
  editedQuestion,
  partNumber,
  partIcon,
  onStatusChange,
  onAudioChange,
  onImageChange,
  onTranscriptChange,
}: BasicInfoTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StatusSwitch
          status={editedQuestion.status ?? true}
          onChange={onStatusChange}
        />
      </Grid>

      <Grid item xs={12}>
        <MediaFileSelector
          audioValue={editedQuestion.audio || ''}
          imageValue={editedQuestion.image || ''}
          onAudioChange={onAudioChange}
          onImageChange={onImageChange}
          showImageSelector={true}
          audioRequired={true}
          imageRequired={false}
        />
      </Grid>

      <Grid item xs={12}>
        <FormSectionCard title="Transcript">
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: isDarkMode ? color.teal300 : color.teal600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {partIcon}
            {partNumber === 3 ? 'Conversation Transcript' : 'Talk Transcript'}
          </Typography>

          <textarea
            value={editedQuestion.transcript || ''}
            onChange={(e) => onTranscriptChange(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: isDarkMode ? color.gray900 : color.white,
              color: isDarkMode ? color.gray100 : color.gray900,
              border: `1px solid ${isDarkMode ? color.gray600 : color.gray400}`,
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: '1rem',
            }}
          />
        </FormSectionCard>
      </Grid>
    </Grid>
  );
}
