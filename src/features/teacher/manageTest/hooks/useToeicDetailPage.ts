import { 
  Toeic, 
  ToeicPart1, 
  ToeicPart2, 
  ToeicPart3_4, 
  ToeicPart6, 
  ToeicPart7,
  ToeicQuestion,
  ToeicAnswer
} from "interfaces"; 
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import { toeicService } from "../services/toeicServices";

export default function useToeicDetailPage() { 
  const { id } = useParams(); 
  const [data, setData] = useState<Toeic | null>(null);
  
  // States for different TOEIC parts
  const [part1Questions, setPart1Questions] = useState<ToeicPart1[]>([]);
  const [part2Questions, setPart2Questions] = useState<ToeicPart2[]>([]);
  const [part3Questions, setPart3Questions] = useState<ToeicPart3_4[]>([]);
  const [part4Questions, setPart4Questions] = useState<ToeicPart3_4[]>([]);
  const [part5Questions, setPart5Questions] = useState<ToeicQuestion[]>([]);
  const [part6Questions, setPart6Questions] = useState<ToeicPart6[]>([]);
  const [part7Questions, setPart7Questions] = useState<ToeicPart7[]>([]);
  
  // Questions organized by part
  const [part3ToeicQuestions, setPart3ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  const [part4ToeicQuestions, setPart4ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  const [part6ToeicQuestions, setPart6ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  const [part7ToeicQuestions, setPart7ToeicQuestions] = useState<{ [partId: number]: ToeicQuestion[] }>({});
  
  // All questions dictionary for quick lookup
  const [allToeicQuestions, setAllToeicQuestions] = useState<{ [id: number]: ToeicQuestion }>({});
  
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editData, setEditData] = useState<Toeic | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false); 
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState<boolean>(false);

  useEffect(() => { 
    if (id) { 
      setLoading(true); 
      
      setTimeout(() => { 

       
        const toeic = toeicService.getToeicById(parseInt(id));

        if (toeic) { 
          setData(toeic); 
          setEditData({ ...toeic }); 
          
          // Load data for all TOEIC parts
          loadToeicPartsData(toeic);
        } 
        setLoading(false); 
      }, 500); 
    } 
  }, [id]); 

  const loadToeicPartsData = (toeic: Toeic) => {
    // Load Part 1 questions (Photographs)
    if (toeic.questionsPart1.length > 0) {
      const part1 = toeicService.getToeicPart1ByIds(toeic.questionsPart1);
      setPart1Questions(part1);
    }
    
    // Load Part 2 questions (Question-Response)
    if (toeic.questionsPart2.length > 0) {
      const part2 = toeicService.getToeicPart2ByIds(toeic.questionsPart2);
      setPart2Questions(part2);
    }
    
    // Load Part 3 questions (Conversations)
    if (toeic.questionsPart3.length > 0) {
      const part3 = toeicService.getToeicPart3_4ByIds(toeic.questionsPart3);
      setPart3Questions(part3);
      
      // Process each part3 item
      part3.forEach(item => {
        if (item.questions && item.questions.length > 0) {
          loadQuestionsForPart(item.id, item.questions, "part3");
        }
      });
    }
    
    // Load Part 4 questions (Talks)
    if (toeic.questionsPart4.length > 0) {
      const part4 = toeicService.getToeicPart3_4ByIds(toeic.questionsPart4);
      setPart4Questions(part4);
      
      // Process each part4 item
      part4.forEach(item => {
        if (item.questions && item.questions.length > 0) {
          loadQuestionsForPart(item.id, item.questions, "part4");
        }
      });
    }
    
    // Load Part 5 questions (Incomplete Sentences) - direct ToeicQuestions
    if (toeic.questionsPart5.length > 0) {
      const part5 = toeicService.getToeicQuestionsByIds(toeic.questionsPart5);
      setPart5Questions(part5);
      
      // Add to all questions map
      const questionsMap: { [id: number]: ToeicQuestion } = {};
      part5.forEach(question => {
        questionsMap[question.id] = question;
      });
      
      setAllToeicQuestions(prev => ({
        ...prev,
        ...questionsMap
      }));
    }
    
    // Load Part 6 questions (Text Completion)
    if (toeic.questionsPart6.length > 0) {
      const part6 = toeicService.getToeicPart6ByIds(toeic.questionsPart6);
      setPart6Questions(part6);
      
      // Process each part6 item
      part6.forEach(item => {
        if (item.questions && item.questions.length > 0) {
          loadQuestionsForPart(item.id, item.questions, "part6");
        }
      });
    }
    
    // Load Part 7 questions (Reading Comprehension)
    if (toeic.questionsPart7.length > 0) {
      const part7 = toeicService.getToeicPart7ByIds(toeic.questionsPart7);
      setPart7Questions(part7);
      
      // Process each part7 item
      part7.forEach(item => {
        if (item.questions && item.questions.length > 0) {
          loadQuestionsForPart(item.id, item.questions, "part7");
        }
      });
    }
  };
  
  // Helper function to load questions for a specific part
  const loadQuestionsForPart = (partId: number, questionIds: number[], partType: "part3" | "part4" | "part6" | "part7") => {
    const questions = toeicService.getToeicQuestionsByIds(questionIds);
    
    // Create a questions map for global lookup
    const questionsMap: { [id: number]: ToeicQuestion } = {};
    questions.forEach(question => {
      questionsMap[question.id] = question;
    });
    
    // Update the global questions state
    setAllToeicQuestions(prev => ({
      ...prev,
      ...questionsMap
    }));
    
    // Update the specific part questions
    switch (partType) {
      case "part3":
        setPart3ToeicQuestions(prev => ({
          ...prev,
          [partId]: questions
        }));
        break;
      case "part4":
        setPart4ToeicQuestions(prev => ({
          ...prev,
          [partId]: questions
        }));
        break;
      case "part6":
        setPart6ToeicQuestions(prev => ({
          ...prev,
          [partId]: questions
        }));
        break;
      case "part7":
        setPart7ToeicQuestions(prev => ({
          ...prev,
          [partId]: questions
        }));
        break;
    }
  };

  // Admin/Management functions
  const handleEditMode = () => { 
    setIsEditMode(!isEditMode); 
    if (isEditMode && data) { 
      setEditData({ ...data }); 
    } 
  }; 

  const handleSaveChanges = () => { 
    if (editData) { 
      setData(editData); 
      if (editData.id) {
        toeicService.updateToeicTest(editData.id, editData);
      }
      setIsEditMode(false); 
    } 
  }; 

  const handleInputChange = (field: string, value: any) => { 
    if (editData) { 
      setEditData({ 
        ...editData, 
        [field]: value, 
      }); 
    } 
  }; 

  const handleUnpublish = () => { 
    if (data) { 
      const updatedData = { ...data, status: false }; 
      setData(updatedData); 
      if (editData) setEditData(updatedData); 
      if (data.id) {
        toeicService.updateToeicTest(data.id, { status: false });
      }
      setOpenUnpublishDialog(false); 
    } 
  }; 

  const handlePublish = () => { 
    if (data) { 
      const updatedData = { ...data, status: true }; 
      setData(updatedData); 
      if (editData) setEditData(updatedData); 
      if (data.id) {
        toeicService.updateToeicTest(data.id, { status: true });
      }
      setOpenPublishDialog(false); 
    } 
  }; 

  const handlePublishClick = () => { 
    setOpenPublishDialog(true); 
  }; 

  const handleUnpublishClick = () => { 
    setOpenUnpublishDialog(true); 
  };
  
  // Get total questions in test - always return 200 as per interface requirement
  const getTotalQuestions = () => {
    return 200; // Fixed as per interface
  };

  return { 
    data, 
    
    // TOEIC Part data
    part1Questions,
    part2Questions,
    part3Questions,
    part4Questions,
    part5Questions,
    part6Questions,
    part7Questions,
    
    // Questions organized by part
    part3ToeicQuestions,
    part4ToeicQuestions,
    part6ToeicQuestions,
    part7ToeicQuestions,
    
    // All questions in one object for lookup
    allToeicQuestions,
    
    // Edit mode and management functions
    isEditMode, 
    editData, 
    loading, 
    openPublishDialog, 
    openUnpublishDialog,
    handleEditMode, 
    handleSaveChanges, 
    handleInputChange,
    setOpenPublishDialog, 
    setOpenUnpublishDialog,
    handlePublish, 
    handleUnpublish,
    handlePublishClick, 
    handleUnpublishClick,
    
    // Test information
    getTotalQuestions
  }; 
}