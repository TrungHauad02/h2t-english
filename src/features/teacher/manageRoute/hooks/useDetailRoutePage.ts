import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routeService, routeNodeService, createLessonFactory } from "services";
import {
  Grammar,
  Listening,
  Reading,
  Route,
  RouteNode,
  RouteNodeEnum,
  Speaking,
  Test,
  Topic,
  Writing,
} from "interfaces";

export default function useDetailRoutePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Route | null>(null);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] =
    useState<boolean>(false);
  const [openAddNodeDialog, setOpenAddNodeDialog] = useState<boolean>(false);

  const emptyRouteNode = {
    id: -1,
    title: "",
    description: "",
    image: "",
    nodeId: -1,
    routeId: id ? parseInt(id) : -1,
    serial: data ? data.routeNodes.length + 1 : 1,
    status: false,
    type: RouteNodeEnum.VOCABULARY,
  };

  const emptyTopic: Topic = {
    id: -1,
    title: "",
    description: "",
    image: "",
    status: false,
    questions: [],
    views: 0,
    routeNodeId: -1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [newNode, setNewNode] = useState<RouteNode>(emptyRouteNode);
  const [newLesson, setNewLesson] = useState<
    Topic | Grammar | Reading | Speaking | Listening | Writing | Test
  >(emptyTopic);

  const fetchData = async () => {
    if (id) {
      setLoading(true);
      const responseData = await routeService.getRouteById(parseInt(id));
      if (responseData) {
        setData(responseData.data);
        setEditedData({ ...responseData.data });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleGoBack = () => navigate(-1);
  const handleEditMode = () => setEditMode(!editMode);

  const handleOpenAddNodeDialog = () => {
    setNewNode(emptyRouteNode);
    setNewLesson(emptyTopic);
    setOpenAddNodeDialog(!openAddNodeDialog);
  };

  const handleSaveChanges = async () => {
    if (!editMode) {
      // TODO: Haven't test yet
      const resData = await routeService.patchRoute(data!.id, {
        routeNodes: data?.routeNodes,
      });
      setData(resData.data);
      return;
    }
    if (editedData) {
      // Save change on editData
      const resData = await routeService.updateRoute(editedData.id, editedData);
      setData(resData.data);
      setEditMode(false);
    }
  };

  const handlePublishClick = () => setOpenPublishDialog(true);
  const handleUnpublishClick = () => setOpenUnpublishDialog(true);

  const handlePublish = async () => {
    if (data) {
      // TODO: Check valid route before publish
      const responseData = await routeService.patchRoute(data.id, {
        status: true,
      });
      setData(responseData.data);
      if (editedData) setEditedData(responseData.data);
      setOpenPublishDialog(false);
    }
  };

  const handleUnpublish = async () => {
    if (data) {
      const responseData = await routeService.patchRoute(data.id, {
        status: false,
      });
      setData(responseData.data);
      if (editedData) setEditedData(responseData.data);
      setOpenUnpublishDialog(false);
    }
  };

  const onMoveUp = (index: number) => {
    if (!data || !data.routeNodes) return;
    if (index > 0) {
      const updatedData = [...data.routeNodes];
      const temp = updatedData[index];
      updatedData[index] = updatedData[index - 1];
      updatedData[index - 1] = temp;
      updatedData[index].serial = index + 1;
      updatedData[index - 1].serial = index;
      setData({ ...data, routeNodes: updatedData });
    }
  };

  const onMoveDown = (index: number) => {
    if (!data || !data.routeNodes) return;
    if (index < data.routeNodes.length - 1) {
      const updatedData = [...data.routeNodes];
      const temp = updatedData[index];
      updatedData[index] = updatedData[index + 1];
      updatedData[index + 1] = temp;
      updatedData[index].serial = index + 1;
      updatedData[index + 1].serial = index + 2;
      setData({ ...data, routeNodes: updatedData });
    }
  };

  const handleAddNode = async () => {
    setOpenAddNodeDialog(false);
    if (!data) return;

    try {
      // TODO: Xử lý bài kiểm tra
      const isTestNode = [
        RouteNodeEnum.MIXING_TEST,
        RouteNodeEnum.READING_TEST,
        RouteNodeEnum.LISTENING_TEST,
        RouteNodeEnum.SPEAKING_TEST,
        RouteNodeEnum.WRITING_TEST,
      ].includes(newNode.type);

      if (isTestNode) {
        console.log("TODO: Add test to database");
        return;
      }
      console.log("New lesson: ", newLesson);
      // Tạo bài học trước
      const lessonService = createLessonFactory(newNode.type);
      const lessonRes = await lessonService.createLesson(newLesson);

      // Cập nhật nodeId từ bài học vừa tạo
      const updatedNode = {
        ...newNode,
        nodeId: lessonRes.data.id,
      };

      // Tạo RouteNode
      const routeNodeRes = await routeNodeService.createRouteNode(updatedNode);

      // Cập nhật state
      const updatedData = [...data.routeNodes, routeNodeRes.data];
      setData({ ...data, routeNodes: updatedData });

      // Reset state
      setNewNode(emptyRouteNode);
      setNewLesson(emptyTopic);
    } catch (error) {
      console.error("Error adding node:", error);
      // TODO: Show error message
    }

    // TODO: Add node to db
    // TODO: Navigate to edit route node (Lesson / test)
  };

  return {
    data,
    loading,
    editMode,
    editedData,
    openPublishDialog,
    openUnpublishDialog,
    openAddNodeDialog,
    newNode,
    newLesson,
    setNewNode,
    setNewLesson,
    handleGoBack,
    handleEditMode,
    handlePublishClick,
    handleUnpublishClick,
    handleSaveChanges,
    handlePublish,
    handleUnpublish,
    onMoveUp,
    onMoveDown,
    setOpenPublishDialog,
    setOpenUnpublishDialog,
    setEditedData,
    handleOpenAddNodeDialog,
    handleAddNode,
    fetchData,
  };
}
