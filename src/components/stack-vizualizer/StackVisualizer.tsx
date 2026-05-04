import { useState } from "react";
import type { ExecutionStack } from "../../model/stack";
import StepsTable from "../steps-table/StepsTable";
import "./StackVisualizer.css";
import { DiffEditor } from "@monaco-editor/react";

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

      <DiffEditor
        height="100%"
        theme="vs-dark"
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
        }}
        original={originalStack.steps[originalPosition].content}
        modified={modifiedStack.steps[modifiedPosition].content}
      />
    </div>
  );
};

export default StackVisualizer;
