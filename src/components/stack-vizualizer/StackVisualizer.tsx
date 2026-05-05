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

  const updateTablesPosition = (newPosition: number) => {
    setOriginalPosition(newPosition);
    setModifiedPosition(newPosition);
  };

  return (
    <div className="stack-visualizer">
      <div className="steps-tables">
        <StepsTable
          steps={originalStack.steps}
          selectedPosition={originalPosition}
          updateTablesPosition={updateTablesPosition}
        />
        <StepsTable
          steps={modifiedStack.steps}
          selectedPosition={modifiedPosition}
          updateTablesPosition={updateTablesPosition}
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
          original={originalStack.steps[originalPosition].content}
          modified={modifiedStack.steps[modifiedPosition].content}
        />
      </div>
    </div>
  );
};

export default StackVisualizer;
