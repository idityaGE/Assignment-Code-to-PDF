'use client';

import { createContext, useContext } from "react";
import { Question } from "@/utils/types";
import { useLocalStorage } from "@/hook/useLocalStorage";
import { IntialCode, IntialOutput, IntialQuestion } from "@/utils/intialtext";

interface ContextType {
  questions: Question[];
  setQuestions: (ques: Question[]) => void;
  theme: string;
  setTheme: (theme: string) => void;
  wrapCode: boolean;
  setWrapCode: (wrap: boolean) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (show: boolean) => void;
}

// Create the context with a default value
const QuestionContext = createContext<ContextType | undefined>(undefined);

export const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useLocalStorage<Question[]>("pdfGenerator_questions", [
    {
      id: "1",
      question: IntialQuestion,
      code: IntialCode,
      output: IntialOutput,
      language: "cpp",
    },
  ]);

  const [theme, setTheme] = useLocalStorage("pdfGenerator_theme", "a11y-dark");
  const [wrapCode, setWrapCode] = useLocalStorage("pdfGenerator_wrapCode", false);
  const [showLineNumbers, setShowLineNumbers] = useLocalStorage("pdfGenerator_showLineNumbers", true);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        theme,
        setTheme,
        wrapCode,
        setWrapCode,
        showLineNumbers,
        setShowLineNumbers,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

// Custom hook to use context
export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestionContext must be used within a QuestionProvider");
  }
  return context;
};
