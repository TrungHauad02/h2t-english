import React, { useState } from "react";
import { Stack } from "@mui/material";
import { WEAdvanceFilter, WEButton } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Toeic, ToeicFilter } from "interfaces";
import CreateToeicDialog from "./CreateToeicDialog";
import SearchBar from "../common/SearchBar";
import { toast } from "react-toastify";

interface ToeicsHeaderProps {
  filter: ToeicFilter;
  updateFilter: (updates: Partial<ToeicFilter>) => void;
  handleSearch: () => void;
  createToeicTest: (data: Partial<Toeic>) => Promise<any>;
}

export default function ToeicsHeader({
  filter,
  updateFilter,
  handleSearch,
  createToeicTest,
}: ToeicsHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false);
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState<boolean>(false);
  const [newToeic, setNewToeic] = useState<Partial<Toeic>>({
    title: "",
    duration: 120,
    totalQuestions: 200,
    status: true,
  });

  const handleOpenCreateDialog = () => {
    setIsOpenCreateDialog(!isOpenCreateDialog);
  };

  const handleOpenFilterDialog = () => {
    setIsOpenFilterDialog(!isOpenFilterDialog);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic({
      ...newToeic,
      title: e.target.value,
    });
  };

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic({
      ...newToeic,
      duration: Number(e.target.value),
    });
  };

  const onCreateToeic = async () => {
    try {
      setNewToeic({
        title: "",
        duration: 120,
        totalQuestions: 200,
        status: false,
      });
      await createToeicTest(newToeic);

      handleOpenCreateDialog();
    } catch (error) {
      console.error("Error creating TOEIC test:", error);
      toast.error("Error creating TOEIC test");
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent={"space-between"}
      spacing={2}
      sx={{
        p: 1,
        px: 1.5,
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray950 : color.gray50,
      }}
    >
      {/* Search bar */}
      <SearchBar
        filter={filter}
        updateFilter={updateFilter}
        onSearch={handleSearch}
        onOpenFilterDialog={handleOpenFilterDialog}
      />

      {/* Actions */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}
      >
        <WEButton variant="contained" onClick={handleOpenCreateDialog}>
          Create TOEIC Test
        </WEButton>
      </Stack>

      {/* Create TOEIC Dialog */}
      <CreateToeicDialog
        isOpenCreateDialog={isOpenCreateDialog}
        handleOpenCreateDialog={handleOpenCreateDialog}
        data={newToeic}
        onChangeTitle={handleChangeTitle}
        onChangeDuration={handleChangeDuration}
        onCreateToeic={onCreateToeic}
      />

      {/* Filter Dialog */}
      <WEAdvanceFilter
        filter={filter}
        updateFilter={updateFilter}
        open={isOpenFilterDialog}
        onClose={handleOpenFilterDialog}
        onApply={handleSearch}
      />
    </Stack>
  );
}
