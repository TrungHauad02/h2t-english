import { ErrorLog } from "interfaces";
import apiClient from "services/apiClient";

const getErrorLogs = async (page: number, itemsPerPage: number) => {
    try {
        const response = await apiClient.get(
            `/error-logs?page=${page - 1}&size=${itemsPerPage}`
        );
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

export const errorLogService = {
    getErrorLogs,
    patch,
};
