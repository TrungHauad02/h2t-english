import { TableHead, TableRow, TableCell } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TableHeaderProps {
  isMobile: boolean;
}

export default function TableHeader({ isMobile }: TableHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: isDarkMode ? color.gray700 : color.gray100,
          "& th": {
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 600,
            borderBottom: `2px solid ${isDarkMode ? color.gray600 : color.gray300}`,
          },
        }}
      >
        {!isMobile && <TableCell padding="checkbox"></TableCell>}
        <TableCell>User ID</TableCell>
        <TableCell>Request</TableCell>
        {!isMobile && <TableCell>Response</TableCell>}
        {!isMobile && <TableCell>Evaluation</TableCell>}
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}