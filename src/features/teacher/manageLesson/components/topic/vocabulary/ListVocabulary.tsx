import { Stack, Grid } from "@mui/material";
import { useState } from "react";
import { Vocabulary, WordType } from "interfaces";
import VocabularyViewMode from "./VocabularyViewMode";
import VocabularyEditForm from "./VocabularyEditForm";
import WEDialog from "components/display/dialog/WEDialog";
import { useParams } from "react-router-dom";
import { vocabService } from "features/teacher/manageLesson/services/vocabService";

interface ListVocabularyProps {
  data: Vocabulary[];
  fetchData: () => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;
}

export default function ListVocabulary({
  data,
  fetchData,
  isAddDialogOpen,
  setIsAddDialogOpen,
}: ListVocabularyProps) {
  const { id } = useParams();
  const emptyVocab: Vocabulary = {
    id: 0,
    word: "",
    phonetic: "",
    meaning: "",
    example: "",
    wordType: WordType.NOUN,
    image: "",
    status: true,
    topicId: id ? parseInt(id) : 0,
  };
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<Vocabulary | null>(null);
  const [newVocabularyData, setNewVocabularyData] =
    useState<Vocabulary>(emptyVocab);

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
    setNewVocabularyData(emptyVocab);
  };

  const handleSave = async () => {
    if (editData) {
      // TODO: Save to db
      await vocabService.updateVocab(editData.id, editData);
      fetchData();
      setDialogOpen(false);
      setEditData(null);
    }
  };

  const handleAddSave = async () => {
    // Save to db
    if (!id) return;

    try {
      await vocabService.createVocab(newVocabularyData);
      // Load paginated data
      fetchData();
      // TODO: Display success
    } catch (error) {
      // TODO: Display error
      console.error("Error creating vocab");
    }

    setIsAddDialogOpen(false);
    setNewVocabularyData(emptyVocab);
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
