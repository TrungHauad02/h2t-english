import { mockData } from "./mockData";

const getListTestByType = (type: string) => {
    
    switch (type) {
        case "mixing":
          return mockData.tests.filter((test) => test.type === "MIXING");
        case "readings":
          return mockData.tests.filter((test) => test.type === "READING");
        case "speakings":
          return mockData.tests.filter((test) => test.type === "SPEAKING");
        case "listenings":
          return mockData.tests.filter((test) => test.type === "LISTENING");
        case "writings":
            return mockData.tests.filter((test) => test.type === "WRITING");
      }
};



export const listTestService = {
    getListTestByType,
};
