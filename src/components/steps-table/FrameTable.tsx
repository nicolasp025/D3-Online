import { useEffect, useRef } from "react";
import type { ExecutionStep } from "../../models/stack";
import "./FrameTable.css";
import type {
  DivergencePosition,
  FlowDivergence,
} from "../../models/divergence";
import FrameTableItem from "./FrameTableItem";

interface FrameTableProps {
  steps: ExecutionStep[];
  selectedPosition: number;
  getFlowDivergencePosition: (divergence: FlowDivergence) => DivergencePosition;
  prefixColor: string;
}

const FrameTable: React.FC<FrameTableProps> = ({
  steps,
  selectedPosition,
  getFlowDivergencePosition,
  prefixColor,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [selectedPosition]);

  return (
    <div className="frame-table container">
      {steps.length > 0 &&
        steps.map((step: ExecutionStep) => (
          <FrameTableItem
            ref={selectedPosition == step.position ? selectedRef : null}
            step={step}
            prefixColor={prefixColor}
            getFlowDivergencePosition={getFlowDivergencePosition}
            selected={step.position == selectedPosition}
          />
        ))}
    </div>
  );
};

export default FrameTable;
