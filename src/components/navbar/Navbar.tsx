import "./Navbar.css";
import debug from "../../assets/icons/bug.svg";
import settings from "../../assets/icons/settings.svg";
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
        <img src={debug} alt="Debugger page." />
      </div>
      <div
        className={`navbar-item${isActive("/settings") ? " active" : ""}`}
        onClick={() => {
          navigate("settings");
        }}
      >
        <img src={settings} alt="Settings image." />
      </div>
    </div>
  );
};

export default Navbar;
