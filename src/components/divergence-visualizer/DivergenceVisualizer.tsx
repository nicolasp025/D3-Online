import "./DivergenceVisualizer.css";
import { useDivergence } from "../../contexts/DivergenceContext";
import DivergenceItem from "./DivergenceItem";
import { useCallback, useEffect, useRef } from "react";
import { useStacks } from "../../contexts/StacksContext";
import type {
  D3FlowDivergence,
  D3StateDivergence,
} from "../../models/divergence";

const DivergenceVisualizer = () => {
  const {
    flowDivergences,
    selectedDivergence,
    setSelectedDivergence,
    isFlowDivergence,
    stateDivergences,
  } = useDivergence();
  const { setOriginalPosition, setModifiedPosition } = useStacks();

  const selectedRef = useRef<HTMLDivElement>(null);

  /**
   * Select the specified divergence and sets the original and modified positions according to the divergence.
   * @param d The specified divergence to select.
   */
  const updateSelectedDivergenceInTables = useCallback(() => {
    if (!selectedDivergence) return;

    if (isFlowDivergence(selectedDivergence)) {
      setOriginalPosition(
        (selectedDivergence as D3FlowDivergence).originalPosition.start,
      );
      setModifiedPosition(
        (selectedDivergence as D3FlowDivergence).modifiedPosition.start,
      );
    } else {
      setOriginalPosition(
        (selectedDivergence as D3StateDivergence).originalPosition,
      );
      setModifiedPosition(
        (selectedDivergence as D3StateDivergence).modifiedPosition,
      );
    }
  }, [
    isFlowDivergence,
    setOriginalPosition,
    setModifiedPosition,
    selectedDivergence,
  ]);

  useEffect(() => {
    updateSelectedDivergenceInTables();
    selectedRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [selectedDivergence, updateSelectedDivergenceInTables]);

  /**
   * Handles any keyboard event in the divergence visualizer.
   * @param event The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (selectedDivergence) {
      const index = flowDivergences.indexOf(
        selectedDivergence as D3FlowDivergence /** TODO */,
      );

      switch (event.key) {
        case "ArrowUp":
          if (index > 0) {
            setSelectedDivergence(flowDivergences[index - 1]);
          }
          break;
        case "ArrowDown":
          if (index < flowDivergences.length - 1) {
            setSelectedDivergence(flowDivergences[index + 1]);
          }
          break;
      }
    }
  };

  return (
    <div className="divergence-table-container">
      <div className="divergence-table" tabIndex={0} onKeyDown={handleKeyDown}>
        {stateDivergences.length > 0 &&
          stateDivergences.map((d) => (
            <DivergenceItem
              key={`divergence-${d.id}`}
              ref={d == selectedDivergence ? selectedRef : null}
              divergence={d}
            />
          ))}
      </div>
    </div>
  );
};

export default DivergenceVisualizer;
