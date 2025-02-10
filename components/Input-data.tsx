'use client'

import { useState } from 'react'

import { Question } from '@/utils/types'
import { useLocalStorage } from '@/hook/useLocalStorage'
import { IntialCode, IntialOutput, IntialQuestion } from '@/utils/intialtext'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { languages } from '@/utils/languages'
import { themes } from '@/utils/themes'

const Input_Data = () => {
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

  const [wrapCode, setWrapCode] = useState<boolean>(false)
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true)


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Input</CardTitle>
        </CardHeader>

        <CardContent>
          <Accordion type='multiple' className='w-full'>
            {
              questions.map((question, index) => (
                <AccordionItem key={question.id} value={question.id} className=' my-2' >

                  <AccordionTrigger className='px-2 text-lg font-semibold bg-gray-200 rounded-2xl' >
                    Question {index + 1}
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className='flex w-full'>
                      <div className=' bg-black w-1 ml-4'></div>

                      <div className='flex flex-col gap-4 w-full ml-3 pt-2'>

                        <div>
                          <Label htmlFor={`question-${question.id}`} className='font-semibold'>Question</Label>
                          <Textarea
                            id={`question-${question.id}`}
                            placeholder='Enter your question here...'
                            value={question.question}
                            className='w-full'
                            onChange={(e) => {
                              setQuestions(questions.map(q => q.id === question.id ? { ...q, question: e.target.value } : q))
                            }}
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`code-${question.id}`} className='font-semibold'>Code</Label>
                          <Textarea
                            id={`code-${question.id}`}
                            placeholder='Enter your code here...'
                            value={question.code}
                            className='w-full'
                            onChange={(e) => {
                              setQuestions(questions.map(q => q.id === question.id ? { ...q, code: e.target.value } : q))
                            }}
                            rows={10}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`output-${question.id}`} className='font-semibold'>Output</Label>
                          <Textarea
                            id={`output-${question.id}`}
                            placeholder='Enter your output here...'
                            value={question.output}
                            className='w-full'
                            onChange={(e) => {
                              setQuestions(questions.map(q => q.id === question.id ? { ...q, output: e.target.value } : q))
                            }}
                            rows={7}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`language-${question.id}`} className="font-semibold">Language</Label>
                          <Select
                            value={question.language}
                            onValueChange={(value) => setQuestions(questions.map(q => q.id === question.id ? { ...q, language: value } : q))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Select Language' />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                languages.map((lang) => (
                                  <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          onClick={() => setQuestions(questions.filter(q => q.id !== question.id))}
                        >
                          Delete Question
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>

          <CardFooter className="flex-col items-start gap-4">
            <Button
              onClick={() => {
                const newQuestion: Question = {
                  id: Date.now().toString(),
                  question: '',
                  code: '',
                  output: '',
                  language: 'cpp'
                }
                setQuestions([...questions, newQuestion])
              }}
              className="mt-4"
            >
              Add Question
            </Button>

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

            <Button
              // onClick={ }
              className="w-full"
            >
              Generate PDF
            </Button>

          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}

export default Input_Data