import { useState } from "react";

import "./proyects.css";

import projects from "../../data/proyectExport";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";

import Typewriter from "../../components/typewriter/Typewriter";
import Wdd131 from "../../assets/projects/wdd131.webp";
import Wdd231 from "../../assets/projects/wdd231.webp";
import VaultTecLogo from "../../assets/icons/FO4_Vault-Tec_logo.webp";
import Portfolio from "../../assets/projects/portfolio.webp";
import ACPImage from "../../assets/icons/FO76_Quest_ACP.webp";


export default function Projects() {
  const [selected, setSelected] = useState(0);

  const current = projects[selected];
  const imageMap = {
  wdd131: Wdd131,
  wdd231: Wdd231,
  portfolio: Portfolio,

};

  return (
    <div className="projects-container">
      {/* HEADER */}
      <header className="projects-header">
        <h1>C:\\ PROJECT_ARCHIVE</h1>

        <div className="projects-info">
          <span>&gt; ACCESS LEVEL: AUTHORIZED</span>
          <span>&gt; RECORDS FOUND: {projects.length}</span>
          <span>&gt; DATABASE STATUS: ONLINE</span>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <section className="projects-grid">
        {/* LISTA IZQUIERDA */}
        <div className="projects-sidebar">
          <div className="archive-mascot">

  <IconPipboy
    src={ACPImage}
    alt="Vault Archive"
  />

</div>
          <p className="projects-instruction">&gt; SELECT PROJECT</p>

           <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-row ${selected === index ? "active" : ""}`}
              onClick={() => setSelected(index)}
            >
              <span>&gt; [{String(index + 1).padStart(3, "0")}]</span>

              <span>{project.name.toUpperCase()}</span>
            </div>
          ))}
          </div>
        </div>

        {/* DOSSIER */}
        <div className="project-dossier">
          {/* IDENTIFICATION */}
          <div className="project-dossier">

  <div className="project-paper">

    {/* COLUMNA IZQUIERDA */}
    <div className="project-content">

      {/* IDENTIFICATION */}
      <div className="project-section">
     
    <span className="vault-tec-tag">VAULT-TEC ARCHIVE</span>

        <p className="section-title">
          PROJECT IDENTIFICATION
        </p>

        <h2>
          &gt;{" "}
          <Typewriter
            key={current.id}
            text={current.name}
          />
          <span className="cursor">_</span>
        </h2>

        <p>&gt; STATUS: {current.status}</p>
        <p>&gt; YEAR: {current.year}</p>
        <p>&gt; TYPE: {current.category}</p>

      </div>

      {/* DESCRIPTION */}
      <div className="project-section">

        <p className="section-title">
          DESCRIPTION
        </p>

        <p className="project-description">
          {current.description}
        </p>

      </div>

      {/* TECHNOLOGY STACK */}
      <div className="project-section">

        <p className="section-title">
          TECHNOLOGY STACK
        </p>

        <div className="tech-list">

          {current.technologies.map((tech) => (

            <span
              key={tech}
              className="tech-tag"
            >
              {tech}
            </span>

          ))}

        </div>

      </div>

      {/* EXTERNAL ACCESS */}
      <div className="project-section">

        <p className="section-title">
          EXTERNAL ACCESS
        </p>

        <div className="project-links">

          <a
            href={current.links.demo}
            target="_blank"
            rel="noreferrer"
          >
            [F1] EXECUTE PROJECT
          </a>

          <a
            href={current.links.github}
            target="_blank"
            rel="noreferrer"
          >
            [F2] SOURCE CODE
          </a>

        </div>

      </div>

    </div>

    {/* COLUMNA DERECHA */}
    <div className="project-preview">

      <p className="section-title">
        PROJECT PREVIEW
      </p>
      <div className="preview-logo">

       <IconPipboy
      src={VaultTecLogo}
      alt="Vault Tec"
    />
    

  </div>
<span>VAULT-TEC VISUAL INTERFACE {current.status}</span>
      <div className="preview-frame">
        

  <span className={`stamp ${current.status.toLowerCase()}`}>
    {current.status}
  </span>

  <img
    src={imageMap[current.image]}
    alt={current.name}
  />

</div>
<div className="preview-meta">
   <span>
    STATUS: {current.status}
  </span>

  <span>
    VISUAL RECORD: AVAILABLE
  </span>

  <span>
    LAST UPDATE: {current.year}
  </span>
</div>

    </div>

  </div>

</div>

        </div>
      </section>
    </div>
  );
}
