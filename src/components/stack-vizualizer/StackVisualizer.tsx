import type { ExecutionStack } from "../../models/stack";
import FrameTable from "../steps-table/FrameTable";
import "./StackVisualizer.css";
import { DiffEditor } from "@monaco-editor/react";
import {
  defineMonacoTheme,
  EDITOR_THEME_NAME,
} from "../../config/monaco-theme";
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
    decreaseOriginalPosition,
    decreaseModifiedPosition,
  } = useStacks();

  /**
   * Increases or decreases the table position when ArrowUp or ArrownDown is pressed.
   * @param event The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowUp":
        decreaseOriginalPosition();
        decreaseModifiedPosition();
        break;
      case "ArrowDown":
        increaseOriginalPosition();
        increaseModifiedPosition();
        break;
      case "ArrowRight":
        increaseModifiedPosition();
        break;
      case "ArrowLeft":
        increaseOriginalPosition();
        break;
    }
  };

  return (
    <div className="stack-visualizer" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="stack-actions container">
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

      <div className="container">
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
          options={{
            readOnly: true,
            originalEditable: false,
            lineNumbers: "on",
            fontSize: 16,
            minimap: {
              enabled: false,
            },
            diffWordWrap: "on",
            splitViewDefaultRatio: 0.515,
          }}
          beforeMount={defineMonacoTheme}
          original={originalStack.steps[originalPosition]?.content ?? ""}
          modified={modifiedStack.steps[modifiedPosition]?.content ?? ""}
        />
      </div>
    </div>
  );
};

export default StackVisualizer;
