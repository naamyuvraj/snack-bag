import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Snacks from "./components/pages/snacks.jsx"; 
import Cart from "./components/Cart.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/snacks" element={<Snacks />} />
      <Route path="/history" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
