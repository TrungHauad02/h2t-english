import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { format } from "date-fns";
import StatCard from "./historyTest/StatCard";
import {
  calculateAverageScore,
  calculateHighestScore,
  getChipColorByType,
  getTestTypeIcon,
  getIconColorByType,
  getScoreColor,
} from "./historyTest/utils";
import useListHistoryTest from "./historyTest/useListHistoryTest";

export default function ListHistoryTest() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Text color based on dark mode
  const textColor = isDarkMode ? color.gray100 : color.gray800;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;
  const paperBgColor = isDarkMode ? color.gray800 : color.white;
  const headerBgColor = isDarkMode ? color.gray700 : color.gray100;
  const hoverBgColor = isDarkMode ? color.gray700 : color.gray200;
  const borderColor = isDarkMode ? color.gray600 : color.gray300;

  const hooks = useListHistoryTest();

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 3,
          color: textColor,
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 600,
        }}
      >
        <TrendingUpIcon
          sx={{
            mr: 1,
            color: isDarkMode ? color.teal400 : color.teal600,
            fontSize: 32,
          }}
        />
        Test History Dashboard
      </Typography>

      {/* Stats Summary at top for better visibility */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard
          title="Average Score"
          value={calculateAverageScore(hooks.filteredHistory)}
          icon={<TrendingUpIcon />}
          color={isDarkMode ? color.teal400 : color.teal600}
          isDarkMode={isDarkMode}
          paperBgColor={paperBgColor}
        />
        <StatCard
          title="Tests Taken"
          value={hooks.filteredHistory.length.toString()}
          icon={<AssignmentIcon />}
          color={isDarkMode ? color.emerald400 : color.emerald600}
          isDarkMode={isDarkMode}
          paperBgColor={paperBgColor}
        />
        <StatCard
          title="High Score"
          value={calculateHighestScore(hooks.filteredHistory)}
          icon={<EmojiEventsIcon />}
          color={isDarkMode ? color.green400 : color.green600}
          isDarkMode={isDarkMode}
          paperBgColor={paperBgColor}
        />
      </Box>

      {/* Tabs for different test types */}
      <Paper
        elevation={isDarkMode ? 1 : 3}
        sx={{
          mb: 3,
          bgcolor: paperBgColor,
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${borderColor}`,
        }}
      >
        <Tabs
          value={hooks.activeTab}
          onChange={hooks.handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            borderBottom: 1,
            borderColor: borderColor,
            bgcolor: headerBgColor,
            "& .MuiTab-root": {
              fontWeight: 600,
              transition: "all 0.2s ease",
              color: secondaryTextColor,
              py: 1.5,
              "&.Mui-selected": {
                color: isDarkMode ? color.teal400 : color.teal600,
              },
            },
          }}
        >
          <Tab
            label="All Tests"
            icon={<FilterListIcon />}
            iconPosition="start"
          />
          <Tab
            label="Regular Tests"
            icon={<AssignmentIcon />}
            iconPosition="start"
          />
          <Tab label="TOEIC Tests" icon={<SchoolIcon />} iconPosition="start" />
          <Tab
            label="Competitions"
            icon={<EmojiEventsIcon />}
            iconPosition="start"
          />
        </Tabs>

        {/* Filter controls */}
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            backgroundColor: isDarkMode ? color.gray800 : color.gray50,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <TextField
            label="Search tests"
            variant="outlined"
            size="small"
            value={hooks.searchTerm}
            onChange={hooks.handleSearchChange}
            sx={{
              flexGrow: 1,
              minWidth: "200px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: isDarkMode ? color.gray700 : color.white,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: isDarkMode ? color.teal400 : color.teal600,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color={isDarkMode ? "info" : "primary"} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: "150px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: isDarkMode ? color.gray700 : color.white,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: isDarkMode ? color.teal400 : color.teal600,
              },
            }}
          >
            <InputLabel>Test Type</InputLabel>
            <Select
              value={hooks.filterType}
              label="Test Type"
              onChange={hooks.handleFilterChange}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="READING">Reading</MenuItem>
              <MenuItem value="LISTENING">Listening</MenuItem>
              <MenuItem value="WRITING">Writing</MenuItem>
              <MenuItem value="SPEAKING">Speaking</MenuItem>
              <MenuItem value="MIXING">Mixing</MenuItem>
              <MenuItem value="TOEIC">TOEIC</MenuItem>
              <MenuItem value="COMPETITION">Competition</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{
              minWidth: "120px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: isDarkMode ? color.gray700 : color.white,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: isDarkMode ? color.teal400 : color.teal600,
              },
            }}
          >
            <InputLabel>Sort By</InputLabel>
            <Select
              value={hooks.sortBy}
              label="Sort By"
              onChange={hooks.handleSortChange}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="score">Score</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>

          <Tooltip
            title={hooks.sortDirection === "asc" ? "Ascending" : "Descending"}
          >
            <IconButton
              onClick={hooks.toggleSortDirection}
              sx={{
                border: 1,
                borderColor: isDarkMode ? color.teal400 : color.teal600,
                borderRadius: "8px",
                color: isDarkMode ? color.teal400 : color.teal600,
                backgroundColor: isDarkMode
                  ? "rgba(94, 234, 212, 0.08)"
                  : "rgba(20, 184, 166, 0.08)",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? "rgba(94, 234, 212, 0.15)"
                    : "rgba(20, 184, 166, 0.15)",
                },
                "& svg": {
                  transform:
                    hooks.sortDirection === "asc"
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  transition: "transform 0.3s",
                },
              }}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Table of test history */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            mb: 0,
            bgcolor: "transparent",
            maxHeight: "calc(100vh - 350px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            },
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="test history table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: "bold",
                    backgroundColor: headerBgColor,
                  }}
                >
                  Test Title
                </TableCell>
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: "bold",
                    backgroundColor: headerBgColor,
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: "bold",
                    backgroundColor: headerBgColor,
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: "bold",
                    backgroundColor: headerBgColor,
                  }}
                >
                  Duration
                </TableCell>
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: "bold",
                    backgroundColor: headerBgColor,
                  }}
                >
                  Score
                </TableCell>
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: "bold",
                    backgroundColor: headerBgColor,
                  }}
                >
                  Comment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hooks.loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              ) : hooks.paginatedHistory.length > 0 ? (
                hooks.paginatedHistory.map((record) => (
                  <Fade in={true} key={`${record.type}-${record.id}`}>
                    <TableRow
                      sx={{
                        transition: "background-color 0.2s",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: hoverBgColor,
                        },
                        borderBottom: `1px solid ${borderColor}`,
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          color: textColor,
                          fontWeight: "medium",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              color: getIconColorByType(
                                record.testType || "",
                                isDarkMode,
                                color
                              ),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {getTestTypeIcon(record.testType || record.type)}
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {record.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={record.testType || "Unknown"}
                          size="small"
                          sx={{
                            bgcolor: getChipColorByType(
                              record.testType || "",
                              isDarkMode,
                              color
                            ),
                            color: "white",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            px: 0.5,
                            "& .MuiChip-label": {
                              px: 1.5,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: secondaryTextColor }}>
                        {format(record.date, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell sx={{ color: secondaryTextColor }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box component="span" sx={{ fontWeight: 500 }}>
                            {record.duration}
                          </Box>
                          <Box component="span" sx={{ ml: 0.5 }}>
                            min
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            record.score !== null
                              ? `${record.score}/${record.maxScore}`
                              : "Pending"
                          }
                          size="small"
                          sx={{
                            bgcolor: getScoreColor(
                              record.score,
                              record.maxScore,
                              isDarkMode,
                              color
                            ),
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                            "& .MuiChip-label": {
                              px: 1.5,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          color: secondaryTextColor,
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Tooltip
                          title={record.comment || "No comment"}
                          arrow
                          placement="top"
                        >
                          <Box component="span">
                            {record.comment || "No comment"}
                          </Box>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ py: 4, color: secondaryTextColor }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <AssignmentIcon sx={{ fontSize: 48, opacity: 0.5 }} />
                      <Typography variant="body1">
                        No test history found.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
            borderTop: `1px solid ${borderColor}`,
            backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="body2" sx={{ color: secondaryTextColor }}>
              {`Showing ${hooks.paginatedHistory.length} of ${hooks.filteredHistory.length} entries`}
            </Typography>
            <Pagination
              count={Math.ceil(
                hooks.filteredHistory.length / hooks.rowsPerPage
              )}
              page={hooks.page}
              onChange={hooks.handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: textColor,
                },
                "& .Mui-selected": {
                  backgroundColor: isDarkMode
                    ? "rgba(94, 234, 212, 0.2)"
                    : "rgba(20, 184, 166, 0.2)",
                  color: isDarkMode ? color.teal300 : color.teal700,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(94, 234, 212, 0.3)"
                      : "rgba(20, 184, 166, 0.3)",
                  },
                },
              }}
            />
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
