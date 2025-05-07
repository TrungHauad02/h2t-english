import { ErrorLog, ErrorLogFilter, SeverityEnum } from "interfaces";
import apiClient from "services/apiClient";
import { formatLocalDateForFilter } from "utils/format";

const getErrorLogs = async (
  page: number,
  itemsPerPage: number,
  filter?: ErrorLogFilter
) => {
  try {
    let url = `/error-logs?page=${page - 1}&size=${itemsPerPage}`;

    if (filter) {
      // Status
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }

      // Message
      if (filter.message) {
        url += `&message=${encodeURIComponent(filter.message)}`;
      }

      // Severity
      if (filter.severity) {
        url += `&severity=${filter.severity}`;
      }

      // ErrorCode
      if (filter.errorCode) {
        url += `&errorCode=${encodeURIComponent(filter.errorCode)}`;
      }

      // SortBy
      if (filter.sortBy) {
        url += `&sortFields=${encodeURIComponent(filter.sortBy)}`;
      }

      // Xử lý ngày tháng với múi giờ địa phương
      if (filter.startCreatedAt) {
        const formattedStartDate = formatLocalDateForFilter(
          filter.startCreatedAt,
          false
        );
        url += `&startCreatedAt=${formattedStartDate}`;
      }

      if (filter.endCreatedAt) {
        const formattedEndDate = formatLocalDateForFilter(
          filter.endCreatedAt,
          true
        );
        url += `&endCreatedAt=${formattedEndDate}`;
      }

      // UpdatedAt fields
      if (filter.startUpdatedAt) {
        const formattedStartUpdateDate = formatLocalDateForFilter(
          filter.startUpdatedAt,
          false
        );
        url += `&startUpdatedAt=${formattedStartUpdateDate}`;
      }

      if (filter.endUpdatedAt) {
        const formattedEndUpdateDate = formatLocalDateForFilter(
          filter.endUpdatedAt,
          true
        );
        url += `&endUpdatedAt=${formattedEndUpdateDate}`;
      }
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting error-logs:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ErrorLog>) => {
  try {
    const response = await apiClient.patch(`/error-logs/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating error log:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/error-logs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting error log:", error);
    throw error;
  }
};

const bulkDelete = async (severityList: SeverityEnum[]) => {
  try {
    const response = await apiClient.delete("/error-logs/bulk", {
      data: { severityList },
    });
    return response.data;
  } catch (error) {
    console.error("Error bulk deleting error logs:", error);
    throw error;
  }
};

export const errorLogService = {
  getErrorLogs,
  patch,
  remove,
  bulkDelete,
};
