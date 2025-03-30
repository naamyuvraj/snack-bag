import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Cart from "./cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
