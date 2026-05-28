import { useNavigate } from "react-router";
import ArrowBack from "../../assets/icons/arrow_back.svg?react";
import Exit from "../../assets/icons/logout.svg?react";
import "./ExitLayout.css";
import { useExperimentContext } from "../../contexts/ExperimentContext";

const ExitLayout = () => {
  const navigate = useNavigate();
  const { clearAll } = useExperimentContext();

  /**
   * Handle the disconnection of the user, by clearing all the data and navigating to the start page.
   */
  const handleDisconnect = () => {
    navigate("/");
    clearAll();
  }

  return (
    <div className="exit-page-wrapper">
      <div className="exit-page container">
        <p>Do you want to leave ?</p>
        <p>The results will be saved and the experiment will be considered complete.</p>
        <div className="exit-actions">
          <button className="exit-btn-cancel" onClick={() => navigate("/")}>
            <ArrowBack /> Back to debug
          </button>
          <button className="exit-btn-confirm" onClick={handleDisconnect}>
            <Exit />
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitLayout;
