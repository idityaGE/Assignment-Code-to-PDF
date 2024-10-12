
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CardContent } from "@/components/ui/card"

interface PreviewSectionProps {
  code: string
  question: string
  output: string
  language?: string
  style?: any
  wrapCode?: string
  showLineNumbers?: string
}

export const PreviewSection = ({ code, question, output, language, style, wrapCode, showLineNumbers }: PreviewSectionProps) => {
  return (
    <CardContent>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold">Question:</h3>
          <p>{question}</p>
        </div>
        <div>
          <h3 className="font-bold">Code:</h3>
          <div className={`overflow-y-auto ${wrapCode ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
            <SyntaxHighlighter
              language={language}
              style={style}
              wrapLongLines={!!wrapCode}
              showLineNumbers={!!showLineNumbers}
            >
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
  )
}