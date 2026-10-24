import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Exports the invitation card DOM element as a high-resolution PNG.
 */
export async function exportInvitationAsPng(element, filename = "wedding-invitation.png") {
  if (!element) throw new Error("Element not found for export");

  // Ensure all fonts (Bengali Hind Siliguri, Noto Serif, Latin Playfair) are fully ready
  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  // Create high-resolution canvas with 3x scale for crisp 300 DPI print quality
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports the invitation card DOM element as a 5x7 inch print-ready PDF.
 */
export async function exportInvitationAsPdf(element, filename = "wedding-invitation.pdf", orientation = "portrait") {
  if (!element) throw new Error("Element not found for export");

  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");

  // Standard 5x7 inches in points (72 points per inch -> 360 x 504)
  const isLandscape = orientation === "landscape";
  const pdfWidth = isLandscape ? 7 : 5;
  const pdfHeight = isLandscape ? 5 : 7;

  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "in",
    format: [pdfWidth, pdfHeight],
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
  pdf.save(filename);
}
