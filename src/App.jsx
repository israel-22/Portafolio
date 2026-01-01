import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BootScreen from "./components/BootScreen/BootScreen";
import Layout from "./layout/Layout";
import PDA from "./components/PDA/PDA";

import Home from "./pages/Home/Home";
import About from "./pages/About/AboutMe";
import Projects from "./pages/Proyects/Proyects";
import Skins from "./pages/Skins/Skins";
import Contact from "./pages/Contact/Contacts";

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [open, setOpen] = useState(false);

  if (!bootDone) {
    return <BootScreen onFinish={() => setBootDone(true)} />;
  }

  return (
    <BrowserRouter>
      <Layout onOpenPDA={() => setOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skins" element={<Skins />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>

      {open && <PDA isOpen={open} onClose={() => setOpen(false)} />}
    </BrowserRouter>
  );
}

export default App;
