'use client'

import { useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { useLocalStorage } from '@/hook/useLocalStorage'

import { languages } from '@/utils/languages'
import { themes } from '@/utils/themes'
import { IntialCode, IntialOutput, IntialQuestion } from '@/utils/intialtext'
import { Question } from "@/utils/types"

import { PreviewSection } from "./preview-section"
import { Nav } from "./nav/navbar"



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

    const previewAccordions = previewRef.current?.querySelectorAll('[data-state="closed"]')
    previewAccordions?.forEach((accordion) => {
      (accordion as HTMLElement).click()
    })

    await new Promise(resolve => setTimeout(resolve, 500))

    let pdf: any = null

    for (let i = 0; i < questions.length; i++) {
      const questionId = questions[i].id
      const questionElement = document.querySelector(`#preview-${questionId} .space-y-4`)
      if (!questionElement) continue

      const canvas = await html2canvas(questionElement as HTMLElement)
      const imgData = canvas.toDataURL("image/png")
      const imgWidth = canvas.width
      const imgHeight = canvas.height

      // Calculate the PDF page size based on the content
      const pdfWidth = imgWidth + 160 // Add padding
      const pdfHeight = imgHeight + 160 // Add padding

      if (!pdf) {
        pdf = new jsPDF({
          orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
          unit: "px",
          format: [pdfWidth, pdfHeight],
          compress: true
        })
      } else {
        pdf.addPage([pdfWidth, pdfHeight])
      }

      // Calculate centering offsets
      const xOffset = (pdfWidth - imgWidth) / 2
      const yOffset = (pdfHeight - imgHeight) / 2

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight)
    }

    pdf.save("assignment.pdf")

    previewAccordions?.forEach((accordion) => {
      (accordion as HTMLElement).click()
    })
  }


  return (
    <div className="container mx-3 p-4">
      <Nav />
      <div className="flex-1 gap-4 md:flex">
        <ScrollArea className="h-[90vh] min-w-[35vw]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Input</CardTitle>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="questions">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Accordion type="multiple" className="w-full">
                          {questions.map((q, index) => (
                            <Draggable key={q.id} draggableId={q.id} index={index}>
                              {(provided) => (
                                <AccordionItem value={q.id}>
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-4 border rounded">
                                    <AccordionTrigger className="px-4 py-2 text-lg font-semibold">
                                      Question {index + 1}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-4 p-4">
                                        <div>
                                          <Label htmlFor={`question-${q.id}`} className="font-semibold">Question</Label>
                                          <Textarea
                                            // className="bg-white"
                                            id={`question-${q.id}`}
                                            placeholder="Enter the question here"
                                            value={q.question}
                                            onChange={(e) => handleUpdateQuestion(q.id, 'question', e.target.value)}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor={`code-${q.id}`} className="font-semibold">Code</Label>
                                          <Textarea
                                            // className="bg-white"
                                            id={`code-${q.id}`}
                                            placeholder="Enter your code here"
                                            value={q.code}
                                            onChange={(e) => handleUpdateQuestion(q.id, 'code', e.target.value)}
                                            rows={10}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor={`output-${q.id}`} className="font-semibold">Output</Label>
                                          <Textarea
                                            // className="bg-white"
                                            id={`output-${q.id}`}
                                            placeholder="Enter the output here"
                                            value={q.output}
                                            onChange={(e) => handleUpdateQuestion(q.id, 'output', e.target.value)}
                                            rows={7}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor={`language-${q.id}`} className="font-semibold">Language</Label>
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
                                    </AccordionContent>
                                  </div>
                                </AccordionItem>
                              )}
                            </Draggable>
                          ))}
                        </Accordion>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <Button onClick={handleAddQuestion} className="mt-4" >Add Question</Button>
              </CardContent>
              <CardFooter className="flex-col items-start gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="wrap-code"
                    checked={wrapCode}
                    onCheckedChange={setWrapCode}
                  />
                  <Label htmlFor="wrap-code" className="font-semibold">Wrap Code</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-line-numbers"
                    checked={showLineNumbers}
                    onCheckedChange={setShowLineNumbers}
                  />
                  <Label htmlFor="show-line-numbers" className="font-semibold">Show Line Numbers</Label>
                </div>
                <div className="w-full">
                  <Label htmlFor="theme" className="font-bold">Theme</Label>
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
                <Button onClick={handleGeneratePDF} className="w-full" >Generate PDF</Button>
                {/* <Button onClick={handleGeneratePNG} className="w-full">Generate PNG</Button> */}
              </CardFooter>
            </Card>
          </div>
        </ScrollArea>
        <ScrollArea className="h-[90vh] min-w-[60vw]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Preview</CardTitle>
              </CardHeader>
              <div ref={previewRef}>
                {questions.map((q, index) => (
                  <div key={q.id} id={`preview-${q.id}`}>
                    <PreviewSection
                      code={q.code}
                      question={q.question}
                      output={q.output}
                      language={q.language}
                      theme={theme}
                      wrapCode={wrapCode}
                      showLineNumbers={showLineNumbers}
                      questionNumber={index + 1}
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