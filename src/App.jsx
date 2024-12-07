import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Gift from "./Components/Gift";
import Order from "./Components/Order";
import Pay from "./Components/Pay";
import Store from "./Components/Store";
import StarbucksRewards from "./Components/StarbucksRewards";
import PromotionsBannerDetail from "./Components/PromotionsBannerDetail";
import ProfileUser from "./Components/ProfileUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giftCards" element={<Gift />} />
        <Route path="/ordering" element={<Order />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/store-locator" element={<Store />} />
        <Route path="/rewards" element={<StarbucksRewards />} />
        <Route path="/banner-detail" element={<PromotionsBannerDetail />} />
        <Route path="/profile" element={<ProfileUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
