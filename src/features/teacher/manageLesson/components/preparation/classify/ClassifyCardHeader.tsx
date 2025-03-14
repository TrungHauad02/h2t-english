import { Avatar, Badge, CardHeader, Tooltip, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ClassifyCardHeaderProps {
  groupColor: string;
  firstLetter: string;
  item: any;
  isEditMode: boolean;
}

export default function ClassifyCardHeader({
  groupColor,
  firstLetter,
  item,
  isEditMode,
}: ClassifyCardHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{
            bgcolor: groupColor,
            color: color.white,
            width: 40,
            height: 40,
          }}
        >
          {firstLetter}
        </Avatar>
      }
      title={
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            fontWeight: "bold",
          }}
        >
          {item.groupName}
        </Typography>
      }
      subheader={
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray600,
          }}
        >
          {item.members.length}{" "}
          {item.members.length === 1 ? "member" : "members"}
        </Typography>
      }
      action={
        isEditMode ? null : (
          <Tooltip title={item.status ? "Active" : "Inactive"}>
            <Badge
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: item.status
                    ? isDarkMode
                      ? color.emerald400
                      : color.emerald500
                    : isDarkMode
                    ? color.gray400
                    : color.gray500,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                },
              }}
            />
          </Tooltip>
        )
      }
      sx={{
        pb: 1,
        "& .MuiCardHeader-action": {
          margin: "auto",
        },
      }}
    />
  );
}
