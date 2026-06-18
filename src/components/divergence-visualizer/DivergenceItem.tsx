import type { D3Divergence, D3StateDivergence } from "../../models/divergence";
import ExpandArrowIcon from "../../assets/icons/arrow_drop_down.svg?react";
import { forwardRef, useState } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";

interface DivergenceItemProps {
  divergence: D3Divergence;
}

const DivergenceItem = forwardRef<HTMLDivElement, DivergenceItemProps>(
  ({ divergence }, ref) => {
    const isStateDivergence = "context" in divergence;
    const [isExpanded, setExpanded] = useState(false);

    const { selectedDivergence, setSelectedDivergence } = useDivergence();
    const isSelected = divergence == selectedDivergence;

    return (
      <div
        ref={ref}
        className={`divergence-wrapper`}
        onClick={() => {
          setSelectedDivergence(isSelected ? null : divergence);
        }}
      >
        <div
          className={`divergence-item${isSelected ? " selected" : ""}${isStateDivergence ? " expandable" : ""}`}
          onClick={() => setExpanded(!isExpanded)}
        >
          <div
            className={`divergence-prefix ${isStateDivergence ? "state" : "flow"}`}
          />
          {isStateDivergence && (
            <ExpandArrowIcon aria-label="Expand state divergence arrow" />
          )}
          {divergence.displayName}
        </div>
        {isStateDivergence && isSelected && (
          <div className="divergence-context">
            {(divergence as D3StateDivergence).context}
          </div>
        )}
      </div>
    );
  },
);

export default DivergenceItem;
