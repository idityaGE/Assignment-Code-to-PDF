'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useLocalStorage } from '@/hook/useLocalStorage'
import { languages } from '@/utils/languages'
import { themes } from '@/utils/themes'
import { PreviewSection } from "./preview-section"
import { IntialCode, IntialOutput, IntialQuestion } from '@/lib/intialtext'

interface Question {
  id: string
  question: string
  code: string
  output: string
  language: string
}

export default function PDFGenerator() {
  const [questions, setQuestions] = useLocalStorage<Question[]>('pdfGenerator_questions', [
    {
      id: '1',
      question: IntialQuestion,
      code: IntialCode,
      output: IntialOutput,
      language: 'cpp'
    }
  ])
  const [theme, setTheme] = useLocalStorage('pdfGenerator_theme', 'a11y-dark')
  const [wrapCode, setWrapCode] = useState<boolean>(true)
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true)

  const previewRef = useRef<HTMLDivElement | null>(null)

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      code: '',
      output: '',
      language: 'cpp'
    }
    setQuestions([...questions, newQuestion])
  }

  const handleUpdateQuestion = (id: string, field: keyof Question, value: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q))
  }

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(questions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setQuestions(items)
  }

  const handleGeneratePDF = async () => {
    const html2canvas = (await import('html2canvas')).default
    const jsPDF = (await import('jspdf')).default

    const pdf = new jsPDF("portrait", "px", "a4")

    for (let i = 0; i < questions.length; i++) {
      const input = document.getElementById(`preview-${questions[i].id}`)
      if (!input) continue

      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL("image/png")

      if (i > 0) pdf.addPage()

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    }

    pdf.save("assignment.pdf")
  }

  return (
    <div className="container mx-3 p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment PDF Generator <a className="underline" target="_blank" href="https://github.com/idityaGE">GitHub</a></h1>
      <div className="flex-1 gap-4 md:flex">
        <div className="min-w-[35vw]">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {questions.map((q, index) => (
                        <Draggable key={q.id} draggableId={q.id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-4 p-4 border rounded">
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`question-${q.id}`}>Question</Label>
                                  <Textarea
                                    id={`question-${q.id}`}
                                    placeholder="Enter the question here"
                                    value={q.question}
                                    onChange={(e) => handleUpdateQuestion(q.id, 'question', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`code-${q.id}`}>Code</Label>
                                  <Textarea
                                    id={`code-${q.id}`}
                                    placeholder="Enter your code here"
                                    value={q.code}
                                    onChange={(e) => handleUpdateQuestion(q.id, 'code', e.target.value)}
                                    rows={10}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`output-${q.id}`}>Output</Label>
                                  <Textarea
                                    id={`output-${q.id}`}
                                    placeholder="Enter the output here"
                                    value={q.output}
                                    onChange={(e) => handleUpdateQuestion(q.id, 'output', e.target.value)}
                                    rows={7}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`language-${q.id}`}>Language</Label>
                                  <Select value={q.language} onValueChange={(value) => handleUpdateQuestion(q.id, 'language', value)}>
                                    <SelectTrigger id={`language-${q.id}`}>
                                      <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                          {lang.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={() => handleDeleteQuestion(q.id)} variant="destructive">Delete Question</Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Button onClick={handleAddQuestion} className="mt-4">Add Question</Button>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="wrap-code"
                  checked={wrapCode}
                  onCheckedChange={setWrapCode}
                />
                <Label htmlFor="wrap-code">Wrap Code</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-line-numbers"
                  checked={showLineNumbers}
                  onCheckedChange={setShowLineNumbers}
                />
                <Label htmlFor="show-line-numbers">Show Line Numbers</Label>
              </div>
              <div className="w-full">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGeneratePDF} className="w-full">Generate PDF</Button>
            </CardFooter>
          </Card>
        </div>
        <ScrollArea className="h-[90vh] min-w-[60vw]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <div ref={previewRef}>
                {questions.map((q) => (
                  <div key={q.id} id={`preview-${q.id}`}>
                    <PreviewSection
                      code={q.code}
                      question={q.question}
                      output={q.output}
                      language={q.language}
                      theme={theme}
                      wrapCode={wrapCode}
                      showLineNumbers={showLineNumbers}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}