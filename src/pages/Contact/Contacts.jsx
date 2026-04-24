import React, { useState } from "react";
import "./contacts.css";
import Typewriter from "../../components/typewriter/Typewriter.jsx";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import contactsData from "../../data/contacts.json";

/* ICONOS (puedes reemplazar luego) */
import VaultBoy from "../../assets/icons/FO76_character.webp";
import SignalIcon from "../../assets/icons/FO4_Vault-Tec_logo.webp";


function Contact() {
  const [selected, setSelected] = useState(0);

  const imageMap = {
  vaultboy: VaultBoy,
  signal: SignalIcon
};
  

 const contacts = contactsData;

  const current = contacts[selected];

 return (
  <div className="contact-container">
    <div className="contact-frame">

      {/* HEADER */}
      <header className="contact-header">
        <h1>C:\\ CONTACT_DOSSIER</h1>

        <div className="contact-header-info">
          <span>&gt; ACCESS LEVEL: AUTHORIZED</span>
          <span>&gt; RECORDS FOUND: {contacts.length}</span>
          <span className="signal">
            &gt; SIGNAL: <span className="signal-bar">████░</span>
          </span>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <section className="contact-grid">

        {/* IZQUIERDA */}
        <div className="contact-list">
          <p className="contact-instruction">
            &gt; SELECT DOSSIER
          </p>

          {contacts.map((c, index) => (
            <div
              key={c.id}
              className={`contact-row ${selected === index ? "active" : ""}`}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
            >
              <span>&gt; [{String(index + 1).padStart(3, "0")}]</span>
              <span>{c.name.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* DERECHA */}
        <div className="contact-dossier">

          {/* META */}
          <div className="dossier-meta">
            <span>&gt; FILE ID: {current.id}</span>
            <span>&gt; STATUS: VERIFIED</span>
            <span>&gt; LAST UPDATE: 2026.04</span>
          </div>

          {/* CONTENIDO */}
          <div className="dossier-content">

            {/* TEXTO */}
            <div className="dossier-text">
              <h2>
                &gt;{" "}
                <Typewriter key={current.id} text={current.name} />
                <span className="cursor">_</span>
              </h2>

              <p>&gt; ROLE: {current.role}</p>
              <p>&gt; ACADEMIC: {current.academic}</p>
              <p>&gt; INSTITUTION: {current.institution}</p>
              <p>&gt; RELATION: {current.relation}</p>

              <div className="dossier-log">
                <p>&gt; LOG ENTRY:</p>
                <p className="log-text">
                  <Typewriter
                    key={current.id + "-log"}
                    text={current.testimony}
                    speed={20}
                  />
                </p>
              </div>

              <div className="dossier-comm">
                <p>&gt; COMM CHANNELS:</p>
                <div className="comm-buttons">
                  <a href={`mailto:${current.email}`}>EMAIL</a>
                  <a
                    href={`https://wa.me/${current.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WHATSAPP
                  </a>
                </div>
              </div>
            </div>

            {/* IMAGEN (SOLO UNA, CORRECTA) */}
            <div className="dossier-image">
              <IconPipboy src={imageMap[current.image]} alt="contact" />
              
            </div>

          </div>
        </div>

      </section>
    </div>
  </div>
);
}

export default Contact;