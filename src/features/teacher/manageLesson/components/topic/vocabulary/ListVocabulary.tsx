import { Stack, Grid } from "@mui/material";
import { useState } from "react";
import { Vocabulary } from "interfaces";
import VocabularyViewMode from "./VocabularyViewMode";
import VocabularyEditForm from "./VocabularyEditForm";
import WEDialog from "components/display/dialog/WEDialog";

interface ListVocabularyProps {
  data: Vocabulary[];
  setData: (data: Vocabulary[]) => void;
}

export default function ListVocabulary({ data, setData }: ListVocabularyProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<Vocabulary | null>(null);

  const handleEdit = (vocabularyId: number) => {
    const vocabulary = data.find((v) => v.id === vocabularyId);
    if (vocabulary) {
      setEditData({ ...vocabulary });
      setDialogOpen(true);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setEditData(null);
  };

  const handleSave = () => {
    if (editData) {
      const newData = data.map((v) => (v.id === editData.id ? editData : v));
      setData(newData);
      setDialogOpen(false);
      setEditData(null);
    }
  };

  return (
    <Stack>
      <Grid container spacing={3}>
        {data.map((vocabulary) => (
          <Grid item xs={12} sm={6} md={3} key={vocabulary.id}>
            <VocabularyViewMode
              vocabulary={vocabulary}
              handleEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>

      {/* Dialog for editing vocabulary */}
      {editData && (
        <WEDialog
          open={dialogOpen}
          title="Edit Vocabulary"
          onCancel={handleCancel}
          onOk={handleSave}
        >
          <VocabularyEditForm editData={editData} setEditData={setEditData} />
        </WEDialog>
      )}
    </Stack>
  );
}
