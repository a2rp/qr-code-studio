import assert from "node:assert/strict";
import test from "node:test";
import { createQrSvg, getQrFilename, getQrOptions, maxQrCharacters, qrCorrectionLevels, validateQrText } from "./qrCode.js";

test("validates QR content and preserves entered text", () => {
  assert.equal(validateQrText("  hello\nworld  "), "  hello\nworld  ");
  assert.throws(() => validateQrText(" \n "), /Add a link or text/);
  assert.throws(() => validateQrText("x".repeat(maxQrCharacters + 1)), /2000 characters/);
});

test("builds bounded QR settings with supported correction levels and colors", () => {
  assert.deepEqual(qrCorrectionLevels, ["L", "M", "Q", "H"]);
  assert.deepEqual(getQrOptions({ size: 320, correction: "Q", dark: "#121212", light: "#fefefe" }), { width: 320, margin: 2, errorCorrectionLevel: "Q", color: { dark: "#121212", light: "#fefefe" } });
  assert.throws(() => getQrOptions({ size: 90 }), /160 and 420/);
  assert.throws(() => getQrOptions({ correction: "X" }), /correction level/);
  assert.throws(() => getQrOptions({ dark: "red" }), /six-digit colors/);
});

test("generates a real SVG QR output and safe download filenames", async () => {
  const svg = await createQrSvg("https://example.com/hello", { size: 180 });
  assert.match(svg, /^<svg/);
  assert.match(svg, /viewBox=/);
  assert.equal(getQrFilename("svg"), "qr-code.svg");
  assert.equal(getQrFilename("png"), "qr-code.png");
});
