import { ErrorLog } from "interfaces";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { errorLogService } from "services/features/errorLogService";

export default function useErrorLog(onRefresh: () => void) {
  const { id } = useParams();
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await errorLogService.findById(parseInt(id));
          setSelectedLog(response.data);
          setOpenDialog(true);
        } catch (error) {
          console.error("Error fetching log:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleViewDetails = useCallback((log: ErrorLog) => {
    setSelectedLog(log);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleMarkResolved = async () => {
    if (selectedLog) {
      try {
        await errorLogService.patch(selectedLog.id, { status: false });
        setSelectedLog(null);
        setOpenDialog(false);
        toast.success("Log marked as resolved");
        onRefresh();
      } catch (error) {
        toast.error("Failed to mark log as resolved");
      }
    }
  };

  const handleDeleteLog = async () => {
    if (selectedLog) {
      try {
        await errorLogService.remove(selectedLog.id);
        setSelectedLog(null);
        setOpenDialog(false);
        toast.success("Log deleted");
        onRefresh();
      } catch (error) {
        toast.error("Failed to delete log");
      }
    }
  };

  return {
    selectedLog,
    openDialog,
    handleViewDetails,
    handleCloseDialog,
    handleMarkResolved,
    handleDeleteLog,
  };
}
