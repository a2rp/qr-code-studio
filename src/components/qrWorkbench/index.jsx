import { useEffect, useRef, useState } from "react";
import { FiCheck, FiDownload, FiGrid, FiRefreshCw, FiShare2 } from "react-icons/fi";
import { createQrPng, createQrSvg, getQrFilename, getQrOptions, qrCorrectionLevels, validateQrText } from "../../utils/qrCode.js";
import styles from "./styles.module.css";

const QrWorkbench = () => {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(240);
  const [correction, setCorrection] = useState("M");
  const [dark, setDark] = useState("#202743");
  const [light, setLight] = useState("#ffffff");
  const [assets, setAssets] = useState(null);
  const [format, setFormat] = useState("png");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const generationRef = useRef(0);
  const svgUrlRef = useRef("");

  useEffect(() => {
    const generationId = ++generationRef.current;
    const timer = window.setTimeout(() => {
      try {
        validateQrText(text);
        setAssets(null);
        setGenerating(true);
        setError("");
        const options = getQrOptions({ size, correction, dark, light });
        Promise.all([createQrPng(text, options), createQrSvg(text, options)])
          .then(([png, svg]) => {
            if (generationId !== generationRef.current) return;
            if (svgUrlRef.current) URL.revokeObjectURL(svgUrlRef.current);
            svgUrlRef.current = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
            setAssets({ png, svg: svgUrlRef.current });
            setGenerating(false);
          })
          .catch((generationError) => {
            if (generationId !== generationRef.current) return;
            setAssets(null);
            setError(generationError.message || "This content could not be encoded as a QR code.");
            setGenerating(false);
          });
      } catch (generationError) {
        if (svgUrlRef.current) URL.revokeObjectURL(svgUrlRef.current);
        svgUrlRef.current = "";
        setAssets(null);
        setError(generationError.message);
        setGenerating(false);
      }
    }, 90);
    return () => {
      window.clearTimeout(timer);
      generationRef.current += 1;
    };
  }, [text, size, correction, dark, light]);

  useEffect(() => () => {
    generationRef.current += 1;
    if (svgUrlRef.current) URL.revokeObjectURL(svgUrlRef.current);
  }, []);

  const resetSettings = () => {
    setSize(240);
    setCorrection("M");
    setDark("#202743");
    setLight("#ffffff");
    setFormat("png");
  };

  const downloadUrl = format === "svg" ? assets?.svg : assets?.png;

  return (
    <section className={styles.workbench} id="studio" aria-labelledby="studio-title">
      <div className={styles.workbenchHeader}><div><p>THE GENERATOR / 01</p><h2 id="studio-title">Make a code your own.</h2><span>Adjust the shape of your QR code, then save a crisp image for print or screen.</span></div><span className={styles.localBadge}><FiCheck aria-hidden="true" /> GENERATED LOCALLY</span></div>
      <div className={styles.layout}>
        <div className={styles.controls}>
          <label className={styles.controlLabel} htmlFor="qr-content">Text or destination link</label>
          <textarea id="qr-content" rows="4" maxLength="2000" value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste a link or type text" aria-describedby="character-count" />
          <div className={styles.textMeta}><span>Up to 2,000 characters</span><span id="character-count">{text.length} / 2,000</span></div>
          <div className={styles.settingHeading}><span>SIZE</span><b>{size} px</b></div>
          <input className={styles.range} aria-label="QR code size" type="range" min="160" max="420" step="20" value={size} onChange={(event) => setSize(Number(event.target.value))} />
          <div className={styles.rangeLabels}><span>Compact</span><span>Large</span></div>
          <fieldset className={styles.correction}>
            <legend>Error correction</legend>
            <div>{qrCorrectionLevels.map((level) => <button className={correction === level ? styles.selected : ""} key={level} type="button" aria-pressed={correction === level} onClick={() => setCorrection(level)}><b>{level}</b><span>{({ L: "Low", M: "Medium", Q: "High", H: "Highest" })[level]}</span></button>)}</div>
            <p>Higher correction can help when a code is partly damaged, but it adds more pattern detail.</p>
          </fieldset>
          <div className={styles.colorFields}>
            <label htmlFor="qr-dark">Code color <span><input id="qr-dark" type="color" value={dark} onChange={(event) => setDark(event.target.value)} />{dark.toUpperCase()}</span></label>
            <label htmlFor="qr-light">Background <span><input id="qr-light" type="color" value={light} onChange={(event) => setLight(event.target.value)} />{light.toUpperCase()}</span></label>
          </div>
          <button className={styles.resetButton} type="button" onClick={resetSettings}><FiRefreshCw aria-hidden="true" /> Reset appearance</button>
        </div>
        <div className={styles.previewPanel} aria-busy={generating}>
          <div className={styles.previewHeading}><span>LIVE PREVIEW</span><span><FiShare2 aria-hidden="true" /> SCAN TO OPEN</span></div>
          <div className={styles.qrFrame}>
            {assets ? <img className={styles.qrImage} src={assets.svg} alt="Generated QR code preview" /> : <div className={styles.emptyCode}><FiGrid aria-hidden="true" /><span>{generating ? "Drawing your code..." : "Enter a little text to begin"}</span></div>}
          </div>
          <p className={styles.previewCaption}>{text.length ? "Check contrast and quiet space before printing." : "A short link is a good place to start."}</p>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.downloadRow}><div className={styles.formatTabs} role="group" aria-label="Download format"><button type="button" className={format === "png" ? styles.activeFormat : ""} aria-pressed={format === "png"} onClick={() => setFormat("png")}>PNG</button><button type="button" className={format === "svg" ? styles.activeFormat : ""} aria-pressed={format === "svg"} onClick={() => setFormat("svg")}>SVG</button></div><a className={`${styles.download} ${!downloadUrl || generating ? styles.disabled : ""}`} href={downloadUrl || undefined} download={getQrFilename(format)} aria-disabled={!downloadUrl || generating} onClick={(event) => { if (!downloadUrl || generating) event.preventDefault(); }}><FiDownload aria-hidden="true" /> Download {format.toUpperCase()}</a></div>
          <p className={styles.downloadHint}>PNG for everyday sharing · SVG for sharp print artwork</p>
        </div>
      </div>
    </section>
  );
};

export default QrWorkbench;
