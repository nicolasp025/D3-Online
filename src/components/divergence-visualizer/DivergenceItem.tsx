import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import type { D3Divergence, D3FlowDivergence, D3StateDivergence } from "../../models/divergence";
import expand_arrow from "../../assets/icons/arrow_drop_down.svg";
import { forwardRef, useState } from "react";

interface DivergenceItemProps {
  divergence: D3Divergence;
}

const DivergenceItem = forwardRef<HTMLDivElement, DivergenceItemProps>(({ divergence }, ref) => {
  const { selectedDivergence, setSelectedDivergence, isFlowDivergence } = useDivergence();
  const { setOriginalPosition, setModifiedPosition } = useStacks();

  const isExpandable = !isFlowDivergence(divergence);
  const [isExpanded, setExpanded] = useState(false);

  /**
   * Select the specified divergence and sets the original and modified positions according to the divergence.
   * @param d The specified divergence to select.
   */
  const selectDivergenceInTables = (d: D3Divergence) => {
    setSelectedDivergence(d);
    if (isFlowDivergence(d)) {
      setOriginalPosition((d as D3FlowDivergence).originalPosition.start);
      setModifiedPosition((d as D3FlowDivergence).modifiedPosition.start);
    } else {
      setOriginalPosition((d as D3StateDivergence).originalPosition);
      setModifiedPosition((d as D3StateDivergence).modifiedPosition);
    }
  };

  return (
    <div
      ref={ref}
      className={`divergence-wrapper`}
      onClick={() => {
        selectDivergenceInTables(divergence);
      }}
    >
      <div
        className={`divergence-item${selectedDivergence == divergence ? " selected" : ""}${isExpandable ? " expandable" : ""}`}
        onClick={() => setExpanded(!isExpanded)}
      >
        <div
          className={`divergence-prefix ${isFlowDivergence(divergence) ? "flow" : "state"}`}
          title={isFlowDivergence(divergence) ? "Flow divergence" : "State divergence"}
        />
        {isExpandable && <img src={expand_arrow} alt="Expand state divergence arrow" />}
        {divergence.displayName}
      </div>
      {isExpandable && selectedDivergence == divergence && (
        <div className="divergence-context">{(divergence as D3StateDivergence).context}</div>
      )}
    </div>
  );
});

export default DivergenceItem;
