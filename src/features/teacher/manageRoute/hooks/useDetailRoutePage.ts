import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routeService } from "../services/listRouteService";
import { Route, RouteNode, RouteNodeEnum } from "interfaces";

export default function useDetailRoutePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Route | null>(null);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState(false);
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

  const [newNode, setNewNode] = useState<RouteNode>(emptyRouteNode);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const route = routeService.getRouteById(parseInt(id));
      if (route) {
        setData(route);
        setEditedData({ ...route });
      }
      setLoading(false);
    }
  }, [id]);

  const handleGoBack = () => navigate(-1);
  const handleEditMode = () => setEditMode(!editMode);

  const handleOpenAddNodeDialog = () => {
    setNewNode(emptyRouteNode);
    setOpenAddNodeDialog(!openAddNodeDialog);
  };

  const handleSaveChanges = () => {
    if (!editMode) {
      // TODO: Save serial change
      return;
    }
    if (editedData) {
      setData(editedData);
      setEditMode(false);
    }
  };

  const handlePublishClick = () => setOpenPublishDialog(true);
  const handleUnpublishClick = () => setOpenUnpublishDialog(true);

  const handlePublish = () => {
    if (data) {
      const updatedData = { ...data, status: true };
      setData(updatedData);
      if (editedData) setEditedData(updatedData);
      setOpenPublishDialog(false);
    }
  };

  const handleUnpublish = () => {
    if (data) {
      const updatedData = { ...data, status: false };
      setData(updatedData);
      if (editedData) setEditedData(updatedData);
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

  const handleAddNode = () => {
    setOpenAddNodeDialog(false);
    if (!data) return;
    if (newNode) {
      const updatedData: RouteNode[] = [...(data?.routeNodes || [])];
      updatedData.push(newNode);
      setData({ ...data, routeNodes: updatedData });
      setNewNode(emptyRouteNode);
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
    setNewNode,
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
