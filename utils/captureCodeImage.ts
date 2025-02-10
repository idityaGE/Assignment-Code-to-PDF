'use client'

import html2canvas from "html2canvas";

export const captureCodeImage = async (elementId: string): Promise<string> => {
  // Wait a short time to ensure rendering
  await new Promise(resolve => setTimeout(resolve, 500));

  //@ts-ignore
  const element = document.querySelector(`#${elementId}`);

  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return "";
  }

  try {
    const canvas = await html2canvas(element as HTMLElement);
    const imageData = canvas.toDataURL("image/png");
    console.log(`Captured code snapshot for ${elementId}`);
    return imageData
  } catch (error) {
    console.error(`Error capturing code snapshot for ${elementId}:`, error);
    return "";
  }
};