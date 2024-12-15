import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Gift from "./Components/Gift";
import Order from "./Components/Orders/Order";
import Store from "./Components/Store";
import StarbucksRewards from "./Components/StarbucksRewards";
import PromotionsBannerDetail from "./Components/PromotionsBannerDetail";
import ProfileUser from "./Components/ProfileUser";
import CreateAccount from "./Components/Account/CreateAccount";
import Verification from "./Components/Account/Verification";
import PersonalDetails from "./Components/Account/PersonalDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/giftCards"
          element={<Gift />} />
        <Route
          path="/ordering"
          element={<Order />} />
        <Route
          path="/store-locator"
          element={<Store />} />
        <Route
          path="/registration"
          element={<CreateAccount />} />
        <Route
          path="/registration/verification"
          element={<Verification />} />
        <Route
          path="/registration/personaldetails"
          element={<PersonalDetails />} />
        <Route
          path="/rewards"
          element={<StarbucksRewards />} />
        <Route
          path="/banner-detail"
          element={<PromotionsBannerDetail />} />
        <Route
          path="/profile"
          element={<ProfileUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
