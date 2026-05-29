import { useState } from "react";
import "./SettingsLayout.css";
import Toggle from "../../components/toggle/Toggle";

const SettingsLayout = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    return (
        <div className="settings-wrapper">
            <div className="settings container">
                <h1>Settings</h1>
                <div className="settings-element">
                    Dark mode
                    <Toggle value={isDarkMode} onChange={setIsDarkMode} />
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
