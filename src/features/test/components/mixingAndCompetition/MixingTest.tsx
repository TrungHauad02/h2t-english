import React, { useState, useMemo,useEffect } from "react";
import {Grid, useMediaQuery, useTheme, Box} from "@mui/material";
import TestTabs from "./TestTabs";
import { TestPart, TestPartTypeEnum } from "interfaces";
import {
  VocabularySection,
  GrammarSection,
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection
} from "./";
import TestQuestionGrid from "./TestQuestionGrid";
import IntroducePartTest from "./InroducePartTest";
import TimeRemaining from "./TimeRemaining";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { submitTestAnswerService,testReadingService,testListeningService,testSpeakingService } from "services";

interface MixingTestProps {
  mixingTestParts: TestPart[];
  submitTestId: number;
}

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
}

const tabOrder: TestPartTypeEnum[] = [
  TestPartTypeEnum.VOCABULARY,
  TestPartTypeEnum.GRAMMAR,
  TestPartTypeEnum.READING,
  TestPartTypeEnum.LISTENING,
  TestPartTypeEnum.SPEAKING,
  TestPartTypeEnum.WRITING,
];

const MixingTest: React.FC<MixingTestProps> = ({ mixingTestParts, submitTestId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
const [startSerials, setStartSerials] = useState<Record<TestPartTypeEnum, number>>({
  [TestPartTypeEnum.VOCABULARY]: 0,
  [TestPartTypeEnum.GRAMMAR]: 0,
  [TestPartTypeEnum.READING]: 0,
  [TestPartTypeEnum.LISTENING]: 0,
  [TestPartTypeEnum.SPEAKING]: 0,
  [TestPartTypeEnum.WRITING]: 0,
});


  const [activeTab, setActiveTab] = useState<TestPartTypeEnum>(TestPartTypeEnum.VOCABULARY);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});

  const vocabularyPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.VOCABULARY), 
    [mixingTestParts]
  );
  
  const grammarPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.GRAMMAR), 
    [mixingTestParts]
  );
  
  const readingPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.READING), 
    [mixingTestParts]
  );
  
  const listeningPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.LISTENING), 
    [mixingTestParts]
  );
  
  const speakingPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.SPEAKING), 
    [mixingTestParts]
  );
  
  const writingPart = useMemo(() => 
    mixingTestParts.find(part => part.type === TestPartTypeEnum.WRITING), 
    [mixingTestParts]
  );

  useEffect(() => {
    const loadQuestions = async () => {
      let currentSerial = 1;
      const tempQuestions: QuestionItem[] = [];
      const tempStartSerials: Record<TestPartTypeEnum, number> = {
        VOCABULARY: 0,
        GRAMMAR: 0,
        READING: 0,
        LISTENING: 0,
        SPEAKING: 0,
        WRITING: 0,
      };
  
      for (const type of tabOrder) {
        let part;
        switch (type) {
          case TestPartTypeEnum.VOCABULARY: part = vocabularyPart; break;
          case TestPartTypeEnum.GRAMMAR: part = grammarPart; break;
          case TestPartTypeEnum.READING: part = readingPart; break;
          case TestPartTypeEnum.LISTENING: part = listeningPart; break;
          case TestPartTypeEnum.SPEAKING: part = speakingPart; break;
          case TestPartTypeEnum.WRITING: part = writingPart; break;
        }
  
        if (!part || !part.questions?.length) continue;
  
        tempStartSerials[type] = currentSerial;
  
        if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR || type === TestPartTypeEnum.WRITING) {
          for (const qId of part.questions) {
            tempQuestions.push({
              serialNumber: currentSerial++,
              questionId: qId,
              partType: type,
              isAnswered: answeredQuestions[qId] || false,
            });
          }
        }
  
        if (type === TestPartTypeEnum.READING) {
          const res = await testReadingService.getByIds(part.questions);
          for (const item of res.data || []) {
            for (const qId of item.questions || []) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: qId,
                partType: type,
                isAnswered: answeredQuestions[qId] || false,
              });
            }
          }
        }
  
        if (type === TestPartTypeEnum.LISTENING) {
          const res = await testListeningService.getByIds(part.questions);
          for (const item of res.data || []) {
            for (const qId of item.questions || []) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: qId,
                partType: type,
                isAnswered: answeredQuestions[qId] || false,
              });
            }
          }
        }
  
        if (type === TestPartTypeEnum.SPEAKING) {
          const res = await testSpeakingService.getByIds(part.questions);
          for (const item of res.data || []) {
            for (const qId of item.questions || []) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: qId,
                partType: type,
                isAnswered: answeredQuestions[qId] || false,
              });
            }
          }
        }
      }
  
      setStartSerials(tempStartSerials);
      setAllQuestions(tempQuestions);
    };
  
    loadQuestions();
  }, [
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    answeredQuestions,
  ]);
  useEffect(() => {
    const loadQuestions = async () => {
      let currentSerial = 1;
      const tempQuestions: QuestionItem[] = [];
      const tempStartSerials: Record<TestPartTypeEnum, number> = {
        VOCABULARY: 0,
        GRAMMAR: 0,
        READING: 0,
        LISTENING: 0,
        SPEAKING: 0,
        WRITING: 0,
      };
  
      for (const type of tabOrder) {
        let part;
        switch (type) {
          case TestPartTypeEnum.VOCABULARY: part = vocabularyPart; break;
          case TestPartTypeEnum.GRAMMAR: part = grammarPart; break;
          case TestPartTypeEnum.READING: part = readingPart; break;
          case TestPartTypeEnum.LISTENING: part = listeningPart; break;
          case TestPartTypeEnum.SPEAKING: part = speakingPart; break;
          case TestPartTypeEnum.WRITING: part = writingPart; break;
        }
  
        if (!part || !part.questions?.length) continue;
  
        tempStartSerials[type] = currentSerial;
  
        if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR || type === TestPartTypeEnum.WRITING) {
          for (const qId of part.questions) {
            tempQuestions.push({
              serialNumber: currentSerial++,
              questionId: qId,
              partType: type,
              isAnswered: answeredQuestions[qId] || false,
            });
          }
        }
  
        if (type === TestPartTypeEnum.READING) {
          const res = await testReadingService.getByIds(part.questions);
          for (const item of res.data || []) {
            for (const qId of item.questions || []) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: qId,
                partType: type,
                isAnswered: answeredQuestions[qId] || false,
              });
            }
          }
        }
  
        if (type === TestPartTypeEnum.LISTENING) {
          const res = await testListeningService.getByIds(part.questions);
          for (const item of res.data || []) {
            for (const qId of item.questions || []) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: qId,
                partType: type,
                isAnswered: answeredQuestions[qId] || false,
              });
            }
          }
        }
  
        if (type === TestPartTypeEnum.SPEAKING) {
          const res = await testSpeakingService.getByIds(part.questions);
          for (const item of res.data || []) {
            for (const qId of item.questions || []) {
              tempQuestions.push({
                serialNumber: currentSerial++,
                questionId: qId,
                partType: type,
                isAnswered: answeredQuestions[qId] || false,
              });
            }
          }
        }
      }
  
      setStartSerials(tempStartSerials);
      setAllQuestions(tempQuestions);
    };
  
    loadQuestions();
  }, [
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    answeredQuestions,
  ]);
    

  const handleQuestionSelect = (questionItem: QuestionItem) => {
    setActiveTab(questionItem.partType);
    setSelectedQuestionId(questionItem.questionId);
  };

  const renderSection = () => {
    switch (activeTab) {
      case TestPartTypeEnum.VOCABULARY:
        return vocabularyPart ? (
          <VocabularySection 
            partId={vocabularyPart.id}
            questionIds={vocabularyPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.VOCABULARY]}
          />
        ) : null;
        
      case TestPartTypeEnum.GRAMMAR:
        return grammarPart ? (
          <GrammarSection 
            partId={grammarPart.id}
            questionIds={grammarPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.GRAMMAR]}
          />
        ) : null;
        
      case TestPartTypeEnum.READING:
        return readingPart ? (
          <ReadingSection 
            partId={readingPart.id}
            testItemIds={readingPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.READING]}
          />
        ) : null;
        
      case TestPartTypeEnum.LISTENING:
        return listeningPart ? (
          <ListeningSection 
            partId={listeningPart.id}
            testItemIds={listeningPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.LISTENING]}
          />
        ) : null;
        
      case TestPartTypeEnum.SPEAKING:
        return speakingPart ? (
          <SpeakingSection 
            partId={speakingPart.id}
            testItemIds={speakingPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.SPEAKING]}
          />
        ) : null;
        
      case TestPartTypeEnum.WRITING:
        return writingPart ? (
          <WritingSection 
            partId={writingPart.id}
            testItemIds={writingPart.questions || []}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={startSerials[TestPartTypeEnum.WRITING]}
          />
        ) : null;
        
      default:
        return null;
    }
  };

  return (
    <Box 
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: '1rem',
        width: "100%",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Grid container spacing={2}>
        {isSmallScreen && (
          <Grid item xs={12}>
            <TimeRemaining />
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={9} lg={8}>
          <TestTabs
            activeTab={activeTab.toLowerCase()}
            onTabChange={(newTab) => {
              setActiveTab(newTab.toUpperCase() as TestPartTypeEnum);
              setSelectedQuestionId(null);
            }}
          />
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <IntroducePartTest type={activeTab} />
          </Box>
          
          <Box 
            sx={{ 
              mb: 4,
              p: { xs: 1, sm: 2 },
              bgcolor: isDarkMode ? color.gray800 : color.white, 
              borderRadius: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {renderSection()}
          </Box>

          {isSmallScreen && (
            <Box sx={{  display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Box sx={{ width: { xs: "80%", sm: "50%" } }}>
                <TestQuestionGrid 
                  questionItems={allQuestions}
                  onQuestionSelect={handleQuestionSelect}
                />
              </Box>
            </Box>
          )}
        </Grid>
        
        {!isSmallScreen && (
          <Grid item md={3} lg={4}>
            <TimeRemaining />
            <Box sx={{ mt: 3 }}>
              <TestQuestionGrid 
                questionItems={allQuestions}
                onQuestionSelect={handleQuestionSelect}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
          
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MixingTest;