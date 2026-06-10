import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import "./GlobalLayout.css";
import ScrollRestorer from "../../components/scroll-restorer/ScrollRestorer";

const GlobalLayout = () => {
  return (
    <div id="global-layout">
      <Navbar />
      <div id="page-content">
        <ScrollRestorer />
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
