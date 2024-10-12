import { pdf, Document, Page, Text, View } from '@react-pdf/renderer'
import { styles } from './style'

type CodeToPDFProps = {
  question: string
  code: string
  output: string
  language?: string
  theme?: string
  wrapCode?: string
  showLineNumbers?: string
}

export const generatePDF = async ({
  question,
  code,
  output,
  language,
  theme,
  wrapCode,
  showLineNumbers
}: CodeToPDFProps) => {
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Assignment</Text>
          <Text style={styles.text}>Question:</Text>
          <Text style={styles.text}>{question}</Text>
          <Text style={styles.text}>Code:</Text>
          <View style={styles.code}>
            {code.split('\n').map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
          </View>
          <Text style={styles.text}>Output:</Text>
          <Text style={styles.text}>{output}</Text>
        </View>
      </Page>
    </Document>
  )

  const blob = await pdf(MyDocument).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'assignment.pdf'
  link.click()
  URL.revokeObjectURL(url)
}

