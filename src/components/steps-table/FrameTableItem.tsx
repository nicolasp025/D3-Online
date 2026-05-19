import { forwardRef } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import type {
  DivergencePosition,
  FlowDivergence,
  StateDivergence,
} from "../../models/divergence";
import type { ExecutionStep } from "../../models/stack";

interface FrameTableItemProps {
  step: ExecutionStep;
  prefixColor: string;
  getFlowDivergencePosition: (d: FlowDivergence) => DivergencePosition;
  selected: boolean;
}

const FrameTableItem = forwardRef<HTMLDivElement, FrameTableItemProps>(
  ({ step, prefixColor, getFlowDivergencePosition, selected }, ref) => {
    const { selectedDivergence, isFlowDivergence } = useDivergence();
    const { updateTablesPositions } = useStacks();

    /**
     * Return true if the specified frame should have a color indicator as divergence prefix:
     * - true if the selected divergence is a StateDivergence and its position is the same as the frame's position.
     * - true if the selected divergence is a FlowDivergence that contains the frame's position.
     * - false otherwise
     * @param frame The specified frame
     * @returns True if the frame should have a divergence prefix.
     */
    const hasDivergencePrefix = (frame: ExecutionStep) => {
      if (!selectedDivergence) {
        return false;
      }
      if (isFlowDivergence(selectedDivergence)) {
        const position = getFlowDivergencePosition(
          selectedDivergence as FlowDivergence,
        );

        return (
          position.start <= frame.position &&
          (position.end ? frame.position <= position.end : true)
        );
      } else {
        return (
          (selectedDivergence as StateDivergence).position == frame.position
        );
      }
    };

    const hasPrefix = hasDivergencePrefix(step);

    return (
      <div
        ref={ref}
        key={`frame-${step.id}`}
        className="frame-table-item-wrapper"
        onClick={() => updateTablesPositions(step.position)}
      >
        <div
          className={hasPrefix ? "frame-prefix" : ""}
          style={{ backgroundColor: hasPrefix ? prefixColor : "" }}
        />
        <div className={"frame-table-item" + (selected ? " selected" : "")}>
          <span>{step.position}</span>
          <span>{step.displayName}</span>
        </div>
      </div>
    );
  },
);

export default FrameTableItem;
