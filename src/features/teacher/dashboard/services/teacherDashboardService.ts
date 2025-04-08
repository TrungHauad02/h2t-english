import { ServiceResponse } from "interfaces";

// Mock data service simulating real API responses
const mockApiCall = <T>(data: T): Promise<ServiceResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "SUCCESS",
        data,
        message: "Data fetched successfully",
      });
    }, 300); // Simulate network delay
  });
};

const getTotalRouteByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(15); // 15 routes
};

const getTotalTopicByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(22); // 22 topics
};

const getTotalGrammarByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(45); // 45 grammar lessons
};

const getTotalReadingByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(33); // 33 reading materials
};

const getTotalWritingByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(28); // 28 writing exercises
};

const getTotalListeningByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(19); // 19 listening lessons
};

const getTotalSpeakingByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(25); // 25 speaking activities
};

const getTotalMixingTestByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(37); // 37 tests
};

const getTotalReadingTestByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(12); // 12 reading tests
};

const getTotalWritingTestByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(10); // 10 writing tests
};

const getTotalListeningTestByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(8); // 8 listening tests
};

const getTotalSpeakingTestByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(6); // 6 speaking tests
};

const getViewsByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => {
  return mockApiCall(2835); // 100 views
};

const getActiveContentByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => mockApiCall(120);

const getInactiveContentByTeacherId = async (
  teacherId: number
): Promise<ServiceResponse<number>> => mockApiCall(20);

export const teacherDashboardService = {
  getTotalRouteByTeacherId,
  getTotalTopicByTeacherId,
  getTotalGrammarByTeacherId,
  getTotalReadingByTeacherId,
  getTotalWritingByTeacherId,
  getTotalListeningByTeacherId,
  getTotalSpeakingByTeacherId,
  getTotalMixingTestByTeacherId,
  getTotalReadingTestByTeacherId,
  getTotalWritingTestByTeacherId,
  getTotalSpeakingTestByTeacherId,
  getTotalListeningTestByTeacherId,
  getViewsByTeacherId,
  getActiveContentByTeacherId,
  getInactiveContentByTeacherId,
};
