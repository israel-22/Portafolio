import React, { useState } from "react";
import "./contacts.css";
import Typewriter from "../../components/typewriter/Typewriter.jsx";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import contactsData from "../../data/contacts.json";


import VaultBoy from "../../assets/icons/FO76_character.webp";
import SignalIcon from "../../assets/icons/FO4_Vault-Tec_logo.webp";
import Wester from "../../assets/icons/Icon_Minutemen_quest.webp";
import Fallout from "../../assets/icons/Fallout3e_transparent.webp";
import Mbox from "../../assets/icons/Mbox_default.webp";
import Lucy from "../../assets/icons/FO76_Quest_MoM.webp";


function Contact() {
  const [selected, setSelected] = useState(0);

  const imageMap = {
  vaultboy: VaultBoy,
  signal: SignalIcon,
  wester: Wester,
  fallout: Fallout,
  mbox: Mbox,
  lucy: Lucy
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

  {/* 📄 DOCUMENTO */}
  <div className="dossier-paper">

    {/* HEADER TIPO AGENCIA */}
    <div className="paper-header">
      <span>VAULT-TEC SYSTEM</span>
      <span>DOSSIER FILE</span>
      <span>{current.id}</span>
    </div>

    {/* BODY */}
    <div className="paper-body">

      {/* SECCIÓN 1 */}
      <div className="paper-section">
        <p className="section-title">IDENTIFICATION</p>
        <h2>
          &gt; <Typewriter key={current.id} text={current.name} />
          <span className="cursor">_</span>
        </h2>
      </div>

      {/* SECCIÓN 2 */}
      <div className="paper-section">
        <p className="section-title">PROFESSIONAL DATA</p>
        <p>&gt; ROLE: {current.role}</p>
        <p>&gt; ACADEMIC: {current.academic}</p>
        <p>&gt; INSTITUTION: {current.institution}</p>
        <p>&gt; RELATION: {current.relation}</p>
      </div>

      {/* SECCIÓN 3 */}
      <div className="paper-section">
        <p className="section-title">LOG ENTRY</p>
        <p className="log-text">
          <Typewriter
            key={current.id + "-log"}
            text={current.testimony}
            speed={20}
          />
        </p>
      </div>

      {/* SECCIÓN 4 */}
      <div className="paper-section">
        <p className="section-title">COMMUNICATION</p>
        <div className="comm-buttons">
          <a href={`mailto:${current.email}`}>[F6] EMAIL</a>
          <a
            href={`https://wa.me/${current.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            [F7] WHATSAPP
          </a>
        </div>
      </div>

    </div>

    {/* IMAGEN LATERAL */}
    <div className="paper-image">
  <div className="photo-frame">
    <span className={`stamp ${current.status}`}>
  {current.status.toUpperCase()}
</span>
    <IconPipboy src={imageMap[current.image]} alt="contact" />
  </div>

  <span className="photo-label">{current.id}</span>
</div>

    {/* FOOTER */}
    <div className="paper-footer">
      <span>STATUS: VERIFIED</span>
      <span>ACCESS: LEVEL 2</span>
      <span>UPDATED: 2026.04</span>
    </div>

  </div>
</div>

      </section>
    </div>
  </div>
);
}

export default Contact;