import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ErrorLogTableHead() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const headers = [
    { id: "errorCode", label: "Error Code", width: "12%" },
    { id: "message", label: "Message", width: "24%" },
    { id: "severity", label: "Severity", width: "12%" },
    { id: "status", label: "Status", width: "12%" },
    { id: "createdAt", label: "Created", width: "15%" },
    { id: "updatedAt", label: "Updated", width: "15%" },
    { id: "actions", label: "Actions", width: "10%", align: "center" as const },
  ];

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          "& th": {
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 600,
            fontSize: "0.8125rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            padding: "12px 16px",
            borderBottom: `2px solid ${
              isDarkMode ? color.gray700 : color.gray300
            }`,
          },
        }}
      >
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.align}
            sx={{
              width: header.width,
              position: "relative",
              "&::after": header.id !== "actions" ? {
                content: '""',
                position: "absolute",
                right: 0,
                top: "25%",
                height: "50%",
                width: "1px",
                backgroundColor: isDarkMode ? color.gray700 : color.gray300,
              } : {},
            }}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}