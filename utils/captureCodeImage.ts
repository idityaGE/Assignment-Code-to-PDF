import html2canvas from "html2canvas";

export const captureCodeImage = async (elementId: string): Promise<string> => {
  const element = document.getElementById(elementId);
  if (!element) return "";

  try {
    const canvas = await html2canvas(element, { backgroundColor: null });
    return canvas.toDataURL("image/png"); // Convert to base64 image
  } catch (error) {
    console.error("Error capturing code snapshot:", error);
    return "";
  }
};
