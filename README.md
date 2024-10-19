# Assignment PDF Generator with HTML2Canvas and jsPDF

This project is a Next.js-based tool that generates a well-structured PDF file by capturing sections of a webpage using `html2canvas` and `jsPDF`. It is designed specifically for students who want to submit programming assignments in a uniform PDF format, featuring code, questions, and terminal outputs. The tool allows adding multiple questions, changing the code theme, and selecting the programming language.
<details>

<summary>

## :notebook_with_decorative_cover: Table of Contents

</summary>

- [What It Does](#what-it-does)
- [Motivation](#motivation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Customization](#customization)
- [License](#license)

</details>

## What It Does
This project simplifies the process of creating assignment PDFs by enabling users to:
- Add multiple questions with corresponding code and terminal output.
- Capture and generate a PDF from dynamically rendered sections of the webpage.
- Customize the code's appearance by selecting different themes and programming languages.
- Automatically expand only the required sections (such as preview sections) for capturing and exclude unnecessary parts.

## Motivation
Students, including myself and my batchmates, frequently face the challenge of submitting programming assignments in PDF format. The problem arises because each student creates PDFs in their own structure, making it difficult for professors to grade consistently. To solve this, I built a tool that standardizes the PDF format for assignments. This project ensures that everyone submits a well-organized PDF with a unified structure, making it easier for both students and professors.

## Features
- Generate PDF from dynamically rendered questions, code, and terminal output sections of a webpage.
- Add multiple questions and include corresponding code snippets and output in one PDF.
- Change the code theme and select different programming languages for syntax highlighting.
- Excludes unnecessary sections during PDF generation.
- Utilizes `html2canvas` to capture the DOM and convert it to images.
- Uses `jsPDF` to combine images into a single PDF file with adjustable page sizes.

## :camera: Screenshots

![Realtime Preview](/.github/images/img1.png "Realtime Preview")

![Adding More Question](/.github/images/img2.png "Adding More Question")

:movie_camera: [Demo PDF](/.github/sample_pdf/assignment%20(5).pdf)

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/idityage "Buy me a Coffee")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/idityage?style=social&label=Follow&maxAge=2592000)](https://github.com/idityage "Follow Me")


## :gear: Technologies Used
- **Next.js**: Server-side rendered React framework.
- **React-Syntax-Highlighter**: For syntax highlighting of code with customizable themes.
- **html2canvas**: Converts HTML elements to canvas.
- **jsPDF**: Creates PDFs from images and other content.
- **TypeScript**: Ensures type safety and enhanced IDE support.
- **CSS Modules**: For styling components.

## :toolbox: Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/idityaGE/Assignment-Code-to-PDF.git
   cd Assignment-Code-to-PDF
   ```

2. **Install Dependencies**

   Install the required dependencies using npm or yarn:

   ```bash
   npm install
   ```

   Or with yarn:

   ```bash
   yarn install
   ```

3. **Run the Application**

   To start the application in development mode:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

4. **Build for Production**

   To create a production build of the application:

   ```bash
   npm run build
   npm run start
   ```

## :page_with_curl: Usage

1. **Add Questions and Code**:  
   The tool allows you to input multiple questions, write code for each question, and show the terminal output. You can customize the code's theme and language to suit your preferences.

2. **Preview and Generate PDF**: 
    - Clicking the "Generate PDF" button will expand the relevant sections and capture each part of the webpage as a PNG image.
    - The PNG images are then combined into a PDF file, with each page sized according to the captured content.
    - The final PDF is downloaded with the filename `assignment.pdf`.

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :wrench: Customization

### Modify PDF Layout

- You can customize the layout of the generated PDF, including:
  - **Margins**: Adjust the `imgX` and `imgY` values in the `handleGeneratePDF()` function to change the positioning of images on the PDF pages.
  - **Page Size**: The page size is dynamically set based on the content size. If you want a fixed page size, modify the `jsPDF` constructor to use a fixed dimension.

### Capture Additional Sections

- To include additional sections outside of the question/code/output structure, adjust the `document.querySelector()` calls to target different DOM elements.
- If needed, you can modify the selector logic to include or exclude specific content based on your preferences.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#idityage/Assignment-Code-to-PDF&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=idityage/Assignment-Code-to-PDF&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=idityage/Assignment-Code-to-PDF&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=idityage/Assignment-Code-to-PDF&type=Timeline" />
</picture>
</a>


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
