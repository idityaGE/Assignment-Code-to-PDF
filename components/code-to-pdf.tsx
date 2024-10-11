'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { generatePDF } from './pdf-template/template'
import { useLocalStorage } from '@/hook/useLocalStorage'


SyntaxHighlighter.registerLanguage('javascript', js)

export default function PDFGenerator() {
  const [question, setQuestion] = useLocalStorage('pdfGenerator_question', '');
  const [code, setCode] = useLocalStorage('pdfGenerator_code', '');
  const [output, setOutput] = useLocalStorage('pdfGenerator_output', '');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment PDF Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter the question here"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="code">Code</Label>
                  <Textarea
                    id="code"
                    placeholder="Enter your code here"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={15}
                  />
                </div>
                <div>
                  <Label htmlFor="output">Output</Label>
                  <Textarea
                    id="output"
                    placeholder="Enter the output here"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    rows={8}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => generatePDF({ question, code, output })}>Generate PDF</Button>
            </CardFooter>
          </Card>
        </div>
        <ScrollArea className="h-[90vh]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">Question:</h3>
                    <p>{question}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Code:</h3>
                    <div className="overflow-y-auto">
                      <SyntaxHighlighter language="javascript" style={docco}>
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">Output:</h3>
                    <pre className="overflow-y-auto">{output}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}