import "./DivergenceVisualizer.css";
import { useDivergence } from "../../contexts/DivergenceContext";
import type {
  Divergence,
  FlowDivergence,
  StateDivergence,
} from "../../models/divergence";
import { useStacks } from "../../contexts/StacksContext";

const DivergenceVisualizer = () => {
  const {
    divergences,
    selectedDivergence,
    setSelectedDivergence,
    isFlowDivergence,
  } = useDivergence();

  const { setOriginalPosition, setModifiedPosition, updateTablesPositions } =
    useStacks();

  /**
   * Select the specified divergence and sets the original and modified positions according to the divergence.
   * @param d The specified divergence to select.
   */
  const selectDivergence = (d: Divergence) => {
    setSelectedDivergence(d);
    if (isFlowDivergence(d)) {
      setOriginalPosition((d as FlowDivergence).originalPosition.start);
      setModifiedPosition((d as FlowDivergence).modifiedPosition.start);
    } else {
      updateTablesPositions((d as StateDivergence).position);
    }
  };

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
                selectDivergence(divergence);
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
