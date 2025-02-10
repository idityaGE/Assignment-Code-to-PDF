import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Prism from "prismjs";
import "prismjs/components/prism-cpp"; // Load the required language
import "prismjs/themes/prism-tomorrow.css"; // Syntax highlighting theme

interface PDFTemplateProps {
  question: string;
  code: string;
  output: string;
  language: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#333",
  },
  section: {
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1 solid #ccc",
  },
  question: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  codeContainer: {
    backgroundColor: "#282c34",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontFamily: "Courier",
    fontSize: 10,
  },
  outputContainer: {
    backgroundColor: "#232323",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontSize: 10,
  },
});

const PDFTemplate = ({ question, code, output, language }: PDFTemplateProps) => {
  // Highlighted Code using Prism.js
  const highlightedCode = Prism.highlight(code, Prism.languages[language] || Prism.languages.cpp, language);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Question Section */}
        <View style={styles.section}>
          <Text style={styles.question}>Question:</Text>
          <Text>{question}</Text>
        </View>

        {/* Code Section */}
        <View style={styles.section}>
          <Text style={styles.question}>Code:</Text>
          <Text style={styles.codeContainer}>{highlightedCode}</Text>
        </View>

        {/* Output Section */}
        <View>
          <Text style={styles.question}>Output:</Text>
          <Text style={styles.outputContainer}>{output}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;
