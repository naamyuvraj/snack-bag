import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Cart from "./components/cart";
import Snacks from "./components/cateogries/snacks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/snacks" element={<Snacks />} />
    </Routes>
  );
}

export default App;
