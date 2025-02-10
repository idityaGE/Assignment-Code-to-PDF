import { Question } from "@/utils/types"

type SetQuestion = React.Dispatch<React.SetStateAction<Question[]>>

const useHandleQuestion = () => {

  // === handleAddQuestion ===
  const handleAddQuestion = (setQuestions: SetQuestion) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      code: '',
      output: '',
      language: 'cpp'
    }
    setQuestions((prev) => [...prev, newQuestion])
  }

  // === handleDeleteQuestion ===
  const handleDeleteQuestion = (id: string, setQuestions: SetQuestion) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  // === handleUpdateQuestion ===
  const handleUpdateQuestion = (id: string, field: keyof Question, value: string, setQuestions: SetQuestion) => {
    setQuestions(
      (prev) =>
        prev.map((q) => {
          if (q.id === id) {
            return { ...q, [field]: value }
          }
          return q
        })
    )
  }

  return {
    handleAddQuestion,
    handleDeleteQuestion,
    handleUpdateQuestion
  }
}

export default useHandleQuestion