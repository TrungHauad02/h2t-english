import { Test, TestReading, TestListening, TestSpeaking, TestWriting, TestPart, TestTypeEnum } from "interfaces"; 
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import { testService } from "../services/testServices";

export default function useTestDetailPage() { 
  const { id, routeId, type } = useParams(); 
  const [data, setData] = useState<Test | null>(null);
  const [testParts, setTestParts] = useState<TestPart[]>([]);
  
  // States for different test types
  const [readingFiles, setReadingFiles] = useState<TestReading[]>([]);
  const [listeningFiles, setListeningFiles] = useState<TestListening[]>([]);
  const [speakingTitles, setSpeakingTitles] = useState<TestSpeaking[]>([]);
  const [writingTopics, setWritingTopics] = useState<TestWriting[]>([]);
  
  // Currently selected items for different test types
  const [currentReadingFile, setCurrentReadingFile] = useState<TestReading | null>(null);
  const [currentListeningFile, setCurrentListeningFile] = useState<TestListening | null>(null);
  const [currentSpeakingTitle, setCurrentSpeakingTitle] = useState<TestSpeaking | null>(null);
  const [currentWritingTopic, setCurrentWritingTopic] = useState<TestWriting | null>(null);
  
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editData, setEditData] = useState<Test | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false); 
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState<boolean>(false); 

  useEffect(() => { 
    if (id && routeId && type) { 
      const testType = type?.toUpperCase() as keyof typeof TestTypeEnum;
      setLoading(true); 
      setTimeout(() => { 
        const test = testService.getTestByIdAndType(parseInt(id),testType); 
        
        if (test) { 
          setData(test); 
          setEditData({ ...test }); 
          
          const parts = testService.getTestPartsByIds(test.parts);
          setTestParts(parts);
          
          // Load data for each test type
          loadTestTypeData(parts, test.type);
        } 
        setLoading(false); 
      }, 500); 
    } 
  }, [id, routeId]); 

  const loadTestTypeData = (parts: TestPart[], testType: string) => {

    const readingParts = parts.filter(part => part.type === "READING");
    const listeningParts = parts.filter(part => part.type === "LISTENING");
    const speakingParts = parts.filter(part => part.type === "SPEAKING");
    const writingParts = parts.filter(part => part.type === "WRITING");
    

    if (readingParts.length > 0) {
      const readingQuestionIds = readingParts.flatMap(part => part.questions);
      const readingFiles = testService.getTestReadingsByIds(readingQuestionIds);
      setReadingFiles(readingFiles);
      if (readingFiles.length > 0) {
        setCurrentReadingFile(readingFiles[0]);
      }
    }
    

    if (listeningParts.length > 0) {
      const listeningQuestionIds = listeningParts.flatMap(part => part.questions);
      const listeningFiles = testService.getTestListeningsByIds(listeningQuestionIds);
      setListeningFiles(listeningFiles);
      if (listeningFiles.length > 0) {
        setCurrentListeningFile(listeningFiles[0]);
      }
    }
    
    // Process speaking data
    if (speakingParts.length > 0) {
      const speakingQuestionIds = speakingParts.flatMap(part => part.questions);
      const speakingTitles = testService.getTestSpeakingsByIds(speakingQuestionIds);
      setSpeakingTitles(speakingTitles);
      if (speakingTitles.length > 0) {
        setCurrentSpeakingTitle(speakingTitles[0]);
      }
    }
    

    if (writingParts.length > 0) {
      const writingQuestionIds = writingParts.flatMap(part => part.questions);
      const writingTopics = testService.getTestWritingsByIds(writingQuestionIds);
      setWritingTopics(writingTopics);
      if (writingTopics.length > 0) {
        setCurrentWritingTopic(writingTopics[0]);
      }
    }
  };

  const handleEditMode = () => { 
    setIsEditMode(!isEditMode); 
    if (isEditMode) { 
      setEditData({ ...data } as Test); 
    } 
  }; 

  const handleSaveChanges = () => { 
    if (editData) { 
      setData(editData); 
      setIsEditMode(false); 
    } 
  }; 

  const handleInputChange = (field: keyof Test, value: any) => { 
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
      setOpenUnpublishDialog(false); 
    } 
  }; 

  const handlePublish = () => { 
    if (data) { 
      const updatedData = { ...data, status: true }; 
      setData(updatedData); 
      if (editData) setEditData(updatedData); 
      setOpenPublishDialog(false); 
    } 
  }; 

  const handlePublishClick = () => { 
    setOpenPublishDialog(true); 
  }; 

  const handleUnpublishClick = () => { 
    setOpenUnpublishDialog(true); 
  }; 

  // Handlers for reading files
  const handleReadingFileChange = (base64: string) => {
    if (currentReadingFile) {
      const updatedFile = {...currentReadingFile, file: base64};
      setCurrentReadingFile(updatedFile);
      
      const updatedFiles = readingFiles.map(file => 
        file.id === currentReadingFile.id ? updatedFile : file
      );
      setReadingFiles(updatedFiles);
    }
  };

  const selectReadingFile = (fileId: number) => {
    const file = readingFiles.find(f => f.id === fileId);
    if (file) {
      setCurrentReadingFile(file);
    }
  };

  const handleListeningFileChange = (audio: string, transcript: string) => {
    if (currentListeningFile) {
      const updatedFile = {...currentListeningFile, audio, transcript};
      setCurrentListeningFile(updatedFile);
      
      const updatedFiles = listeningFiles.map(file => 
        file.id === currentListeningFile.id ? updatedFile : file
      );
      setListeningFiles(updatedFiles);
    }
  };

  const selectListeningFile = (fileId: number) => {
    const file = listeningFiles.find(f => f.id === fileId);
    if (file) {
      setCurrentListeningFile(file);
    }
  };

  // Handlers for speaking titles
  const handleSpeakingTitleChange = (title: string) => {
    if (currentSpeakingTitle) {
      const updatedTitle = {...currentSpeakingTitle, title};
      setCurrentSpeakingTitle(updatedTitle);
      
      const updatedTitles = speakingTitles.map(item => 
        item.id === currentSpeakingTitle.id ? updatedTitle : item
      );
      setSpeakingTitles(updatedTitles);
    }
  };

  const selectSpeakingTitle = (titleId: number) => {
    const title = speakingTitles.find(t => t.id === titleId);
    if (title) {
      setCurrentSpeakingTitle(title);
    }
  };

  // Handlers for writing topics
  const handleWritingTopicChange = (topic: string, minWords: number, maxWords: number) => {
    if (currentWritingTopic) {
      const updatedTopic = {...currentWritingTopic, topic, minWords, maxWords};
      setCurrentWritingTopic(updatedTopic);
      
      const updatedTopics = writingTopics.map(item => 
        item.id === currentWritingTopic.id ? updatedTopic : item
      );
      setWritingTopics(updatedTopics);
    }
  };

  const selectWritingTopic = (topicId: number) => {
    const topic = writingTopics.find(t => t.id === topicId);
    if (topic) {
      setCurrentWritingTopic(topic);
    }
  };

  return { 
    data, 
    testParts,
    
    // Reading data
    readingFiles,
    currentReadingFile,
    handleReadingFileChange,
    selectReadingFile,
    
    // Listening data
    listeningFiles,
    currentListeningFile,
    handleListeningFileChange,
    selectListeningFile,
    
    // Speaking data
    speakingTitles,
    currentSpeakingTitle,
    handleSpeakingTitleChange,
    selectSpeakingTitle,
    
    // Writing data
    writingTopics,
    currentWritingTopic,
    handleWritingTopicChange,
    selectWritingTopic,
    
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
  }; 
}