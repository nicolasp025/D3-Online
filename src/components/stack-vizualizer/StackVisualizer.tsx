import type { D3CallStack } from "../../models/stack";
import FrameTable from "../frame-table/FrameTable";
import "./StackVisualizer.css";
import { DiffEditor } from "@monaco-editor/react";
import { defineMonacoTheme, MONACO_OPTIONS } from "../../config/monaco";
import ArrowBackIcon from "../../assets/icons/arrow_back.svg?react";
import ArrowForwardIcon from "../../assets/icons/arrow_forward.svg?react";
import RestartIcon from "../../assets/icons/restart.svg?react";
import SyncIcon from "../../assets/icons/arrows_sync.svg?react";
import type { D3FlowDivergence } from "../../models/divergence";
import { useStacks } from "../../contexts/StacksContext";
import { useSettings } from "../../contexts/SettingsContext";

interface StackVisualizerProps {
  originalStack: D3CallStack;
  modifiedStack: D3CallStack;
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

  const { darkMode } = useSettings();

  return (
    <>
      <div
        className="stack-actions container"
        tabIndex={0}
        onKeyDown={handleFrameMoving}
      >
        <button onClick={increaseOriginalPosition}>
          <ArrowBackIcon aria-label="Step left icon" />
          Step left
        </button>
        <button
          onClick={() => {
            increaseOriginalPosition();
            increaseModifiedPosition();
          }}
        >
          <SyncIcon aria-label="Step synchronized icon" />
          Step sync
        </button>
        <button onClick={increaseModifiedPosition}>
          <ArrowForwardIcon aria-label="Step right icon" />
          Step right
        </button>
        <button
          onClick={() => {
            updateTablesPositions(0);
          }}
        >
          <RestartIcon aria-label="Restart icon" />
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
            frames={originalStack.frames}
            selectedPosition={originalPosition}
            getDivergencePosition={(d: D3FlowDivergence) => d.originalPosition}
            prefixColor="var(--color-deletion)"
          />
          <FrameTable
            frames={modifiedStack.frames}
            selectedPosition={modifiedPosition}
            getDivergencePosition={(d: D3FlowDivergence) => d.modifiedPosition}
            prefixColor="var(--color-addition)"
          />
        </div>
      </div>

      <div className="stack-editor container">
        <DiffEditor
          height="100%"
          theme={darkMode ? "d3-dark" : "d3-light"}
          language="typescript"
          options={MONACO_OPTIONS}
          beforeMount={defineMonacoTheme}
          original={originalStack.frames[originalPosition]?.sourceCode ?? ""}
          modified={modifiedStack.frames[modifiedPosition]?.sourceCode ?? ""}
        />
      </div>
    </>
  );
};

export default StackVisualizer;
