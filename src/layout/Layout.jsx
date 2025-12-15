import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./layout.css";



export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />

      <div className="crt-wrapper">
        <div className="crt-screen">
          <main className="terminal-content">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
