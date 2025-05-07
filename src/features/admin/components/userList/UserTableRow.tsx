import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Box,
  Collapse,
} from "@mui/material";
import {
  Edit,
  Delete,
  SwapHoriz,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User, RolesEnum } from "interfaces";
import UserDetailsPanel from "./UserDetailsPanel";

interface UserTableRowProps {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: (name: string) => void;
  onChangeStatus: (user: User) => void;
  onRemove: (user: User) => void;
}

export default function UserTableRow({
  user,
  isOpen,
  onToggle,
  onEdit,
  onChangeStatus,
  onRemove,
}: UserTableRowProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <React.Fragment>
      <TableRow
        hover
        sx={{
          "&:hover": {
            bgcolor: isDarkMode
              ? `${color.gray800}80` // Adding transparency
              : `${color.gray100}80`,
          },
          transition: "all 0.3s ease",
          borderLeft: isOpen
            ? `3px solid ${isDarkMode ? color.teal400 : color.teal600}`
            : "3px solid transparent",
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              transition: "transform 0.3s, background-color 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              backgroundColor: isOpen
                ? isDarkMode
                  ? `${color.teal900}60`
                  : `${color.teal100}90`
                : "transparent",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? `${color.teal900}80`
                  : `${color.teal100}`,
              },
              width: 30,
              height: 30,
            }}
          >
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell
          sx={{
            textAlign: "center",
            display: { xs: "none", sm: "none", md: "table-cell" },
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{
              width: 42,
              height: 42,
              border: `2px solid ${isDarkMode ? color.teal600 : color.teal400}`,
              margin: "0 auto",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: `0 2px 10px ${
                isDarkMode
                  ? "rgba(20, 184, 166, 0.2)"
                  : "rgba(20, 184, 166, 0.3)"
              }`,
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: `0 4px 12px ${
                  isDarkMode
                    ? "rgba(20, 184, 166, 0.4)"
                    : "rgba(20, 184, 166, 0.5)"
                }`,
              },
            }}
          />
        </TableCell>

        <TableCell
          sx={{
            textAlign: "center",
            fontWeight: 500,
            fontSize: "0.95rem",
            color: isDarkMode ? color.gray100 : color.gray800,
          }}
        >
          {user.name}
        </TableCell>

        <TableCell
          sx={{
            textAlign: "center",
            display: { xs: "none", sm: "none", md: "table-cell" },
            color: isDarkMode ? color.gray300 : color.gray700,
          }}
        >
          {user.role}
        </TableCell>

        <TableCell
          sx={{
            textAlign: "center",
            display: { xs: "none", sm: "none", md: "table-cell" },
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              bgcolor:
                user.status === true
                  ? isDarkMode
                    ? color.green700
                    : color.green300
                  : isDarkMode
                  ? color.red700
                  : color.red300,
              color: isDarkMode ? color.white : color.gray900,
              fontWeight: "bold",
              fontSize: "0.85rem",
              borderRadius: "1rem",
              padding: "4px 16px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              },
            }}
          >
            {user.status ? "Active" : "Inactive"}
          </Box>
        </TableCell>

        <TableCell sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
            {user.role === RolesEnum.TEACHER_ADVANCE && (
              <IconButton
                size="small"
                onClick={() => onEdit(user.name)}
                sx={{
                  color: isDarkMode ? color.edit : color.edit,
                  "&:hover": {
                    bgcolor: isDarkMode
                      ? "rgba(255, 208, 20, 0.15)"
                      : "rgba(255, 208, 20, 0.15)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}

            <IconButton
              size="small"
              onClick={() => onChangeStatus(user)}
              sx={{
                color: isDarkMode ? color.info : color.info,
                "&:hover": {
                  bgcolor: isDarkMode
                    ? "rgba(37, 99, 235, 0.15)"
                    : "rgba(37, 99, 235, 0.15)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <SwapHoriz fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => onRemove(user)}
              sx={{
                color: isDarkMode ? color.error : color.delete,
                "&:hover": {
                  bgcolor: isDarkMode
                    ? "rgba(220, 38, 38, 0.15)"
                    : "rgba(255, 102, 85, 0.15)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow
        sx={{
          bgcolor: isDarkMode ? color.teal900 : color.teal50,
          "& > td": {
            padding: 0,
            border: isOpen
              ? `1px solid ${isDarkMode ? color.teal700 : color.teal300}`
              : "none",
            borderTop: "none",
          },
        }}
      >
        <TableCell colSpan={7}>
          <Collapse in={isOpen} unmountOnExit>
            <UserDetailsPanel user={user} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
