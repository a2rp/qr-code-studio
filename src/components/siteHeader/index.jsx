import { FiGithub, FiGrid } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
  <header className={styles.header}>
    <div className={styles.bar}>
      <a className={styles.brand} href="#top" aria-label="QR Code Studio home">
        <span className={styles.brandMark}><FiGrid aria-hidden="true" /></span>
        <span>QR <b>Studio</b></span>
      </a>
      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="#studio">Create</a>
        <a href="#guide">How it works</a>
      </nav>
      <a className={styles.repository} href="https://github.com/a2rp/qr-code-studio" target="_blank" rel="noreferrer">
        <FiGithub aria-hidden="true" /> <span>Repository</span>
      </a>
    </div>
  </header>
);

export default SiteHeader;


