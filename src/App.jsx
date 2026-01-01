import { useState } from "react";
import BootScreen from "./components/BootScreen/BootScreen";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import PDA from "./components/PDA/PDA";

function App() {
  const [bootDone, setBootDone] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    
    <>
      {!bootDone ? (
        <BootScreen onFinish={() => setBootDone(true)} />
      ) : (
        <Layout onOpenPDA={() => setOpen(true)}>
          <Home />
        </Layout>
      )}
      {open && (
        <PDA isOpen={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default App;
