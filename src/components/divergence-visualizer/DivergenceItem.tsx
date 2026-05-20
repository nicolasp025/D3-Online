import { useDivergence } from "../../contexts/DivergenceContext";
import type { D3Divergence, D3StateDivergence } from "../../models/divergence";
import ExpandArrowIcon from "../../assets/icons/arrow_drop_down.svg?react";
import { forwardRef, useState } from "react";

interface DivergenceItemProps {
  divergence: D3Divergence;
}

const DivergenceItem = forwardRef<HTMLDivElement, DivergenceItemProps>(({ divergence }, ref) => {
  const { selectedDivergence, setSelectedDivergence, isFlowDivergence } = useDivergence();

  const isExpandable = !isFlowDivergence(divergence);
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className={`divergence-wrapper`}
      onClick={() => {
        setSelectedDivergence(divergence);
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
        {isExpandable && <ExpandArrowIcon aria-label="Expand state divergence arrow" />}
        {divergence.displayName}
      </div>
      {isExpandable && selectedDivergence == divergence && (
        <div className="divergence-context">{(divergence as D3StateDivergence).context}</div>
      )}
    </div>
  );
});

export default DivergenceItem;
