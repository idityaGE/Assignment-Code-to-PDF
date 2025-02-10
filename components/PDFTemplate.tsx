import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Question } from "@/utils/types";

interface PDFTemplateProps {
  questions: Question[];
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#333",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 5,
    borderBottom: "1 solid #ccc",
  },
  questionTitle: {
    fontSize: 16,
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
    marginTop: 5,
    whiteSpace: "pre-wrap", // Preserves formatting
  },
  outputContainer: {
    backgroundColor: "#232323",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
  },
});

const PDFTemplate = ({ questions }: PDFTemplateProps) => {
  return (
    <Document>
      {questions.map((q, index) => (
        <Page key={q.id} size="A4" style={styles.page}>
          {/* Question Section */}
          <View style={styles.section}>
            <Text style={styles.questionTitle}>Question {index + 1}:</Text>
            <Text>{q.question}</Text>
          </View>

          {/* Code Section (No Prism.js) */}
          <View style={styles.section}>
            <Text style={styles.questionTitle}>Code:</Text>
            <Text style={styles.codeContainer}>{q.code}</Text>
          </View>

          {/* Output Section */}
          <View>
            <Text style={styles.questionTitle}>Output:</Text>
            <Text style={styles.outputContainer}>{q.output}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PDFTemplate;
