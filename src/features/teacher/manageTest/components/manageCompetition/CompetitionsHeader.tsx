import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Tooltip,
  Zoom,
  alpha,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {WEButton } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { CompetitionTest } from "interfaces";
import CreateCompetitionDialog from "./CreateCompetitionDialog";
import CompetitionAdvancedFilter from "./CompetitionAdvancedFilter";
import { toast } from "react-toastify";
interface CompetitionsHeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  statusFilter: boolean | null ;
  handleStatusFilterChange: (status: string) => void;
  handleSearch: () => void;
  createCompetition: (data: Partial<CompetitionTest>) => Promise<any>;
}

export default function CompetitionsHeader({
  searchText,
  setSearchText,
  statusFilter,
  handleStatusFilterChange,
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

  const handleCreateCompetition = async () => {
    // Basic validation
    if (!newCompetition.title || !newCompetition.duration || !newCompetition.startTime || !newCompetition.endTime) {
     toast.error("Please fill in all required fields");
      return;
    }

    if (newCompetition.startTime >= newCompetition.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      // Create the competition
      await createCompetition(newCompetition);
      
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
    } catch (error) {
      console.error("Error creating competition:", error);
      toast.error("Failed to create competition. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <Stack spacing={3} sx={{ mb: 3 }}>
      {/* Title Section with animation */}
      <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "100%",
              height: "1px",
              background: isDarkMode 
                ? `linear-gradient(90deg, ${alpha(color.teal600, 0)}, ${color.teal600}, ${alpha(color.teal600, 0)})`
                : `linear-gradient(90deg, ${alpha(color.teal500, 0)}, ${color.teal500}, ${alpha(color.teal500, 0)})`,
            }
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EmojiEventsIcon
              sx={{
                fontSize: { xs: 28, sm: 36 },
                color: isDarkMode ? color.teal300 : color.teal600,
                filter: `drop-shadow(0 2px 4px ${isDarkMode ? 'rgba(20, 184, 166, 0.3)' : 'rgba(20, 184, 166, 0.2)'})`,
              }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: isDarkMode
                  ? `linear-gradient(90deg, ${color.teal300}, ${color.emerald300})`
                  : `linear-gradient(90deg, ${color.teal600}, ${color.emerald600})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
                textShadow: isDarkMode
                  ? '0 2px 10px rgba(20, 184, 166, 0.2)'
                  : 'none',
              }}
            >
              Manage Competitions
            </Typography>
          </Box>

          <Tooltip 
            title="Create a new competition" 
            placement="left"
            TransitionComponent={Zoom}
            arrow
          >
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleOpenCreateDialog}
              sx={{
                backgroundColor: color.btnSubmitBg,
                "&:hover": {
                  backgroundColor: color.btnSubmitHoverBg,
                  transform: 'translateY(-2px)',
                  boxShadow: isDarkMode
                    ? '0 6px 16px rgba(16, 185, 129, 0.4)'
                    : '0 6px 16px rgba(16, 185, 129, 0.3)',
                },
                px: { xs: 2, md: 3 },
                py: 1,
                borderRadius: "10px",
                fontWeight: "600",
                boxShadow: isDarkMode
                  ? "0 4px 10px rgba(16, 185, 129, 0.3)"
                  : "0 4px 10px rgba(16, 185, 129, 0.2)",
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Create New Competition
            </Button>
          </Tooltip>
        </Box>
      </Zoom>

      {/* Search/Filter Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent={"space-between"}
        spacing={2}
        sx={{
          p: 1.5,
          px: 2,
          borderRadius: "12px",
          bgcolor: isDarkMode ? alpha(color.gray900, 0.7) : alpha(color.gray50, 0.7),
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          backdropFilter: 'blur(8px)',
          boxShadow: isDarkMode 
            ? 'inset 0 1px 1px rgba(255, 255, 255, 0.05)'
            : 'inset 0 1px 1px rgba(255, 255, 255, 0.7)',
        }}
      >
        {/* Search Field */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "70%" } }}
        >
          <TextField
            fullWidth
            placeholder="Search competitions by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchText && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                borderRadius: "8px",
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: isDarkMode 
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  boxShadow: isDarkMode 
                    ? `0 0 0 2px ${alpha(color.teal600, 0.4)}` 
                    : `0 0 0 2px ${alpha(color.teal500, 0.3)}`,
                }
              },
            }}
          />

          <FormControl 
            size="small" 
            sx={{ 
              minWidth: 140,
              "& .MuiOutlinedInput-root": {
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                borderRadius: "8px",
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: isDarkMode 
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
              }
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter === null ? "all" : statusFilter ? "published" : "draft"}
              onChange={(e) => handleStatusFilterChange(e.target.value as string)}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Advanced filters" placement="top" arrow>
            <WEButton 
              variant="outlined" 
              startIcon={<FilterAltIcon />}
              onClick={handleOpenFilterDialog}
              sx={{
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                borderColor: isDarkMode ? color.gray600 : color.gray300,
                color: isDarkMode ? color.gray300 : color.gray700,
                borderRadius: "8px",
                transition: 'all 0.2s',
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                  borderColor: isDarkMode ? color.gray500 : color.gray400,
                  transform: 'translateY(-2px)',
                  boxShadow: isDarkMode 
                    ? '0 4px 8px rgba(0, 0, 0, 0.25)' 
                    : '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              Filters
            </WEButton>
          </Tooltip>
        </Stack>

        {/* Search Button */}
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal600,
            "&:hover": {
              backgroundColor: isDarkMode ? color.teal600 : color.teal500,
              transform: 'translateY(-2px)',
              boxShadow: isDarkMode 
                ? '0 4px 12px rgba(20, 184, 166, 0.3)' 
                : '0 4px 12px rgba(20, 184, 166, 0.2)',
            },
            width: { xs: "100%", md: "auto" },
            borderRadius: "8px",
            fontWeight: "500",
            transition: 'all 0.2s',
            boxShadow: isDarkMode 
              ? '0 2px 8px rgba(0, 0, 0, 0.25)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          Search
        </Button>
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
        filter={{
          status: statusFilter ?? null, 
          title: searchText,
          sortBy: "-createdAt",
        }}
        updateFilter={(updates) => {
          if (updates.title !== undefined) setSearchText(updates.title);
          if (updates.status !== null) {
            if (updates.status === null) {
              handleStatusFilterChange("all");
            } else if (updates.status === true) {
              handleStatusFilterChange("published");
            } else {
              handleStatusFilterChange("draft");
            }
          }
        }}
        open={isOpenFilterDialog}
        onClose={handleOpenFilterDialog}
        onApply={handleSearch}
      />
    </Stack>
  );
}