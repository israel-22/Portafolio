import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="crt-nav">
      <ul className="nav-list">

        <li>
          <NavLink className="nav-item" to="/">[F1] HOME</NavLink>
        </li>

        <li>
          <NavLink className="nav-item" to="/about">[F2] ABOUT-ME</NavLink>
        </li>

        <li>
          <NavLink className="nav-item" to="/projects">[F3] PROJECTS</NavLink>
        </li>

        <li>
          <NavLink className="nav-item" to="/contact">[F4] CONTACT</NavLink>
        </li>

         
 
        {/*<li>
          <NavLink className="nav-item" to="/skins">[F5] SKINS</NavLink>
        </li>*/}

      </ul>
    </nav>
  );
}
