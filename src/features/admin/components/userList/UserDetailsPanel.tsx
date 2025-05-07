import { Box, Grid } from "@mui/material";
import {
  Person,
  Email,
  Phone,
  CalendarToday,
  School,
} from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User, RolesEnum } from "interfaces";
import UserDetailItem from "./UserDetailItem";
import { formatDateShort } from "utils/format";

interface UserDetailsPanelProps {
  user: User;
}

export default function UserDetailsPanel({ user }: UserDetailsPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Xác định xem có hiển thị level hay không dựa trên role
  const shouldShowLevel = user.role !== RolesEnum.STUDENT;

  return (
    <Box
      sx={{
        margin: 2,
        padding: 2.5,
        borderRadius: "1rem",
        bgcolor: isDarkMode ? `${color.teal900}` : "rgba(20, 184, 166, 0.05)",
        boxShadow: isDarkMode
          ? "inset 0 2px 12px rgba(0,0,0,0.2)"
          : "inset 0 2px 10px rgba(0,0,0,0.05)",
        border: `1px solid ${
          isDarkMode ? "rgba(20, 184, 166, 0.2)" : "rgba(20, 184, 166, 0.1)"
        }`,
        backdropFilter: isDarkMode ? "blur(4px)" : "none",
        position: "relative",
        "&:before": isDarkMode
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "1rem",
              background:
                "linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(5, 150, 105, 0) 100%)",
              pointerEvents: "none",
            }
          : {},
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UserDetailItem
            icon={<Person />}
            label="Role"
            value={user.role}
            color={isDarkMode ? color.teal200 : color.teal700}
          />

          <UserDetailItem
            icon={<Email />}
            label="Email"
            value={user.email}
            color={isDarkMode ? color.teal200 : color.teal700}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          {(user.role === RolesEnum.TEACHER ||
            user.role === RolesEnum.TEACHER_ADVANCE) && (
            <>
              <UserDetailItem
                icon={<Phone />}
                label="Phone"
                value={user.phoneNumber || "N/A"}
                color={isDarkMode ? color.teal200 : color.teal700}
              />

              <UserDetailItem
                icon={<CalendarToday />}
                label="Date of Birth"
                value={formatDateShort(user.dateOfBirth) || "N/A"}
                color={isDarkMode ? color.teal200 : color.teal700}
              />

              {/* Chỉ hiển thị level cho các role không phải STUDENT */}
              {shouldShowLevel && (
                <UserDetailItem
                  icon={<School />}
                  label="Level"
                  value={user.level || "N/A"}
                  color={isDarkMode ? color.teal200 : color.teal700}
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
