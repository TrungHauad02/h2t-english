import { ToeicPart3_4, ToeicQuestion } from 'interfaces';

export interface Part3_4EditDialogProps {
  open: boolean;
  question: ToeicPart3_4;
  partNumber: 3 | 4;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart3_4) => void;
  toeicQuestions?: { [partId: number]: ToeicQuestion[] };
}

export interface QuestionContentEditorProps {
  questionIndex: number;
  questionId: number;
  subQuestion?: ToeicQuestion;
  editedQuestion: ToeicPart3_4;
  handleChange: (field: keyof ToeicPart3_4, value: any) => void;
  answerOptions: { label: string; value: string }[];
  getAnswersForQuestion: (questionIndex: number) => string[];
  handleAnswerChange: (questionIndex: number, answerIndex: number, value: string) => void;
  getCorrectAnswerField: (questionIndex: number) => string;
  isDarkMode: boolean;
  color: any;
}