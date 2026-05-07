import { useEffect, useRef } from "react";
import type { ExecutionStep } from "../../models/stack";
import "./FrameTable.css";
import { useDivergence } from "../../contexts/DivergenceContext";
import type {
  DivergencePosition,
  FlowDivergence,
  StateDivergence,
} from "../../models/divergence";

interface FrameTableProps {
  steps: ExecutionStep[];
  selectedPosition: number;
  updateTablesPositions: (newPosition: number) => void;
  getFlowDivergencePosition: (divergence: FlowDivergence) => DivergencePosition;
  prefixColor: string;
}

const FrameTable: React.FC<FrameTableProps> = ({
  steps,
  selectedPosition,
  updateTablesPositions,
  getFlowDivergencePosition,
  prefixColor,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);
  const { selectedDivergence, isFlowDivergence } = useDivergence();

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedPosition]);

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
      return position.start <= frame.position && position.end
        ? frame.position <= position.end
        : true;
    } else {
      return (selectedDivergence as StateDivergence).position == frame.position;
    }
  };

  return (
    <div className="frame-table container">
      {steps.length > 0 &&
        steps.map((step) => (
          <div
            key={`frame-${step.id}`}
            className="frame-table-item-wrapper"
            onClick={() => updateTablesPositions(step.position)}
          >
            <div
              className={hasDivergencePrefix(step) ? "frame-prefix" : ""}
              style={{
                backgroundColor: hasDivergencePrefix(step) ? prefixColor : "",
              }}
            ></div>
            <div
              ref={step.position === selectedPosition ? selectedRef : null}
              className={
                "frame-table-item" +
                (step.position === selectedPosition ? " selected" : "")
              }
            >
              <span>{step.position}</span>
              <span>{step.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FrameTable;
