'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useLocalStorage } from '@/hook/useLocalStorage'

import { languages } from '@/utils/languages'
import { themes } from '@/utils/themes'
import { useEffect, useState, useRef } from "react"

import { PreviewSection } from "./preview-section"

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function PDFGenerator() {
  const [question, setQuestion] = useLocalStorage('pdfGenerator_question', '');
  const [code, setCode] = useLocalStorage('pdfGenerator_code', '');
  const [output, setOutput] = useLocalStorage('pdfGenerator_output', '');
  const [language, setLanguage] = useLocalStorage('pdfGenerator_language', 'javascript');
  const [theme, setTheme] = useLocalStorage('pdfGenerator_theme', 'docco');
  const [wrapCode, setWrapCode] = useLocalStorage('pdfGenerator_wrapCode', "true");
  const [showLineNumbers, setShowLineNumbers] = useLocalStorage('pdfGenerator_showLineNumbers', "true");

  const previewRef = useRef<HTMLDivElement | null>(null)

  const handleGeneratePDF = async () => {
    const input = previewRef.current;
    if (!input) return;

    const canvas = await html2canvas(input);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("assignment.pdf");
  };

  const [style, setStyle] = useState(a11yDark || null);

  useEffect(() => {
    async function loadStyle() {
      try {
        const themeStyle = await import(
          `react-syntax-highlighter/dist/cjs/styles/prism/${theme}`
        );
        setStyle(themeStyle.default);
      } catch (error) {
        console.error("Error loading theme:", error);
        setStyle(a11yDark);
      }
    }
    loadStyle();
  }, [theme]);

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
                    rows={10}
                  />
                </div>
                <div>
                  <Label htmlFor="output">Output</Label>
                  <Textarea
                    id="output"
                    placeholder="Enter the output here"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    rows={7}
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
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
                  <div className="flex-1">
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
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="wrap-code"
                    checked={!!wrapCode}
                    //@ts-ignore
                    onCheckedChange={setWrapCode}
                  />
                  <Label htmlFor="wrap-code">Wrap Code</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-line-numbers"
                    checked={!!showLineNumbers}
                    //@ts-ignore
                    onCheckedChange={setShowLineNumbers}
                  />
                  <Label htmlFor="show-line-numbers">Show Line Numbers</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGeneratePDF}>Generate PDF</Button>
            </CardFooter>
          </Card>
        </div>
        <ScrollArea className="h-[90vh]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <div ref={previewRef}>
                <PreviewSection
                  code={code}
                  question={question}
                  output={output}
                  language={language}
                  style={style}
                  wrapCode={wrapCode}
                  showLineNumbers={showLineNumbers}
                />
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}