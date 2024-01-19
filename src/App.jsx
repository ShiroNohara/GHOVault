import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GenerateBytes from "./components/GenerateBytes";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bytes" element={<GenerateBytes />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
