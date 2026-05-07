import { useState } from "react";
import { fakeDivergences } from "../../fakedata";
import "./DivergenceVisualizer.css";
import {
  type FlowDivergence,
  type StateDivergence,
} from "../../model/divergence";

const DivergenceVisualizer = () => {
  const [selectedDivergence, setSelectedDivergence] = useState<
    FlowDivergence | StateDivergence | null
  >(null);
  const [divergences, setDivergences] = useState(fakeDivergences);

  return (
    <div className="divergence-table-container container">
      <div className="divergence-header">
        <span>Divergence</span>
      </div>
      <div className="divergence-table">
        {divergences.length > 0 &&
          divergences.map((divergence) => (
            <div
              className={"divergence-wrapper"}
              key={`divergence-${divergence.id}`}
              onClick={() => {
                setSelectedDivergence(divergence);
              }}
            >
              <div
                className={`divergence-item ${selectedDivergence == divergence ? " selected" : ""}`}
              >
                {divergence.description}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DivergenceVisualizer;
