import React from "react";
import { TableRow, TableCell } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function UserTableHeader() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <TableRow
      sx={{
        bgcolor: isDarkMode ? color.emerald900 : color.emerald100,
        "& .MuiTableCell-root": {
          borderBottom: `2px solid ${
            isDarkMode ? color.emerald700 : color.emerald300
          }`,
          color: isDarkMode ? color.emerald100 : color.emerald900,
          fontSize: "0.95rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      }}
    >
      <TableCell
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          width: "60px",
          padding: { xs: "10px 5px", md: "12px 16px" },
        }}
      />
      <TableCell
        sx={{
          fontWeight: "bold",
          display: { xs: "none", sm: "none", md: "table-cell" },
          width: "80px",
          padding: { xs: "10px 5px", md: "12px 16px" },
        }}
      >
        Avatar
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          padding: { xs: "10px 5px", md: "12px 16px" },
        }}
      >
        Name
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          display: { xs: "none", sm: "none", md: "table-cell" },
          padding: { xs: "10px 5px", md: "12px 16px" },
        }}
      >
        Role
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          display: { xs: "none", sm: "none", md: "table-cell" },
          padding: { xs: "10px 5px", md: "12px 16px" },
        }}
      >
        Status
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          width: "140px",
          padding: { xs: "10px 5px", md: "12px 16px" },
        }}
      >
        Actions
      </TableCell>
    </TableRow>
  );
}
