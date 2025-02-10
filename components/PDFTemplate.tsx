import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { Question } from "@/utils/types";
import { captureCodeImage } from "@/utils/captureCodeImage"; // Import function

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
  outputContainer: {
    backgroundColor: "#232323",
    padding: 10,
    borderRadius: 5,
    fontSize: 10,
    marginTop: 5,
    color: "#fff",
  },
  codeImage: {
    width: "100%", // Full width
    height: "auto",
    marginTop: 5,
    borderRadius: 5,
  },
});

const PDFTemplate = ({ questions }: PDFTemplateProps) => {
  const [codeImages, setCodeImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const generateCodeImages = async () => {
      const newImages: { [key: string]: string } = {};
      for (const q of questions) {
        newImages[q.id] = await captureCodeImage(`code-image-${q.id}`);
      }
      setCodeImages(newImages);
    };

    generateCodeImages();
  }, [questions]);

  return (
    <Document>
      {questions.map((q, index) => (
        <Page key={q.id} size="A4" wrap style={styles.page}>
          {/* Question Section */}
          <View style={styles.section}>
            <Text style={styles.questionTitle}>Question {index + 1}:</Text>
            <Text>{q.question}</Text>
          </View>

          {/* Code Section (With Image) */}
          <View style={styles.section}>
            <Text style={styles.questionTitle}>Code:</Text>
            {codeImages[q.id] ? <Image src={codeImages[q.id]} style={styles.codeImage} /> : <Text>Generating...</Text>}
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
