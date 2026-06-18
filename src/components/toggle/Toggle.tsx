import "./Toggle.css";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Toggle = ({ value, onChange }: ToggleProps) => {
  return (
    <label className="toggle-wrapper">
      <div
        className={`toggle ${value ? "active" : ""}`}
        onClick={() => onChange(!value)}
      >
        <div className="toggle-thumb" />
      </div>
    </label>
  );
};

export default Toggle;
