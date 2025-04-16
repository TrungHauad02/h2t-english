import React from "react";
import {
  Box,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import PaginationIcon from "@mui/icons-material/FindInPage";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";

interface PaginationSectionProps {
  totalPages: number;
  page: number;
  itemsPerPage: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleItemsPerPageChange: (value: number) => void;
  displayedCompetitions: CompetitionTest[];
}

export default function PaginationSection({
  totalPages,
  page,
  itemsPerPage,
  handleChangePage,
  handleItemsPerPageChange,
  displayedCompetitions,
}: PaginationSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (displayedCompetitions.length === 0) {
    return null;
  }

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={isDarkMode ? 2 : 0}
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: "12px",
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "center" },
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
          >
            <PaginationIcon fontSize="small" />
            <Typography variant="body2" fontWeight="medium">
              Page {page} of {totalPages}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              size={isMobile ? "small" : "medium"}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: isDarkMode ? color.gray300 : color.gray700,
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                  "&.Mui-selected": {
                    backgroundColor: isDarkMode
                      ? color.teal700
                      : color.teal100,
                    color: isDarkMode ? color.white : color.teal800,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.teal600
                        : color.teal200,
                    },
                  },
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? color.gray600
                      : color.gray100,
                  },
                },
              }}
            />

            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 120,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDarkMode ? color.gray800 : color.white,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? color.teal700 : color.teal500,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: isDarkMode ? color.teal300 : color.teal600,
                },
              }}
            >
              <InputLabel>Items per page</InputLabel>
              <Select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                label="Items per page"
              >
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={16}>16</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
}