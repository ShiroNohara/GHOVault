import Navbar from "./components/Navbar";
import Stake from "./components/Stake";
import Borrow from "./components/Borrow";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Vault from "./components/Vault";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Vault />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/borrow" element={<Borrow />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
