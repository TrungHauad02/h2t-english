import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  RouteNode,
  RouteNodeEnum,
  Topic,
  Grammar,
  Listening,
  Reading,
  Speaking,
  Writing,
  Test,
  TestTypeEnum,
} from "interfaces";
import { base64ToBlobUrl } from "utils/convert";

export interface UseAddNodeDialogProps {
  data: RouteNode;
  setData: (data: RouteNode) => void;
  newLesson: Topic | Grammar | Listening | Reading | Speaking | Writing | Test;
  setNewLesson: Dispatch<
    SetStateAction<
      Topic | Grammar | Listening | Reading | Speaking | Writing | Test
    >
  >;
}

export default function useAddNodeDialog({
  data,
  setData,
  newLesson,
  setNewLesson,
}: UseAddNodeDialogProps) {
  const [tips, setTips] = useState<string[]>(
    (newLesson as Grammar)?.tips || []
  );

  const [isTestNode, setIsTestNode] = useState<boolean>(false);

  useEffect(() => {
    const isTest = checkIfTestNode(data.type);
    setIsTestNode(isTest);
    setNewLesson(createInitialLesson(data));
  }, [data.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setNewLesson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (value: string | number) => {
    setData({ ...data, type: value as RouteNodeEnum });
  };

  const handleImageChange = (base64: string) => {
    const blobUrl = base64ToBlobUrl(base64, "image/png");
    setData({ ...data, image: blobUrl });
    setNewLesson((prev) => ({
      ...prev,
      image: blobUrl,
    }));
  };

  const handleFileChange = (base64: string) => {
    setNewLesson((prev) => {
      if ("file" in prev) {
        return {
          ...prev,
          file: base64ToBlobUrl(
            base64,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ),
        };
      }
      return prev;
    });
  };

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...tips];
    newTips[index] = value;
    setTips(newTips);

    setNewLesson((prev) => {
      if ("tips" in prev) {
        return { ...prev, tips: newTips };
      }
      return prev;
    });
  };

  const addTip = () => {
    const newTips = [...tips, ""];
    setTips(newTips);

    setNewLesson((prev) => {
      if ("tips" in prev) {
        return { ...prev, tips: newTips };
      }
      return prev;
    });
  };

  const removeTip = (index: number) => {
    const newTips = tips.filter((_, i) => i !== index);
    setTips(newTips);

    setNewLesson((prev) => {
      if ("tips" in prev) {
        return { ...prev, tips: newTips };
      }
      return prev;
    });
  };

  return {
    newLesson,
    setNewLesson,
    tips,
    isTestNode,
    handleChange,
    handleTypeChange,
    handleImageChange,
    handleFileChange,
    handleTipChange,
    addTip,
    removeTip,
  };
}

function checkIfTestNode(type: RouteNodeEnum): boolean {
  return [
    RouteNodeEnum.MIXING_TEST,
    RouteNodeEnum.READING_TEST,
    RouteNodeEnum.LISTENING_TEST,
    RouteNodeEnum.SPEAKING_TEST,
    RouteNodeEnum.WRITING_TEST,
  ].includes(type);
}

function createInitialLesson(
  data: RouteNode
): Topic | Grammar | Listening | Reading | Speaking | Writing | Test {
  const baseLesson = {
    id: -1,
    title: data.title || "",
    description: data.description || "",
    routeNodeId: data.id,
    status: false,
    views: 0,
    questions: [],
    image: "",
  };

  switch (data.type) {
    case RouteNodeEnum.GRAMMAR:
      return {
        ...baseLesson,
        definition: "",
        example: "",
        tips: [],
        file: "",
      } as Grammar;

    case RouteNodeEnum.READING:
      return {
        ...baseLesson,
        file: "",
      } as Reading;

    case RouteNodeEnum.LISTENING:
      return {
        ...baseLesson,
        audio: "",
        transcript: "",
      } as Listening;

    case RouteNodeEnum.WRITING:
      return {
        ...baseLesson,
        topic: "",
        file: "",
        tips: [],
        paragraph: "",
      } as Writing;

    case RouteNodeEnum.SPEAKING:
      return {
        ...baseLesson,
        topic: "",
        duration: 0,
      } as Speaking;

    case RouteNodeEnum.MIXING_TEST:
    case RouteNodeEnum.READING_TEST:
    case RouteNodeEnum.LISTENING_TEST:
    case RouteNodeEnum.SPEAKING_TEST:
    case RouteNodeEnum.WRITING_TEST:
      return {
        id: -1,
        title: data.title || "",
        description: data.description || "",
        type: getTestType(data.type),
        duration: 0,
        routeNodeId: data.id,
        status: false,
        parts: [],
        totalQuestions: 0,
        scoreLastOfTest: null,
      } as Test;

    default:
      return baseLesson as Topic;
  }
}

function getTestType(type: RouteNodeEnum): TestTypeEnum {
  switch (type) {
    case RouteNodeEnum.MIXING_TEST:
      return TestTypeEnum.MIXING;
    case RouteNodeEnum.READING_TEST:
      return TestTypeEnum.READING;
    case RouteNodeEnum.LISTENING_TEST:
      return TestTypeEnum.LISTENING;
    case RouteNodeEnum.SPEAKING_TEST:
      return TestTypeEnum.SPEAKING;
    case RouteNodeEnum.WRITING_TEST:
      return TestTypeEnum.WRITING;
    default:
      return TestTypeEnum.MIXING;
  }
}
