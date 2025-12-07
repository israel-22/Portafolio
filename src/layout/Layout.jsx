import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container"> 
    <div className="crt-screen">
      <Navbar />

      <main className="terminal-content">
        {children}
      </main>

    
       
    </div>
    <Footer />
    </div>
    
    
    
      
   
  );
  
  
}
