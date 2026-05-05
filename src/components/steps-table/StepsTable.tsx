import type { ExecutionStep } from "../../model/stack";
import "./StepsTable.css";

interface StepsTableProps {
  steps: ExecutionStep[];
  selectedPosition: number;
  updateTablesPositions: (newPosition: number) => void;
}

const StepsTable: React.FC<StepsTableProps> = ({
  steps,
  selectedPosition,
  updateTablesPositions,
}) => {
  return (
    <div className="steps-table container">
      {steps.length > 0 &&
        steps.map((step) => (
          <div
            key={`step-${step.id}`}
            className="steps-table-item-wrapper"
            onClick={() => {
              updateTablesPositions(step.position);
            }}
          >
            <div
              className={
                "steps-table-item" +
                (step.position == selectedPosition ? " selected" : "")
              }
            >
              {step.displayName}
            </div>
          </div>
        ))}
    </div>
  );
};

export default StepsTable;
