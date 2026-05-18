import type { ExecutionStack } from "../../models/stack";
import FrameTable from "../steps-table/FrameTable";
import "./StackVisualizer.css";
import { DiffEditor } from "@monaco-editor/react";
import {
  defineMonacoTheme,
  EDITOR_THEME_NAME,
  MONACO_OPTIONS,
} from "../../config/monaco";
import arrow_back from "../../assets/icons/arrow_back.svg";
import arrow_forward from "../../assets/icons/arrow_forward.svg";
import restart from "../../assets/icons/restart.svg";
import arrows_sync from "../../assets/icons/arrows_sync.svg";
import type { FlowDivergence } from "../../models/divergence";
import { useStacks } from "../../contexts/StacksContext";

interface StackVisualizerProps {
  originalStack: ExecutionStack;
  modifiedStack: ExecutionStack;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({
  originalStack,
  modifiedStack,
}) => {
  const {
    originalPosition,
    modifiedPosition,
    updateTablesPositions,
    increaseOriginalPosition,
    increaseModifiedPosition,
    handleFrameMoving,
  } = useStacks();

  return (
    <>
      <div
        className="stack-actions container"
        tabIndex={0}
        onKeyDown={handleFrameMoving}
      >
        <button onClick={increaseOriginalPosition}>
          <img src={arrow_back} alt="Step left icon" />
          Step left
        </button>
        <button
          onClick={() => {
            increaseOriginalPosition();
            increaseModifiedPosition();
          }}
        >
          <img src={arrows_sync} alt="Step synchronized icon" />
          Step sync
        </button>
        <button onClick={increaseModifiedPosition}>
          <img src={arrow_forward} alt="Step right icon" />
          Step right
        </button>
        <button
          onClick={() => {
            updateTablesPositions(0);
          }}
        >
          <img src={restart} alt="Restart icon" />
          Restart
        </button>
      </div>

      <div
        className="stack-table container"
        tabIndex={0}
        onKeyDown={handleFrameMoving}
      >
        <div className="stack-header">
          <div>
            <span>Position</span>
            <span>Frame</span>
          </div>
          <div>
            <span>Position</span>
            <span>Frame</span>
          </div>
        </div>
        <div className="frame-tables">
          <FrameTable
            steps={originalStack.steps}
            selectedPosition={originalPosition}
            getFlowDivergencePosition={(d: FlowDivergence) =>
              d.originalPosition
            }
            prefixColor="var(--color-deletion)"
          />
          <FrameTable
            steps={modifiedStack.steps}
            selectedPosition={modifiedPosition}
            getFlowDivergencePosition={(d: FlowDivergence) =>
              d.modifiedPosition
            }
            prefixColor="var(--color-addition)"
          />
        </div>
      </div>

      <div className="stack-editor container">
        <DiffEditor
          height="100%"
          theme={EDITOR_THEME_NAME}
          language="typescript"
          options={MONACO_OPTIONS}
          beforeMount={defineMonacoTheme}
          original={originalStack.steps[originalPosition]?.content ?? ""}
          modified={modifiedStack.steps[modifiedPosition]?.content ?? ""}
        />
      </div>
    </>
  );
};

export default StackVisualizer;
