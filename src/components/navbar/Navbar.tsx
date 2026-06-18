import "./Navbar.css";
import DebugIcon from "../../assets/icons/bug.svg?react";
import QueryIcon from "../../assets/icons/query.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import NotepadIcon from "../../assets/icons/note.svg?react";
import ExitIcon from "../../assets/icons/logout.svg?react";
import TreeIcon from "../../assets/icons/graph.svg?react";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <NavbarItem
        path=""
        icon={<DebugIcon aria-label="Debugger page icon" />}
      />
      <NavbarItem
        path="query"
        icon={<QueryIcon aria-label="Query page icon" />}
      />
      <NavbarItem path="tree" icon={<TreeIcon aria-label="Tree page icon" />} />
      <NavbarItem
        path="notepad"
        icon={<NotepadIcon aria-label="Notepad page icon" />}
      />
      <NavbarItem
        path="settings"
        icon={<SettingsIcon aria-label="Settings page icon" />}
      />
      <NavbarItem path="exit" icon={<ExitIcon aria-label="Exit page icon" />} />
    </div>
  );
};

export default Navbar;
