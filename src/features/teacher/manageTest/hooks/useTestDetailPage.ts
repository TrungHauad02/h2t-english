import { Test, TestPart} from "interfaces"; 
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import { testService, testPartService } from "services/test";
import { toast } from "react-toastify";
export default function useTestDetailPage() { 
  const { id, routeId, type } = useParams(); 
  const [data, setData] = useState<Test | null>(null);
  const [testParts, setTestParts] = useState<TestPart[]>([]);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editData, setEditData] = useState<Test | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false); 
  const [openUnpublishDialog, setOpenUnpublishDialog] = useState<boolean>(false); 

  useEffect(() => { 
    const fetchData = async () => {
      if (id && routeId && type) { 
        setLoading(true);
        
        try {
          // Get specific test by ID
          const testResponse = await testService.findById(parseInt(id));
          const test = testResponse.data;
          
          if (test) { 
            setData(test); 
            setEditData({ ...test });
            
            try {
              // Get test parts by their IDs
              if (test.parts && test.parts.length > 0) {
                const partsResponse = await testPartService.getByIds(test.parts);
                const parts = partsResponse.data;
                setTestParts(parts);
              } else {
                setTestParts([]);
              }
            } catch (error) {
              console.error("Error fetching test parts:", error);
              setTestParts([]);
            }
          }
        } catch (error) {
          console.error("Error fetching test data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchData();
  }, [id, routeId, type]); 

  const handleEditMode = () => { 
    setIsEditMode(!isEditMode); 
    if (isEditMode && data) { 
      setEditData({ ...data }); 
    } 
  }; 

  const handleSaveChanges = async () => { 
    if (editData && data?.id) {
      try {
        setLoading(true);
        await testService.update(data.id, editData);
        setData(editData); 
        setIsEditMode(false);
      } catch (error) {
        console.error("Error updating test:", error);
      } finally {
        setLoading(false);
      }
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

  const handlePublish = async () => { 
    if (data && data.id) {
      try {
        setLoading(true);
 
        const verifyResult = await testService.verify(data.id);
        if (verifyResult.status !== "SUCCESS") {
          toast.error("Test is not valid for publishing.");
          return;
        }
  
        const updatedData = { ...data, status: true };
        await testService.patch(data.id, { status: true });
  
        setData(updatedData);
        if (editData) setEditData(updatedData);
      } catch (error) {
        console.error("Error publishing test:", error);
      } finally {
        setLoading(false);
        setOpenPublishDialog(false);
      }
    }
  };
  

  const handleUnpublish = async () => { 
    if (data && data.id) {
      try {
        setLoading(true);
        const updatedData = { ...data, status: false };
        await testService.patch(data.id, { status: false });
        setData(updatedData); 
        if (editData) setEditData(updatedData); 
      } catch (error) {
        console.error("Error unpublishing test:", error);
      } finally {
        setLoading(false);
        setOpenUnpublishDialog(false); 
      }
    } 
  }; 

  const handlePublishClick = () => { 
    setOpenPublishDialog(true); 
  }; 

  const handleUnpublishClick = () => { 
    setOpenUnpublishDialog(true); 
  }; 

  return { 
    data, 
    testParts,
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
    handleUnpublishClick
  }; 
}