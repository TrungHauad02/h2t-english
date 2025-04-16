import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import useManageCompetitionsPage from "../hooks/useManageCompetitionsPage";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";
import {
  SearchFilterSection,
  TabsNavigation,
  CompetitionsGrid,
  PaginationSection,
} from "../components/manageCompetition";
import CreateCompetitionDialog from "../components/CreateCompetitionDialog";

export default function ManageCompetitionsPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = React.useState(0);

  // State for create dialog
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [newCompetition, setNewCompetition] = useState<Partial<CompetitionTest>>({
    title: "",
    duration: 60,
    totalQuestions: null,
    status: true,
    startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
  });

  const {
    searchText,
    setSearchText,
    statusFilter,
    handleStatusFilterChange,
    competitions,
    page,
    itemsPerPage,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    totalPages,
    displayedCompetitions,
    upcomingCompetitions,
    activeCompetitions,
    pastCompetitions,
    createCompetition,
  } = useManageCompetitionsPage();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Dialog handlers
  const handleOpenCreateDialog = () => {
    setIsOpenCreateDialog(!isOpenCreateDialog);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompetition({
      ...newCompetition,
      title: event.target.value,
    });
  };

  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompetition({
      ...newCompetition,
      duration: Number(event.target.value),
    });
  };

  const handleChangeTotalQuestions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompetition({
      ...newCompetition,
      totalQuestions: event.target.value === "" ? null : Number(event.target.value),
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

  const handleCreateCompetition = () => {
    // Basic validation
    if (!newCompetition.title || !newCompetition.duration || !newCompetition.startTime || !newCompetition.endTime) {
      alert("Please fill in all required fields");
      return;
    }

    if (newCompetition.startTime >= newCompetition.endTime) {
      alert("End time must be after start time");
      return;
    }

    // Create the competition
    createCompetition(newCompetition as CompetitionTest);
    
    // Reset form and close dialog
    setNewCompetition({
      title: "",
      duration: 60,
      totalQuestions: null,
      status: true,
      startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
      endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
    });
    handleOpenCreateDialog();
  };

  const backgroundGradient = isDarkMode
    ? `linear-gradient(135deg, ${color.gray900}, ${color.gray800})`
    : `linear-gradient(135deg, ${color.emerald50}, ${color.teal50})`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={isDarkMode ? 3 : 1}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              boxShadow: isDarkMode
                ? "0 6px 24px rgba(0,0,0,0.4)"
                : "0 6px 24px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: `linear-gradient(90deg, ${color.teal500}, ${color.emerald400})`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                mb: { xs: 3, md: 4 },
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmojiEventsIcon
                  sx={{
                    fontSize: { xs: 28, sm: 32 },
                    color: isDarkMode ? color.teal300 : color.teal600,
                  }}
                />
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight="bold"
                  sx={{
                    background: isDarkMode
                      ? `linear-gradient(90deg, ${color.teal300}, ${color.emerald300})`
                      : `linear-gradient(90deg, ${color.teal600}, ${color.emerald600})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Manage Competitions
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleOpenCreateDialog}
                sx={{
                  backgroundColor: color.btnSubmitBg,
                  "&:hover": {
                    backgroundColor: color.btnSubmitHoverBg,
                  },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: "600",
                  boxShadow: isDarkMode
                    ? "0 4px 10px rgba(16, 185, 129, 0.3)"
                    : "0 4px 10px rgba(16, 185, 129, 0.2)",
                }}
              >
                Create New Competition
              </Button>
            </Box>

            <SearchFilterSection
              searchText={searchText}
              setSearchText={setSearchText}
              statusFilter={statusFilter}
              handleStatusFilterChange={handleStatusFilterChange}
              handleSearch={handleSearch}
            />

            <TabsNavigation
              tabValue={tabValue}
              handleTabChange={handleTabChange}
              competitions={competitions}
              activeCompetitions={activeCompetitions}
              upcomingCompetitions={upcomingCompetitions}
              pastCompetitions={pastCompetitions}
            />

            <CompetitionsGrid displayedCompetitions={displayedCompetitions} />

            <PaginationSection
              totalPages={totalPages}
              page={page}
              itemsPerPage={itemsPerPage}
              handleChangePage={handleChangePage}
              handleItemsPerPageChange={handleItemsPerPageChange}
              displayedCompetitions={displayedCompetitions}
            />
          </Paper>
        </Fade>
      </Container>

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
    </Box>
  );
}