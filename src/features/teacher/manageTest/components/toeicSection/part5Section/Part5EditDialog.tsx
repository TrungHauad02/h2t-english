import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ToeicQuestion } from 'interfaces';
import { 
  ToeicEditDialogBase, 
  QuestionEditor
} from '../dialogEdit';

interface Part5EditDialogProps {
  open: boolean;
  question: ToeicQuestion;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicQuestion) => void;
  mode?: 'edit' | 'add';
}

export default function Part5EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave,
  mode = 'edit'
}: Part5EditDialogProps) {
  const [editedQuestion, setEditedQuestion] = useState<ToeicQuestion>({ ...question });

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
    }
  }, [open, question]);

  const handleChange = (field: keyof ToeicQuestion, value: any) => {
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleSave = () => {
    onSave(editedQuestion);
  };

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={mode === 'edit' ? "Edit Part 5 Question" : "Add Part 5 Question"}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <QuestionEditor 
            question={editedQuestion}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </ToeicEditDialogBase>
  );
}