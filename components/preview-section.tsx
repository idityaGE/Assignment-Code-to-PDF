import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CardContent } from "@/components/ui/card"

interface PreviewSectionProps {
  code: string
  question: string
  output: string
  language: string
  theme: string
  wrapCode: boolean
  showLineNumbers: boolean
}

export const PreviewSection = ({ code, question, output, language, theme, wrapCode, showLineNumbers }: PreviewSectionProps) => {
  const [style, setStyle] = useState<any>(a11yDark)

  useEffect(() => {
    async function loadStyle() {
      try {
        const themeStyle = await import(`react-syntax-highlighter/dist/cjs/styles/prism/${theme}`)
        setStyle(themeStyle.default)
      } catch (error) {
        console.error("Error loading theme:", error)
        setStyle(a11yDark)
      }
    }
    loadStyle()
  }, [theme])

  return (
    <CardContent>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold">Question:</h3>
          <p>{question}</p>
        </div>
        <div>
          <h3 className="font-bold mb-3">Code:</h3>
          <div className={`overflow-y-auto ${wrapCode ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
            <SyntaxHighlighter
              language={language}
              style={style}
              wrapLongLines={wrapCode}
              showLineNumbers={showLineNumbers}
              PreTag="div"
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3">Output:</h3>
          <pre className="overflow-y-auto rounded-md bg-[#232323] text-white p-4">{output}</pre>
        </div>
      </div>
    </CardContent>
  )
}