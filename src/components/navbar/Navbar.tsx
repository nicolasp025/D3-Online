import "./Navbar.css";
import DebugIcon from "../../assets/icons/bug.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navbar-wrapper">
      <div
        className={`navbar-item${isActive("/") ? " active" : ""}`}
        onClick={() => {
          navigate("");
        }}
      >
        <DebugIcon aria-label="Debugger page icon" />
      </div>
      <div
        className={`navbar-item${isActive("/settings") ? " active" : ""}`}
        onClick={() => {
          navigate("settings");
        }}
      >
        <SettingsIcon aria-label="Settings page icon" />
      </div>
    </div>
  );
};

export default Navbar;
