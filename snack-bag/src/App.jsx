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
import Login from "./components/pages/login.jsx";
import Cancellation from "./components/policypages/cancellation.jsx";
import PrivacyPolicy from "./components/policypages/PrivacyPolicy.jsx";
import TermsAndCond from "./components/policypages/t&c.jsx";
import AboutUs from "./components/policypages/AboutUs.jsx";
import ContactUs from "./components/policypages/ContactUs.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/snacks" element={<Snacks />} />
      <Route path="/chocolates" element={<Chocolates />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/namkeens" element={<Namkeens />} />
      <Route path="/biscuits" element={<Biscuits />} />
      <Route path="/noodles" element={<Noodles />} />
      <Route path="/profile" element={<User />} />
      <Route path="/cancellation" element={<Cancellation />} />
      <Route path="/policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndCond />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
