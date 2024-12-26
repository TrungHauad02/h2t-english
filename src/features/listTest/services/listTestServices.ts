import { mockData } from "./mockData";

const getListTestByType = (type: string) => {
    
    return mockData.tests.filter((test) => test.type === type.toUpperCase());
};

export const listTestService = {
    getListTestByType,
};
