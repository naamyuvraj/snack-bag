import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Snacks from "./components/cateogries/snacks"; // Fixed typo in folder name
import Cart from "./components/Cart.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/snacks" element={<Snacks />} />
    </Routes>
  );
}

export default App;
