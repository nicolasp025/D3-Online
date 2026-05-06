import { useEffect, useRef } from "react";
import type { ExecutionStep } from "../../model/stack";
import "./FrameTable.css";

interface FrameTableProps {
  steps: ExecutionStep[];
  selectedPosition: number;
  updateTablesPositions: (newPosition: number) => void;
}

const FrameTable: React.FC<FrameTableProps> = ({
  steps,
  selectedPosition,
  updateTablesPositions,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedPosition]);

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
