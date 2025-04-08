// hooks/useErrorLog.ts
import { ErrorLog } from "interfaces";
import { useCallback, useState } from "react";

export default function useErrorLog() {
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleViewDetails = useCallback((log: ErrorLog) => {
    setSelectedLog(log);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleMarkResolved = useCallback(() => {
    if (selectedLog) {
      alert(`MarkResolved: ${selectedLog.errorCode}`);
      // Gọi API cập nhật status ở đây nếu cần
    }
  }, [selectedLog]);

  return {
    selectedLog,
    openDialog,
    handleViewDetails,
    handleCloseDialog,
    handleMarkResolved,
  };
}
