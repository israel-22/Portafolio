import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const hideTimer = useRef(null);
  const lastScrollY = useRef(0);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleHide = () => {
    clearHideTimer();

    if (menuOpen) return;

    hideTimer.current = window.setTimeout(() => {
      setNavVisible(false);
    }, 4000);
  };

  const revealNavbar = () => {
    clearHideTimer();
    setNavVisible(true);
  };

  function closeMenu() {
    setMenuOpen(false);
    setNavVisible(true);
  }

  // Ocultar después de 4 segundos sin interacción.
  useEffect(() => {
  if (menuOpen) {
    clearHideTimer();
    return;
  }

  scheduleHide();

  return () => clearHideTimer();
}, [menuOpen]);

  // Mostrar al subir y programar ocultamiento al bajar.
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      if (currentScrollY < 60 || difference < -5) {
        revealNavbar();
        scheduleHide();
      } else if (difference > 5 && !menuOpen) {
        scheduleHide();
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  // Liberar el temporizador al desmontar el componente.
  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  return (
    <>
      <div
        className="nav-reveal-zone"
        onMouseEnter={revealNavbar}
        onTouchStart={revealNavbar}
        aria-hidden="true"
      />

      <nav
        className={`crt-nav ${navVisible ? "" : "is-hidden"}`}
        onMouseEnter={revealNavbar}
        onMouseLeave={() => {
          if (!menuOpen) scheduleHide();
        }}
      >
        <button
          type="button"
          className="menu-toggle"
          onClick={() => {
            if (!menuOpen) {
              revealNavbar();
              setMenuOpen(true);
            } else {
              closeMenu();
            }
          }}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-list ${menuOpen ? "is-open" : ""}`}>
          <li>
            <NavLink className="nav-item" to="/" onClick={closeMenu}>
              [F1] HOME
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item" to="/about" onClick={closeMenu}>
              [F2] ABOUT-ME
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item" to="/projects" onClick={closeMenu}>
              [F3] PROJECTS
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item" to="/contact" onClick={closeMenu}>
              [F4] CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item" to="/skins" onClick={closeMenu}>
              [F5] SKINS
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}