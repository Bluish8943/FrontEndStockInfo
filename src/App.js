import { Routes, Route } from "react-router-dom";
import Prices from "./pages/Prices";
import About from "./pages/About";
import './App.css';
import './btn.css'
import './textbox.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Prices />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
