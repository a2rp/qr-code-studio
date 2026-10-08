import { FiArrowDown, FiArrowUpRight, FiLayers, FiShield } from "react-icons/fi";
import BackToTop from "./components/backToTop/index.jsx";
import QrWorkbench from "./components/qrWorkbench/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
  <div className={styles.appShell} id="top">
    <SiteHeader />
    <main>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.contextLabel}><span /> Make a little room for a big idea</p>
          <h1 id="hero-title">A small square.<br /><em>A whole destination.</em></h1>
          <p className={styles.intro}>Turn a link or a line of text into a QR code. Fine-tune the look, see it update, then take a sharp file with you.</p>
          <div className={styles.heroActions}><a className={styles.primaryLink} href="#studio">Create your QR code <FiArrowDown aria-hidden="true" /></a><span><FiShield aria-hidden="true" /> Made on this device</span></div>
          <div className={styles.heroSteps}><span><b>01</b> Write</span><i /><span><b>02</b> Style</span><i /><span><b>03</b> Share</span></div>
        </div>
        <div className={styles.heroArt} aria-label="Abstract QR code pattern with a frame for a destination" role="img">
          <div className={styles.artLabel}><span>SCAN / STUDIO</span><span><FiLayers aria-hidden="true" /> 01</span></div>
          <div className={styles.artCanvas}><div className={styles.codePattern}><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><span className={styles.codeTag}>YOUR LINK, IN A SQUARE</span></div>
          <div className={styles.artFooter}><span>QUIET SPACE</span><div /><b>KEEP IT SCANNABLE</b></div>
          <span className={styles.artCorner} aria-hidden="true">QR-01</span>
        </div>
        <a className={styles.scrollCue} href="#studio"><span>OPEN THE STUDIO</span><FiArrowDown aria-hidden="true" /></a>
      </section>
      <QrWorkbench />
      <section className={styles.guide} id="guide" aria-labelledby="guide-title">
        <div className={styles.guideIntro}><p className={styles.contextLabel}>A FEW THINGS ABOUT QR</p><h2 id="guide-title">Designed to be read by a camera.</h2><p>A QR code stores your text in a pattern of light and dark modules. Give scanners a clear contrast and enough blank space around the edges.</p></div>
        <div className={styles.guideCards}>
          <article><span>01 / CONTRAST</span><h3>Keep the foreground darker</h3><p>Dark modules on a light background are the most dependable choice for cameras and older scanners.</p></article>
          <article><span>02 / CORRECTION</span><h3>Add a little resilience</h3><p>Higher correction adds recoverable detail for a partially obscured code, while reducing how much text fits.</p></article>
          <article><span>03 / TESTING</span><h3>Scan before you share</h3><p>Try the saved file on more than one phone and at the size where it will actually appear or print.</p></article>
        </div>
        <p className={styles.privacyNote}><FiShield aria-hidden="true" /> The content and QR image are generated in your browser. Nothing is uploaded.</p>
        <div className={styles.guideFoot}><span>LINKS, NOTES, MENUS, AND MORE</span><a href="#studio">Return to the workbench <FiArrowUpRight aria-hidden="true" /></a></div>
      </section>
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
);

export default App;
