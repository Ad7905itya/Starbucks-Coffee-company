import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Welcome from "./Components/Account/Welcome";
const Navbar = React.lazy(() => import('./Components/Navbar/Navbar'));
const Home = React.lazy(() => import('./Components/Home'));
const Gift = React.lazy(() => import('./Components/GiftComponents/Gift'));
const Order = React.lazy(() => import('./Components/Orders/Order'));
const Store = React.lazy(() => import('./Components/Store'));
const StarbucksRewards = React.lazy(() => import('./Components/StarbucksRewards'));
const PromotionsBannerDetail = React.lazy(() => import('./Components/PromotionsBannerDetail'));
const ProfileUser = React.lazy(() => import('./Components/Profile/ProfileUser'));
const CreateAccount = React.lazy(() => import('./Components/Account/CreateAccount'));
const Verification = React.lazy(() => import('./Components/Account/Verification'));
const PersonalDetails = React.lazy(() => import('./Components/Account/PersonalDetails'));
const PaySection = React.lazy(() => import('./Components/paySection/PaySection'));

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  const isWelcomePage = location.pathname === "/welcome";

  return (
    <>
      {!isWelcomePage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giftCards" element={<Gift />} />
        <Route path="/ordering" element={<Order />} />
        <Route path="/store-locator" element={<Store />} />
        <Route path="/ordering" element={<Order />} />
        <Route path="/pay" element={<PaySection />} />
        <Route path="/registration">
          <Route element={<CreateAccount />} index />
          <Route path="verification" element={<Verification />} />
          <Route path="personalDetails" element={<PersonalDetails />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/rewards" element={<StarbucksRewards />} />
        <Route path="/banner-detail" element={<PromotionsBannerDetail />} />
        <Route path="/profile" element={<ProfileUser />} />
      </Routes>
    </>
  );
}

export default App;
