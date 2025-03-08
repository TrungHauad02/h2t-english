import { Stack, Grid } from "@mui/material";
import { useState } from "react";
import { Vocabulary, WordType } from "interfaces";
import VocabularyViewMode from "./VocabularyViewMode";
import VocabularyEditForm from "./VocabularyEditForm";
import WEDialog from "components/display/dialog/WEDialog";

interface ListVocabularyProps {
  data: Vocabulary[];
  setData: (data: Vocabulary[]) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
}

export default function ListVocabulary({
  data,
  setData,
  isAddDialogOpen,
  setIsAddDialogOpen,
}: ListVocabularyProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<Vocabulary | null>(null);
  const [newVocabularyData, setNewVocabularyData] = useState<Vocabulary>({
    id: 0,
    word: "",
    phonetic: "",
    meaning: "",
    example: "",
    wordType: WordType.NOUN,
    image: "",
    status: true,
    topicId: 0,
  });

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

  const handleAddCancel = () => {
    setIsAddDialogOpen(false);
    setNewVocabularyData({
      id: 0,
      word: "",
      phonetic: "",
      meaning: "",
      example: "",
      wordType: WordType.NOUN,
      image: "",
      status: true,
      topicId: 0,
    });
  };

  const handleSave = () => {
    if (editData) {
      const newData = data.map((v) => (v.id === editData.id ? editData : v));
      setData(newData);
      setDialogOpen(false);
      setEditData(null);
    }
  };

  const handleAddSave = () => {
    const newId = data.length > 0 ? Math.max(...data.map((v) => v.id)) + 1 : 1;

    const topicId = data.length > 0 ? data[0].topicId : 0;

    const newVocabulary = {
      ...newVocabularyData,
      id: newId,
      topicId: topicId,
    };

    setData([...data, newVocabulary]);

    setIsAddDialogOpen(false);
    setNewVocabularyData({
      id: 0,
      word: "",
      phonetic: "",
      meaning: "",
      example: "",
      wordType: WordType.NOUN,
      image: "",
      status: true,
      topicId: 0,
    });
  };

  return (
    <Stack>
      <Grid container spacing={3}>
        {data.map((vocabulary) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={vocabulary.id}>
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

      {/* Dialog for adding new vocabulary */}
      <WEDialog
        open={isAddDialogOpen}
        title="Add New Vocabulary"
        onCancel={handleAddCancel}
        onOk={handleAddSave}
      >
        <VocabularyEditForm
          editData={newVocabularyData}
          setEditData={setNewVocabularyData}
        />
      </WEDialog>
    </Stack>
  );
}
