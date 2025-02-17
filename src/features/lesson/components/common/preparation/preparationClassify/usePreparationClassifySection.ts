import { PreparationClassify } from "interfaces";
import { useEffect, useState } from "react";

interface GroupClassify {
  id: number;
  name: string;
  members: string[];
}

export default function usePreparationClassifySection() {
  const data: PreparationClassify[] = [
    {
      id: 1,
      groupName: "Fruits",
      members: [
        "Apple",
        "Banana",
        "Orange",
        "Grapes",
        "Strawberry",
        "Pineapple",
        "Watermelon",
        "Mango",
        "Kiwi",
      ],
      status: true,
    },
    {
      id: 2,
      groupName: "Vegetables",
      members: [
        "Carrot",
        "Broccoli",
        "Spinach",
        "Tomato",
        "Cucumber",
        "Bell Pepper",
        "Potato",
        "Onion",
        "Lettuce",
        "Zucchini",
      ],
      status: true,
    },
  ];

  const [members, setMembers] = useState<string[]>([]);
  const [groups, setGroups] = useState<GroupClassify[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
      allGroups.push({
        id: item.id,
        name: item.groupName,
        members: [],
      });
    });
    setGroups(allGroups);
  };

  const onSelectItem = (item: string) => {
    if (item === selectedItem) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };

  const onSelectGroup = (group: GroupClassify) => {
    if (selectedItem === null) return;
    groups.forEach((item) => {
      if (item.id === group.id) {
        item.members.push(selectedItem);
      }
    });
    members.forEach((item) => {
      if (item === selectedItem) {
        const index = members.indexOf(item);
        members.splice(index, 1);
      }
    });
    setSelectedItem(null);
  };

  const onSelectItemInGroup = (item: string, group: GroupClassify) => {
    const updatedGroups = groups.map((groupItem) => {
      if (groupItem.id === group.id) {
        const updatedMembers = groupItem.members.filter(
          (member) => member !== item
        );
        if (selectedItem !== null) {
          updatedMembers.push(selectedItem);
          setSelectedItem(null);
        }
        return {
          ...groupItem,
          members: updatedMembers,
        };
      }
      return groupItem;
    });
    setGroups(updatedGroups);
    setMembers((prevMembers) => [...prevMembers, item]);
  };

  return {
    members,
    groups,
    selectedItem,
    onSelectItem,
    onSelectGroup,
    onSelectItemInGroup,
  };
}
