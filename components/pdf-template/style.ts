
import { Font, StyleSheet } from '@react-pdf/renderer'

// Register a custom font for PDF generation
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
})


export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  code: {
    fontFamily: 'Roboto',
    fontSize: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  codeLine: {
    fontFamily: 'Roboto',
    fontSize: 10,
  },
})