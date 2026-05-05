import { useState } from "react";
import type { ExecutionStack } from "../../model/stack";
import StepsTable from "../steps-table/StepsTable";
import "./StackVisualizer.css";
import { DiffEditor } from "@monaco-editor/react";
import {
  defineMonacoTheme,
  EDITOR_THEME_NAME,
} from "../../config/monaco-theme";

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
   * Increases or decreases the table position when ArrowUp or ArrownDown is pressed.
   * @param event The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        if (originalPosition > 0) {
          setOriginalPosition(originalPosition - 1);
        }
        if (modifiedPosition > 0) {
          setModifiedPosition(modifiedPosition - 1);
        }
        break;
      case "ArrowDown":
        if (originalPosition < originalStack.steps.length - 1) {
          setOriginalPosition(originalPosition + 1);
        }
        if (modifiedPosition < modifiedStack.steps.length - 1) {
          setModifiedPosition(modifiedPosition + 1);
        }
        break;
    }
  };

  return (
    <div className="stack-visualizer">
      <div className="steps-tables" tabIndex={0} onKeyDown={handleKeyDown}>
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
            originalEditable: false,
            lineNumbers: "off",
            fontSize: 16,
            minimap: {
              enabled: false,
            },
            diffWordWrap: "on",
            readOnly: true,
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
