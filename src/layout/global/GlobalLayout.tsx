import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import "./GlobalLayout.css";
import ScrollRestorer from "../../components/scroll-restorer/ScrollRestorer";
import ScrollTopButton from "../../components/scroll-top-button/ScrollTopButton";

const GlobalLayout = () => {
  return (
    <div id="global-layout">
      <Navbar />
      <ScrollTopButton className="page-content">
        <ScrollRestorer />
        <Outlet />
      </ScrollTopButton>
    </div>
  );
};

export default GlobalLayout;
