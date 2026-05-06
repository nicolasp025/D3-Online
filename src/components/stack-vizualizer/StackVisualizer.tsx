import { useState } from "react";
import type { ExecutionStack } from "../../model/stack";
import StepsTable from "../steps-table/FrameTable";
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

interface StackVisualizerProps {
  originalStack: ExecutionStack;
  modifiedStack: ExecutionStack;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({
  originalStack,
  modifiedStack,
}) => {
  const [originalPosition, setOriginalPosition] = useState(0);
  const [modifiedPosition, setModifiedPosition] = useState(0);

  /**
   * Sets a new position for both steps tables.
   * @param newPosition The new position for both tables.
   */
  const updateTablesPositions = (newPosition: number) => {
    setOriginalPosition(newPosition);
    setModifiedPosition(newPosition);
  };

  /**
   * Increases the original stack selected position.
   */
  const increaseOriginalPosition = () => {
    if (originalPosition < originalStack.steps.length - 1) {
      setOriginalPosition(originalPosition + 1);
    }
  };

  /**
   * Increases the modified stack selected position.
   */
  const increaseModifiedPosition = () => {
    if (modifiedPosition < modifiedStack.steps.length - 1) {
      setModifiedPosition(modifiedPosition + 1);
    }
  };

  /**
   * Decreases the original stack selected position.
   */
  const decreaseOriginalPosition = () => {
    if (originalPosition > 0) {
      setOriginalPosition(originalPosition - 1);
    }
  };

  /**
   * Decreases the modified stack selected position.
   */
  const decreaseModifiedPosition = () => {
    if (modifiedPosition > 0) {
      setModifiedPosition(modifiedPosition - 1);
    }
  };

  /**
   * Increases or decreases the table position when ArrowUp or ArrownDown is pressed.
   * @param event The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        decreaseOriginalPosition();
        decreaseModifiedPosition();
        break;
      case "ArrowDown":
        increaseOriginalPosition();
        increaseModifiedPosition();
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
      <div className="stack-header container">
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
        <StepsTable
          steps={originalStack.steps}
          selectedPosition={originalPosition}
          updateTablesPositions={updateTablesPositions}
        />
        <StepsTable
          steps={modifiedStack.steps}
          selectedPosition={modifiedPosition}
          updateTablesPositions={updateTablesPositions}
        />
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
