import { ErrorLog } from "interfaces";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { errorLogService } from "services/features/errorLogService";

export default function useErrorLog(onRefresh: () => void) {
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
