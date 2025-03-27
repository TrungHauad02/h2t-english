import { Box, Button, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ListVocabulary } from "./vocabulary";
import AddIcon from "@mui/icons-material/Add";
import { Vocabulary } from "interfaces";
import { useEffect, useState } from "react";
import { vocabService } from "../../services/vocabService";
import { useParams } from "react-router-dom";
import { WEPaginationSelect } from "components/pagination";
import SectionHeader from "../SectionHeader";

export default function VocabularySection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const [data, setData] = useState<Vocabulary[]>([]);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      if (id) {
        const resData = await vocabService.getVocabByTopicId(
          page,
          itemsPerPage,
          parseInt(id)
        );
        setData(resData.data.content);
        setTotalItems(resData.data.totalElements);
      }
    } catch (error) {
      console.error("Error fetching topics");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, page, itemsPerPage]);

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
  };

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        my: 4,
      }}
    >
      <SectionHeader
        title={`Vocabulary (${data.length})`}
        icon={<MenuBookIcon />}
        isEditMode={isEditMode}
        handleEditMode={handleEditClick}
        handleCancelEdit={handleCancelEdit}
        handleSaveChanges={handleSaveChanges}
      />
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{
            bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
            color: "white",
            "&:hover": {
              bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
            },
          }}
        >
          Add Vocabulary
        </Button>
      </Box>
      <ListVocabulary
        data={data}
        fetchData={fetchData}
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditMode={isEditMode}
      />
      <WEPaginationSelect
        page={page}
        totalPage={Math.ceil(totalItems / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Box>
  );
}
