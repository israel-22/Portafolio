import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./layout.css";

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
