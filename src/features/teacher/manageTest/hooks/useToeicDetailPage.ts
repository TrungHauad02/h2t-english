import { 
  Toeic, 
  ToeicPart1, 
  ToeicPart2, 
  ToeicPart3_4, 
  ToeicPart5, 
  ToeicPart6, 
  ToeicPart7,
  ToeicPart7Question
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
  const [part5Questions, setPart5Questions] = useState<ToeicPart5[]>([]);
  const [part6Questions, setPart6Questions] = useState<ToeicPart6[]>([]);
  const [part7Questions, setPart7Questions] = useState<ToeicPart7[]>([]);
  const [part7SubQuestions, setPart7SubQuestions] = useState<{ [part7Id: number]: ToeicPart7Question[] }>({});
  
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editData, setEditData] = useState<Toeic | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false); 
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState<boolean>(false);

  useEffect(() => { 
    if (id) { 
      setLoading(true); 
      
      setTimeout(() => { 
        // Try to get the TOEIC test
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
      const part3 = toeicService.getToeicPart3ByIds(toeic.questionsPart3);
      setPart3Questions(part3);
    }
    
    // Load Part 4 questions (Talks)
    if (toeic.questionsPart4.length > 0) {
      const part4 = toeicService.getToeicPart4ByIds(toeic.questionsPart4);
      setPart4Questions(part4);
    }
    
    // Load Part 5 questions (Incomplete Sentences)
    if (toeic.questionsPart5.length > 0) {
      const part5 = toeicService.getToeicPart5ByIds(toeic.questionsPart5);
      setPart5Questions(part5);
    }
    
    // Load Part 6 questions (Text Completion)
    if (toeic.questionsPart6.length > 0) {
      const part6 = toeicService.getToeicPart6ByIds(toeic.questionsPart6);
      setPart6Questions(part6);
    }
    
    // Load Part 7 questions (Reading Comprehension)
    if (toeic.questionsPart7.length > 0) {
      const part7 = toeicService.getToeicPart7ByIds(toeic.questionsPart7);
      setPart7Questions(part7);
      
      // Load subquestions for each Part 7 passage
      const subQuestions: { [part7Id: number]: ToeicPart7Question[] } = {};
      part7.forEach(passage => {
        const questions = toeicService.getToeicPart7QuestionsByIds(passage.questions);
        subQuestions[passage.id] = questions;
      });
      setPart7SubQuestions(subQuestions);
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
  
  // Get total questions in test
  const getTotalQuestions = () => {
    let total = 0;
    
    total += part1Questions.length; // Part 1
    total += part2Questions.length; // Part 2
    
    // Part 3 (each has 3 sub-questions)
    total += part3Questions.length * 3;
    
    // Part 4 (each has 3 sub-questions)
    total += part4Questions.length * 3;
    
    total += part5Questions.length; // Part 5
    
    // Part 6 (each has 4 sub-questions)
    total += part6Questions.length * 4;
    
    // Part 7 (variable number of questions per passage)
    Object.values(part7SubQuestions).forEach(questions => {
      total += questions.length;
    });
    
    return total;
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
    part7SubQuestions,
    
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