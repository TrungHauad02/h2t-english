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
import TranslateIcon from "@mui/icons-material/Translate";
import { WEButton } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Toeic } from "interfaces";
import CreateToeicDialog from "./CreateToeicDialog";

interface ToeicsHeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  statusFilter: boolean | null | undefined;
  handleStatusFilterChange: (status: string) => void;
  handleSearch: () => void;
  createToeicTest: (data: Partial<Toeic>) => Promise<any>;
}

export default function ToeicsHeader({
  searchText,
  setSearchText,
  statusFilter,
  handleStatusFilterChange,
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

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic({
      ...newToeic,
      title: event.target.value,
    });
  };

  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic({
      ...newToeic,
      duration: Number(event.target.value),
    });
  };

  const handleCreateToeic = async () => {
    // Basic validation
    if (!newToeic.title || !newToeic.duration) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Create the toeic test
      await createToeicTest(newToeic);
      
      // Reset form and close dialog
      setNewToeic({
        title: "",
        duration: 120,
        totalQuestions: 200,
        status: true,
      });
      
      handleOpenCreateDialog();
    } catch (error) {
      console.error("Error creating TOEIC test:", error);
      alert("Failed to create TOEIC test. Please try again.");
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
            <TranslateIcon
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
              Manage TOEIC Tests
            </Typography>
          </Box>

          <Tooltip 
            title="Create a new TOEIC test" 
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
              Create New TOEIC Test
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
            placeholder="Search TOEIC tests by title..."
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
              value={statusFilter === null ? "all" : statusFilter ? "published" : "unpublished"}
              onChange={(e) => handleStatusFilterChange(e.target.value as string)}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="unpublished">Unpublished</MenuItem>
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

      {/* Create TOEIC Dialog */}
      <CreateToeicDialog
        isOpenCreateDialog={isOpenCreateDialog}
        handleOpenCreateDialog={handleOpenCreateDialog}
        data={newToeic}
        onChangeTitle={handleChangeTitle}
        onChangeDuration={handleChangeDuration}
        onCreateToeic={handleCreateToeic}
      />

      {/* Filter Dialog */}
      {/* <WEAdvanceFilter
        filter={{
          status: statusFilter,
          title: searchText,
          sortBy: "-createdAt",
        }}
        updateFilter={(updates) => {
          if (updates.title !== undefined) setSearchText(updates.title);
          if (updates.status !== undefined) {
            if (updates.status === null) {
              handleStatusFilterChange("all");
            } else if (updates.status === true) {
              handleStatusFilterChange("published");
            } else {
              handleStatusFilterChange("unpublished");
            }
          }
        }}
        open={isOpenFilterDialog}
        onClose={handleOpenFilterDialog}
        onApply={handleSearch}
      /> */}
    </Stack>
  );
}