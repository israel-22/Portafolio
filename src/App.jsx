import "./App.css";
import { useState } from "react";
import BootScreen from "./components/BootScreen/BootScreen";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      {!bootDone ? (
        <BootScreen onFinish={() => setBootDone(true)} />
      ) : (
        <Layout>
          <Home />
        </Layout>
      )}
    </>
  );
}

export default App;
