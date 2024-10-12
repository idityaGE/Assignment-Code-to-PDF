

export type Question = {
  id: string
  question: string
  code: string
  output: string
  language: string
}


export type PreviewSectionProps = {
  code: string
  question: string
  output: string
  language: string
  theme: string
  wrapCode: boolean
  showLineNumbers: boolean
  questionNumber: number
}
