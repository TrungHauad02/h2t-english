import { useDarkMode } from "hooks/useDarkMode";
import { RolesEnum, Route, RouteNodeEnum, User } from "interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "services";
import useColor from "theme/useColor";

export default function useRouteCard(route: Route) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();
  const [owner, setOwner] = useState<User>({
    id: -1,
    name: "Teacher",
    avatar: "",
    email: "teacher@gmail.com",
    role: RolesEnum.TEACHER,
    status: true,
    phoneNumber: "",
    dateOfBirth: new Date(),
  });
  const [expandedNodes, setExpandedNodes] = useState(false);
  const [hover, setHover] = useState(false);
  const [cardScale, setCardScale] = useState(1);
  const [imageHover, setImageHover] = useState(false);
  const [chipHover, setChipHover] = useState<number | null>(null);

  const initialNodeCount = 5;
  const maxNodeCount = 10;
  const hasMoreNodes = route.routeNodes.length > initialNodeCount;
  const hasDetailPage = route.routeNodes.length > maxNodeCount;

  const visibleNodes = expandedNodes
    ? route.routeNodes.slice(0, maxNodeCount)
    : route.routeNodes.slice(0, initialNodeCount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.findOwnerById(route.ownerId);
        setOwner(response.data);
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };
    fetchData();
  }, [route.ownerId]);

  const getChipColor = (type: RouteNodeEnum) => {
    switch (type) {
      case RouteNodeEnum.VOCABULARY:
        return isDarkMode ? colors.teal300 : colors.teal600;
      case RouteNodeEnum.GRAMMAR:
        return isDarkMode ? colors.emerald300 : colors.emerald600;
      case RouteNodeEnum.READING:
        return isDarkMode ? colors.green300 : colors.green600;
      case RouteNodeEnum.WRITING:
        return isDarkMode ? colors.info : colors.infoDarkMode;
      case RouteNodeEnum.SPEAKING:
        return isDarkMode ? colors.warning : colors.warningDarkMode;
      case RouteNodeEnum.LISTENING:
        return isDarkMode ? colors.success : colors.successDarkMode;
      default:
        return isDarkMode ? colors.gray300 : colors.gray600;
    }
  };

  const handleShowMore = () => {
    setExpandedNodes(true);
  };

  const handleViewDetail = () => {
    navigate(`/routes/${route.id}`);
  };

  const ownerInitial = owner.name.charAt(0).toUpperCase();

  useEffect(() => {
    if (hover) {
      setCardScale(1.02);
    } else {
      setCardScale(1);
    }
  }, [hover]);

  return {
    isDarkMode,
    colors,
    owner,
    navigate,
    expandedNodes,
    setExpandedNodes,
    hover,
    setHover,
    cardScale,
    imageHover,
    setImageHover,
    chipHover,
    setChipHover,
    initialNodeCount,
    maxNodeCount,
    hasMoreNodes,
    hasDetailPage,
    visibleNodes,
    getChipColor,
    handleShowMore,
    handleViewDetail,
    ownerInitial,
  };
}
