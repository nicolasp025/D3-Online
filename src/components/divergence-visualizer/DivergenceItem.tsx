import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import type {
  Divergence,
  FlowDivergence,
  StateDivergence,
} from "../../models/divergence";
import expand_arrow from "../../assets/icons/arrow_drop_down.svg";
import { useState } from "react";

interface DivergenceItemProps {
  divergence: Divergence;
}

const DivergenceItem: React.FC<DivergenceItemProps> = ({ divergence }) => {
  const { selectedDivergence, setSelectedDivergence, isFlowDivergence } =
    useDivergence();

  const { setOriginalPosition, setModifiedPosition, updateTablesPositions } =
    useStacks();

  const isExpandable = !isFlowDivergence(divergence);
  const [isExpanded, setExpanded] = useState(false);

  /**
   * Select the specified divergence and sets the original and modified positions according to the divergence.
   * @param d The specified divergence to select.
   */
  const selectDivergenceInTables = (d: Divergence) => {
    setSelectedDivergence(d);
    if (isFlowDivergence(d)) {
      setOriginalPosition((d as FlowDivergence).originalPosition.start);
      setModifiedPosition((d as FlowDivergence).modifiedPosition.start);
    } else {
      updateTablesPositions((d as StateDivergence).position);
    }
  };

  return (
    <div
      className={`divergence-wrapper`}
      onClick={() => {
        selectDivergenceInTables(divergence);
      }}
    >
      <div
        className={`divergence-item ${selectedDivergence == divergence ? " selected" : ""} ${isExpandable ? " expandable" : ""}`}
        onClick={() => setExpanded(!isExpanded)}
      >
        {isExpandable && (
          <img src={expand_arrow} alt="Expand state divergence arrow" />
        )}
        {divergence.description}
      </div>
      {isExpandable && isExpanded && (
        <div className="divergence-context">
          {(divergence as StateDivergence).context}
        </div>
      )}
    </div>
  );
};

export default DivergenceItem;
