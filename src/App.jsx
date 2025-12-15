import { useState } from "react";
import BootScreen from "./components/BootScreen/BootScreen";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/AboutMe";

function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      {!bootDone ? (
        <BootScreen onFinish={() => setBootDone(true)} />
      ) : (
        <Layout>
          <Home />
          <About />
        </Layout>
      )}
    </>
  );
}

export default App;
