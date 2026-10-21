
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";
import CRTTransition from "../components/CRTTransition/CRTTransition";
import "./layout.css";
import "./typography/leters-crt.css";

export default function Layout({ children, onOpenPDA }) {
  const location = useLocation();
  const previousLocation = useRef(null);
  const [jellyActive, setJellyActive] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;

    if (previousLocation.current === null) {
      previousLocation.current = currentPath;
      return;
    }

    if (previousLocation.current === currentPath) return;

    previousLocation.current = currentPath;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  return;
}

   

    const timer = window.setTimeout(() => {
      setJellyActive(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`layout-container${jellyActive ? " layout-container--jelly" : ""}`}
    >
      <CRTTransition />
      <Navbar />

      <main className="terminal-content">
        <div className="content-area">
          <div className="crt-wrapper">
            <div className="crt-screen">{children}</div>
          </div>
        </div>
      </main>

      <Footer onOpenPDA={onOpenPDA} />
    </div>
  );
}
