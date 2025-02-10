'use client'

import React from 'react'
import { useQuestionContext } from '@/store/QuestionStore';
import { PreviewSection } from "./preview-section"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const Preview_data = () => {
  const {questions, theme, wrapCode, showLineNumbers} = useQuestionContext()

  return (
    <div>
      <ScrollArea className='h-[calc(100vh-4rem)]'>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Preview</CardTitle>
            </CardHeader>
            <div>
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
  )
}

export default Preview_data