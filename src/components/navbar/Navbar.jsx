import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="crt-nav">
      <ul className="nav-list">

        <li className="nav-item">
          <NavLink to="/">[F1] HOME</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/about">[F2] ABOUT-ME</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/projects">[F3] PROJECTS</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/contact">[F4] CONTACT</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/skins">[F5] SKINS</NavLink>
        </li>

      </ul>
    </nav>
  );
}
