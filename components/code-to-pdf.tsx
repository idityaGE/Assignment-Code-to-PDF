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
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


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
    const imgWidth = canvas.width;
    const imgHeight = canvas.height

    const pdf = new jsPDF("portrait", "px", [imgWidth, imgHeight], true);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("assignment.pdf");
  };

  const handleGeneratePNG = async () => {
    const canvas = await html2canvas(previewRef.current as HTMLElement);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'captured-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="container mx-3 p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment PDF Generator</h1>
      <div className="flex gap-4">
        <div className="min-w-[35vw]">
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
            <CardFooter className="gap-4">
              <Button onClick={handleGeneratePDF}>Generate PDF</Button>
              <Button onClick={handleGeneratePNG}>Generate PNG</Button>
            </CardFooter>
          </Card>
        </div>
        <ScrollArea className="h-[90vh] min-w-[60vw]">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <div ref={previewRef} id="pdfCode">
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