import { useState } from "react";
import "./ExpStartLayout.css";
import { useExperimentContext } from "../../contexts/ExperimentContext";
import BackArrow from "../../assets/icons/arrow_back.svg?react";
import DebugIcon from "../../assets/icons/bug.svg?react";

const ExpStartLayout = () => {
  const [url1Input, setUrl1Input] = useState<string>("");
  const [url2Input, setUrl2Input] = useState<string>("");
  const [userIDInput, setUserIDInput] = useState<string>("");

  const { setUrl1, setUrl2, setUserID, clearAll } = useExperimentContext();

  const handleStartDebug = () => {
    setUrl1(url1Input);
    setUrl2(url2Input);
    setUserID(userIDInput);
  };

  return (
    <div className="exp-start-wrapper">
      <div className="exp-start container">

        <form onSubmit={handleStartDebug}>
          <label>Please insert the required informations to continue : </label>
          <input value={url1Input} onChange={(e) => setUrl1Input(e.target.value)} placeholder="First URL" />
          <input value={url2Input} onChange={(e) => setUrl2Input(e.target.value)} placeholder="Second URL" />
          <input value={userIDInput} onChange={(e) => setUserIDInput(e.target.value)} placeholder="Your user ID" />
          <div className="exp-start-actions">
            <button type="button" className="exp-btn-back outlined" onClick={clearAll}>
              <BackArrow />
              Back
            </button>
            <button type="submit" className="exp-btn-start" onClick={handleStartDebug}>
              <DebugIcon />
              Debug
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpStartLayout;
