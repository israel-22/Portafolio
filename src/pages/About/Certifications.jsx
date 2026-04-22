import { useState } from "react";
import "./certifications.css";
import certificatesData from "../../data/certificates.json";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
/*import signalIcon from "../../assets/icons/FO4_Vault-Tec_logo.webp";*/
function Certifications() {
  const data = certificatesData.datas;
  

  const [selectedCert, setSelectedCert] = useState(
    data.length > 0 ? data[0] : null
  );
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  const filteredData =
    filter === "ALL"
      ? data
      : data.filter((c) => c.category === filter);

    
  return (
    <section className="cert-container">
      
      <h2>&gt; CERTIFICATIONS.LOG ({filteredData.length})</h2>
      <p className="filter-label">&gt; FILTER:</p>

      {/* FILTER */}
      <div className="cert-filter">
        {["ALL", "WEB", "MOBILE", "DATABASE", "OTHER"].map((f) => (
          <span
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => {
              setFilter(f);

              const newData =
                f === "ALL"
                  ? data
                  : data.filter((c) => c.category === f);

              setSelectedCert(newData[0] || null);
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* LISTA */}
      <div className="cert-list">
        {filteredData.map((cert) => (
          <div
            key={cert.id}
            className={`cert-row ${
              selectedCert?.id === cert.id ? "active" : ""
            }`}
            onClick={() => setSelectedCert(cert)}
           
          >
            &gt; {cert.year} | {cert.institution} - {cert.title}
          </div>
        ))}
      </div>

      {/* DETALLE */}
      {selectedCert && (
        <div className="cert-detail">
  <h3>&gt; CERTIFICATE DETAILS</h3>

  <div className="cert-content">
    
    {/* IZQUIERDA */}
    <div className="cert-text">
      <p><strong>Title:</strong> {selectedCert.title}</p>
      <p><strong>Institution:</strong> {selectedCert.institution}</p>
      <p><strong>Year:</strong> {selectedCert.year}</p>
      <p>{selectedCert.desc}</p>

      <p>
        <strong>Skills:</strong>{" "}
        {selectedCert.skills?.join(", ")}
      </p>

      <div className="cert-actions">
        <button onClick={() => setShowModal(true)}>
          VIEW CERTIFICATE
        </button>

       
      </div>
    </div>

    {/* DERECHA */}
    <div className="special-image-certification">
      <img src={selectedCert.image} alt={selectedCert.title} />
    </div>

  </div>
</div>
        
      )}

      {/* MODAL */}
      {/* MODAL */}
{showModal && selectedCert && (
  <div 
    className="cert-modal"
    onClick={() => setShowModal(false)} 
  >
    <div 
      className="cert-modal-content"
      onClick={(e) => e.stopPropagation()} 
    >

      <button 
        className="cert-close-btn"
        onClick={() => setShowModal(false)}
      >
        ✖
      </button>

      <img src={selectedCert.image} alt={selectedCert.title} />

    </div>
  </div>
)}

    </section>
  );
}

export default Certifications;