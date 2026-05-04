import type { ExecutionStep } from "../../model/stack";
import "./StepsTable.css";

interface StepsTableProps {
  steps: ExecutionStep[];
  selectedPosition: number;
  updateTablesPosition: (newPosition: number) => void;
}

const StepsTable: React.FC<StepsTableProps> = ({
  steps,
  selectedPosition,
  updateTablesPosition,
}) => {
  return (
    <div className="steps-table">
      {steps.length > 0 &&
        steps.map((step) => (
          <div
            key={`step-${step.id}`}
            className={step.position == selectedPosition ? "selected" : ""}
            onClick={() => {
              updateTablesPosition(step.position);
            }}
          >
            {step.displayName}
          </div>
        ))}
    </div>
  );
};

export default StepsTable;
