'use client'

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Question } from "@/utils/types";
import { captureCodeImage } from "@/utils/captureCodeImage";

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
    width: "100%",
    height: "auto",
    marginTop: 5,
    borderRadius: 5,
  },
});

const PDFTemplate = ({ questions }: PDFTemplateProps) => {
  const [codeImages, setCodeImages] = useState<{ [key: string]: string }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const generateCodeImages = async () => {
      if (!isClient) return;

      // Wait for the DOM to update
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newImages: { [key: string]: string } = {};
      for (const q of questions) {
        const element = document.getElementById(`code-image-${q.id}`);
        if (!element) {
          console.error(`Element with id #code-image-${q.id} not found`);
          continue; // Skip if element is not found
        }

        try {
          const imageData = await captureCodeImage(`#code-image-${q.id}`);
          if (imageData) {
            newImages[q.id] = imageData;
          }
        } catch (error) {
          console.error(`Failed to capture image for question ${q.id}:`, error);
        }
      }
      setCodeImages(newImages);
    };

    generateCodeImages();
  }, [questions, isClient]);


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
            {codeImages[q.id] ? (
              <Image src={codeImages[q.id]} style={styles.codeImage} />
            ) : (
              <Text>No image available</Text>
            )}
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