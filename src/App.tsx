import { Routes, Route } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import './App.css';
import Details from "./components/Details/Details";
import Home from './components/Home/Home';



function App() {
  return (
    <div className="flex justify-center">
      <div className="w-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
