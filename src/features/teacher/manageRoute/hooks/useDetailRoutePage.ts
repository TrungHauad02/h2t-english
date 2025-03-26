import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routeService } from "../services/routeService";
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
import { routeNodeService } from "../services/routeNodeService";
import { lessonService } from "../services/lessonService";

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

  useEffect(() => {
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
      let lessonRes;
      switch (newNode.type) {
        case RouteNodeEnum.VOCABULARY:
          lessonRes = await lessonService.createTopic(newLesson as Topic);
          break;
        case RouteNodeEnum.GRAMMAR:
          lessonRes = await lessonService.createGrammar(newLesson as Grammar);
          break;
        case RouteNodeEnum.READING:
          lessonRes = await lessonService.createReading(newLesson as Reading);
          break;
        case RouteNodeEnum.LISTENING:
          lessonRes = await lessonService.createListening(
            newLesson as Listening
          );
          break;
        case RouteNodeEnum.SPEAKING:
          lessonRes = await lessonService.createSpeaking(newLesson as Speaking);
          break;
        case RouteNodeEnum.WRITING:
          lessonRes = await lessonService.createWriting(newLesson as Writing);
          break;
        default:
          throw new Error("Invalid node type");
      }

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
  };
}
