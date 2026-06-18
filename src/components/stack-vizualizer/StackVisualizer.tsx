import FrameTable from "../frame-table/FrameTable";
import "./StackVisualizer.css";
import ArrowBackIcon from "../../assets/icons/arrow_back.svg?react";
import ArrowForwardIcon from "../../assets/icons/arrow_forward.svg?react";
import RestartIcon from "../../assets/icons/restart.svg?react";
import SyncIcon from "../../assets/icons/arrows_sync.svg?react";
import type { D3FlowDivergence } from "../../models/divergence";
import { useStacks } from "../../contexts/StacksContext";
import { ResizableContainer } from "../resizable-container/ResizableContainer";
import MonacoDiffEditor from "../monaco/MonacoDiffEditor";

const StackVisualizer = () => {
  const {
    originalStack,
    originalPosition,
    modifiedStack,
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

      <ResizableContainer>
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
              getDivergencePosition={(d: D3FlowDivergence) =>
                d.originalPosition
              }
              prefixColor="var(--color-deletion)"
            />
            <FrameTable
              frames={modifiedStack.frames}
              selectedPosition={modifiedPosition}
              getDivergencePosition={(d: D3FlowDivergence) =>
                d.modifiedPosition
              }
              prefixColor="var(--color-addition)"
            />
          </div>
        </div>
      </ResizableContainer>

      <ResizableContainer>
        <div className="stack-editor container">
          <MonacoDiffEditor
            original={originalStack?.frames[originalPosition]?.sourceCode}
            modified={modifiedStack?.frames[modifiedPosition]?.sourceCode}
          />
        </div>
      </ResizableContainer>
    </>
  );
};

export default StackVisualizer;
