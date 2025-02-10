

// const handleGeneratePDF = async () => {
//   const html2canvas = (await import('html2canvas')).default
//   const jsPDF = (await import('jspdf')).default

//   const previewAccordions = previewRef.current?.querySelectorAll('[data-state="closed"]')
//   previewAccordions?.forEach((accordion) => {
//     (accordion as HTMLElement).click()
//   })

//   await new Promise(resolve => setTimeout(resolve, 500))

//   let pdf: any = null

//   for (let i = 0; i < questions.length; i++) {
//     const questionId = questions[i].id
//     const questionElement = document.querySelector(`#preview-${questionId} .space-y-4`)
//     if (!questionElement) continue

//     const canvas = await html2canvas(questionElement as HTMLElement)
//     const imgData = canvas.toDataURL("image/png")
//     const imgWidth = canvas.width
//     const imgHeight = canvas.height

//     // Calculate the PDF page size based on the content
//     const pdfWidth = imgWidth + 160 // Add padding
//     const pdfHeight = imgHeight + 160 // Add padding

//     if (!pdf) {
//       pdf = new jsPDF({
//         orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
//         unit: "px",
//         format: [pdfWidth, pdfHeight],
//         compress: true
//       })
//     } else {
//       pdf.addPage([pdfWidth, pdfHeight])
//     }

//     // Calculate centering offsets
//     const xOffset = (pdfWidth - imgWidth) / 2
//     const yOffset = (pdfHeight - imgHeight) / 2

//     pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight)
//   }

//   pdf.save("assignment.pdf")

//   previewAccordions?.forEach((accordion) => {
//     (accordion as HTMLElement).click()
//   })
// }