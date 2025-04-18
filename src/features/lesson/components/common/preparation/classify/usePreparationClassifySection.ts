import { PreparationClassify } from "interfaces";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { preparationClassifyService } from "services";
import { shuffleArray } from "utils/shuffleArray";

interface GroupClassify {
  id: number;
  name: string;
  members: string[];
}

export default function usePreparationClassifySection(questions: number[]) {
  const [data, setData] = useState<PreparationClassify[]>([]);

  const [members, setMembers] = useState<string[]>([]);
  const [groups, setGroups] = useState<GroupClassify[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  const numberOfItems = useMemo(() => {
    return data.reduce((total, item) => total + item.members.length, 0);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (questions.length > 0) {
        try {
          const promises = questions.map((questionId) =>
            preparationClassifyService.findById(questionId)
          );
          const responses = await Promise.all(promises);

          const validData = responses
            .filter(
              (response) => response.status === "SUCCESS" && response.data
            )
            .map((response) => response.data);
          setData(validData);
        } catch (error) {
          toast.error("Error fetching preparation data");
        }
      }
    };
    fetchData();
  }, [questions]);

  useEffect(() => {
    resetState();
  }, [data]);

  const resetMember = () => {
    let allMembers: string[] = [];
    data.forEach((item) => {
      allMembers = allMembers.concat(item.members);
    });
    setMembers(shuffleArray(allMembers));
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

  const calculateScore = () => {
    const itemMap = new Map(
      data.map((item) => [item.id, new Set(item.members)])
    );

    let score = 0;
    groups.forEach((group) => {
      const groupMembersSet = new Set(group.members);

      const item = itemMap.get(group.id);
      if (item) {
        groupMembersSet.forEach((member) => {
          if (item.has(member)) {
            score += 1;
          }
        });
      }
    });

    return score;
  };

  const onSubmit = () => {
    const finalScore = calculateScore() + "/" + numberOfItems;
    setScore(finalScore);
    setIsShowConfirm(false);
    setIsShowScoreDialog(true);
  };

  const resetState = () => {
    setSelectedItem(null);
    resetMember();
    resetGroup();
  };

  const onReset = () => {
    setScore(null);
    setIsShowExplain(false);
    setIsShowConfirm(false);
    setIsShowScoreDialog(false);
    resetState();
  };

  const onShowConfirm = () => {
    setIsShowConfirm(!isShowConfirm);
  };

  const onShowExplain = () => {
    if (isShowExplain) {
      resetState();
    } else {
      showResult();
    }
    setIsShowExplain(!isShowExplain);
  };

  const showResult = () => {
    const newGroups = data.map((item) => ({
      id: item.id,
      name: item.groupName,
      members: item.members,
    }));
    setMembers([]);
    setGroups(newGroups);
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  const getNumberAnswered = () => {
    return groups.reduce((total, group) => total + group.members.length, 0);
  };

  return {
    members,
    groups,
    selectedItem,
    score,
    isShowConfirm,
    isShowScoreDialog,
    numberOfItems,
    onSelectItem,
    onSelectGroup,
    onSelectItemInGroup,
    onShowConfirm,
    onReset,
    onShowExplain,
    onSubmit,
    onCloseScoreDialog,
    getNumberAnswered,
  };
}
