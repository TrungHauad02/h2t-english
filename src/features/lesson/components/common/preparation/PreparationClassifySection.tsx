import { Grid, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { PreparationClassify } from "interfaces";
import { useEffect, useState } from "react";
import useColor from "theme/useColor";

interface GroupClassify {
  id: number;
  members: string[];
}

export default function PreparationClassifySection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const data: PreparationClassify[] = [
    {
      id: 1,
      groupName: "Group A",
      members: ["A 1", "A 2", "A 3"],
      status: true,
    },
    {
      id: 2,
      groupName: "Group B",
      members: ["B 1", "B 2"],
      status: true,
    },
  ];

  const [members, setMembers] = useState<string[]>([]);
  const [groups, setGroups] = useState<GroupClassify[]>([]);

  useEffect(() => {
    resetMember();
    resetGroup();
  }, []);

  const resetMember = () => {
    let allMembers: string[] = [];
    data.forEach((item) => {
      allMembers = allMembers.concat(item.members);
    });
    setMembers(allMembers);
  };

  const resetGroup = () => {
    let allGroups: GroupClassify[] = [];
    data.forEach((item) => {
      allGroups.push({ id: item.id, members: [] });
    });
    setGroups(allGroups);
  };

  return (
    <Stack sx={{ mt: 1 }}>
      <Grid
        container
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 1, md: 2 },
          p: { xs: 1, md: 2 },
          bgcolor: isDarkMode ? color.gray700 : color.gray300,
          borderRadius: 1,
        }}
      >
        {members.map((item, index) => (
          <Grid
            item
            key={index}
            sx={{
              p: { xs: 1, md: 2 },
              bgcolor: isDarkMode ? color.gray900 : color.gray100,
              borderRadius: 2,
            }}
          >
            {item}
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
