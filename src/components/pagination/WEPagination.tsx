import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WEPaginationProps {
  page: number;
  totalPage: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function WEPagination({
  page,
  totalPage,
  onChange,
}: WEPaginationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        shape="rounded"
        count={totalPage}
        page={page}
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-page": {
            backgroundColor: isDarkMode ? color.gray900 : color.gray100,
            color: isDarkMode ? color.gray300 : color.gray800,
            border: `1px solid ${isDarkMode ? color.gray800 : color.gray300}`,
            transition: "all 0.3s ease",
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: isDarkMode ? color.teal700 : color.teal400,
            color: color.white,
            border: "none",
          },
          "& .MuiPaginationItem-previous, & .MuiPaginationItem-next": {
            backgroundColor: isDarkMode ? color.gray800 : color.gray200,
            color: isDarkMode ? color.gray300 : color.gray600,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray700 : color.gray300,
            },
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
