import "./SettingsLayout.css";
import Toggle from "../../components/toggle/Toggle";
import { useSettings } from "../../contexts/SettingsContext";

const SettingsLayout = () => {
  const { darkMode, setDarkMode } = useSettings();

  return (
    <div className="settings-wrapper">
      <div className="settings container">
        <h1>Settings</h1>
        <div className="settings-element">
          Dark mode
          <Toggle value={darkMode} onChange={setDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
