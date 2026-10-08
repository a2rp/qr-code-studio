import QRCode from "qrcode";

export const maxQrCharacters = 2000;
export const qrCorrectionLevels = ["L", "M", "Q", "H"];

export const validateQrText = (text) => {
  const value = String(text ?? "");
  if (!value.trim()) throw new Error("Add a link or text to create a QR code.");
  if (value.length > maxQrCharacters) throw new Error(`Keep QR content under ${maxQrCharacters} characters.`);
  return value;
};

export const getQrOptions = ({ size = 240, correction = "M", margin = 2, dark = "#202743", light = "#ffffff" } = {}) => {
  if (!Number.isInteger(size) || size < 160 || size > 420) throw new Error("QR size must be between 160 and 420 pixels.");
  if (!qrCorrectionLevels.includes(correction)) throw new Error("Choose a supported error correction level.");
  if (!Number.isInteger(margin) || margin < 1 || margin > 5) throw new Error("QR margin must be between 1 and 5 modules.");
  if (![dark, light].every((color) => /^#[\da-f]{6}$/i.test(color))) throw new Error("Choose valid six-digit colors.");
  return { width: size, margin, errorCorrectionLevel: correction, color: { dark, light } };
};

export const createQrSvg = (text, options) => QRCode.toString(validateQrText(text), { ...getQrOptions(options), type: "svg" });
export const createQrPng = (text, options) => QRCode.toDataURL(validateQrText(text), { ...getQrOptions(options), type: "image/png" });
export const getQrFilename = (format) => `qr-code.${format === "svg" ? "svg" : "png"}`;
