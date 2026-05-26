import "./Navbar.css";
import DebugIcon from "../../assets/icons/bug.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import NotepadIcon from "../../assets/icons/note.svg?react";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <NavbarItem path="" icon={<DebugIcon aria-label="Debugger page icon" />} />
      <NavbarItem path="notepad" icon={<NotepadIcon aria-label="Notepad page icon" />} />
      <NavbarItem path="settings" icon={<SettingsIcon aria-label="Settings page icon" />} />
    </div>
  );
};

export default Navbar;
