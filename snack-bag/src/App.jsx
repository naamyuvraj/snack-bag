import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage.jsx";
import Cart from "./components/pages/cart.jsx";
import Snacks from "./components/pages/snacks.jsx"; 
import OrderHistory from "./components/pages/OrderHistory.jsx";
import Chocolates from "./components/pages/chocolates.jsx";
import Drinks from "./components/pages/drinks.jsx";
import Namkeens from "./components/pages/namkeens.jsx"; 
import Biscuits from "./components/pages/biscuits.jsx";
import Noodles from "./components/pages/noodles.jsx";
import User from "./components/pages/profile.jsx";
import Login from "./components/login";

function App() {
  return ( 
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/snacks" element={<Snacks />} />
      <Route path="/chocolates" element={<Chocolates />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/namkeens" element={<Namkeens />} />
      <Route path="/biscuits" element={<Biscuits />} />
      <Route path="/noodles" element={<Noodles />} />
      <Route path="/profile" element={<User />} />

    </Routes>
  );
}

export default App;
