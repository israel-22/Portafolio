import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./crt-transition.css";

export default function CRTTransition() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const previousLocation = useRef(null);

  useEffect(() => {
    const currentLocation = location.pathname;

    if (previousLocation.current === null) {
      previousLocation.current = currentLocation;
      return;
    }

    if (previousLocation.current === currentLocation) {
      return;
    }

    previousLocation.current = currentLocation;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setActive(false);

    const startTimer = window.setTimeout(() => {
      setActive(true);
    }, 0);

    const endTimer = window.setTimeout(() => {
      setActive(false);
    }, 300);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(endTimer);
    };
  }, [location.pathname]);

  return (
    <div
      className={`crt-transition${active ? " crt-transition--active" : ""}`}
      aria-hidden="true"
    >
      <div className="crt-transition__static" />
      <div className="crt-transition__sync-band" />
      <div className="crt-transition__flash" />
    </div>
  );
}
