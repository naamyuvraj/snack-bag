import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Cart from "./cart";
import Snacks from "./snacks";

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
