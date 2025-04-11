import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import VocabularyCard from "./VocabularyCard";
import { WEPaginationSelect } from "components/pagination";
import { useEffect, useState } from "react";
import { Vocabulary } from "interfaces";
import { vocabService } from "services";
import { toast } from "react-toastify";

export default function FlashcardSection() {
  const { id } = useParams();
  const [listVocab, setListVocab] = useState<Vocabulary[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const resData = await vocabService.findVocabByTopicId(
            page,
            itemsPerPage,
            parseInt(id),
            { status: true }
          );
          setListVocab(resData.data.content);
          setTotalPage(resData.data.totalPages);
        } catch (error) {
          toast.error("Fetch data fail");
        }
      }
    };
    fetchData();
  }, [id, page, itemsPerPage]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (value: string | number) => {
    setItemsPerPage(value as number);
    setPage(1);
  };

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container direction={"row"}>
        {listVocab.map((vocab) => (
          <Grid xs={12} sm={6} md={4} lg={3}>
            <VocabularyCard vocab={vocab} />
          </Grid>
        ))}
      </Grid>
      <WEPaginationSelect
        page={page}
        totalPage={totalPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handleChangePage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Box>
  );
}
