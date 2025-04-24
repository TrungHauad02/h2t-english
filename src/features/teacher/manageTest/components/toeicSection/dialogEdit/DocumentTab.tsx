import { Grid, Typography } from '@mui/material';
import { ToeicPart6,ToeicPart7 } from 'interfaces';
import { StatusSwitch, FormSectionCard } from '../dialogEdit';
import { WEDocumentInput } from 'components/input';

interface DocumentTabProps {
  editedQuestion: ToeicPart6 | ToeicPart7;
  onStatusChange: (value: boolean) => void;
  onFileChange: (fileValue: string) => void;
}

export default function DocumentTab({
  editedQuestion,
  onStatusChange,
  onFileChange
}: DocumentTabProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StatusSwitch 
          status={editedQuestion.status}
          onChange={onStatusChange}
        />
      </Grid>

      <Grid item xs={12}>
        <FormSectionCard title="Document File">
          <WEDocumentInput
            value={editedQuestion.file}
            onChange={onFileChange}
            maxHeight="400px"
            padding="16px"
            errorMessage="Cannot load document. Please try a different file."
            returnType="base64"
          />
          {!editedQuestion.file && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              Document file is required
            </Typography>
          )}
        </FormSectionCard>
      </Grid>
    </Grid>
  );
}