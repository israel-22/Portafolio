import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.jsx";
import "./layout.css";
import "./typography/leters-crt.css";


export default function Layout({ children, onOpenPDA }) {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="terminal-content">
        <div className="content-area">
          <div className="crt-wrapper">
            <div className="crt-screen">{children}  
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenPDA={onOpenPDA} />
    </div>
  );
}
