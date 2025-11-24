import "./App.css";
import "./crt.css";
import Navbar from "./components/navbar/Navbar.jsx";
import { useState } from "react";
import BootScreen from "./components/BootScreen/BootScreen.jsx";

function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      {!bootDone && (
        <BootScreen onFinish={() => setBootDone(true)} />
      )}

      {bootDone && (
        <>
          <Navbar />
          {/* Aquí agregarás tus páginas */}
        </>
      )}
    </>
  );
}

export default App;
