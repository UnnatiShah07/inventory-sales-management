import { Routes, Route } from "react-router-dom";
import { Inventory, Sales } from "../pages";
import { Home } from "../pages/home/Home";
import { Header } from "../components";

export const AppRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </div>
  );
};
