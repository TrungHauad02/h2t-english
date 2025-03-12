import { mockData } from "./mockData";

const getUserById = (id: number) => {
  return mockData.find((user) => user.id === id);
};

export const userService = {
  getUserById,
};
