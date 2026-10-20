
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="crt-nav">
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
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
  );
}
