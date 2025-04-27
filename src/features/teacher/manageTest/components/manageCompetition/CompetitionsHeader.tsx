import React, { useState } from "react";
import { Stack } from "@mui/material";
import { WEButton } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { CompetitionTest, CompetitionTestFilter } from "interfaces";
import CreateCompetitionDialog from "./CreateCompetitionDialog";
import CompetitionAdvancedFilter from "./CompetitionAdvancedFilter";
import SearchBar from "../common/SearchBar";

interface CompetitionsHeaderProps {
  filter: CompetitionTestFilter;
  updateFilter: (updates: Partial<CompetitionTestFilter>) => void;
  handleSearch: () => void;
  createCompetition: (data: Partial<CompetitionTest>) => Promise<any>;
}

export default function CompetitionsHeader({
  filter,
  updateFilter,
  handleSearch,
  createCompetition,
}: CompetitionsHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false);
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState<boolean>(false);
  const [newCompetition, setNewCompetition] = useState<Partial<CompetitionTest>>({
    title: "",
    duration: 60,
    totalQuestions: null,
    status: true,
    startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
  });

  const handleOpenCreateDialog = () => {
    setIsOpenCreateDialog(!isOpenCreateDialog);
  };

  const handleOpenFilterDialog = () => {
    setIsOpenFilterDialog(!isOpenFilterDialog);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompetition({
      ...newCompetition,
      title: e.target.value,
    });
  };

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompetition({
      ...newCompetition,
      duration: Number(e.target.value),
    });
  };

  const handleChangeTotalQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompetition({
      ...newCompetition,
      totalQuestions: e.target.value === "" ? null : Number(e.target.value),
    });
  };

  const handleChangeStartTime = (date: Date | null) => {
    if (date) {
      setNewCompetition({
        ...newCompetition,
        startTime: date,
      });
    }
  };

  const handleChangeEndTime = (date: Date | null) => {
    if (date) {
      setNewCompetition({
        ...newCompetition,
        endTime: date,
      });
    }
  };

  const handleCreateCompetition = async () => {
    try {
      await createCompetition(newCompetition);
      setNewCompetition({
        title: "",
        duration: 60,
        totalQuestions: null,
        status: true,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
      });
      handleOpenCreateDialog();
    } catch (error) {
      console.error("Error creating competition:", error);
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
          Create Competition
        </WEButton>
      </Stack>

      {/* Create Competition Dialog */}
      <CreateCompetitionDialog
        isOpenCreateDialog={isOpenCreateDialog}
        handleOpenCreateDialog={handleOpenCreateDialog}
        data={newCompetition}
        onChangeTitle={handleChangeTitle}
        onChangeDuration={handleChangeDuration}
        onChangeTotalQuestions={handleChangeTotalQuestions}
        onChangeStartTime={handleChangeStartTime}
        onChangeEndTime={handleChangeEndTime}
        onCreateCompetition={handleCreateCompetition}
      />

      {/* Filter Dialog */}
      <CompetitionAdvancedFilter
        filter={filter}
        updateFilter={updateFilter}
        open={isOpenFilterDialog}
        onClose={handleOpenFilterDialog}
        onApply={handleSearch}
      />
    </Stack>
  );
}