import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import "./GlobalLayout.css";

const GlobalLayout = () => {
  return (
    <div id="global-layout">
      <Navbar />
      <div id="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
