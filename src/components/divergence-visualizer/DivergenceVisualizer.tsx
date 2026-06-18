import "./DivergenceVisualizer.css";
import DivergenceItem from "./DivergenceItem";
import { useCallback, useEffect, useRef } from "react";
import type {
  D3Divergence,
  D3FlowDivergence,
  D3StateDivergence,
} from "../../models/divergence";
import { useStacks } from "../../contexts/StacksContext";
import { useDivergence } from "../../contexts/DivergenceContext";
import ScrollWrapper from "../scroll-wrapper/ScrollWrapper";

interface DivergenceVisualizerProps {
  divergences: D3Divergence[];
}

const DivergenceVisualizer: React.FC<DivergenceVisualizerProps> = ({
  divergences,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);
  const { selectedDivergence, setSelectedDivergence } = useDivergence();

  const { setOriginalPosition, setModifiedPosition } = useStacks();

  /**
   * Select the specified divergence and sets the original and modified positions according to the divergence.
   * @param d The specified divergence to select.
   */
  const updateSelectedDivergenceInTables = useCallback(() => {
    if (!selectedDivergence) return;

    if (!("context" in selectedDivergence)) {
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
  }, [setOriginalPosition, setModifiedPosition, selectedDivergence]);

  useEffect(() => {
    updateSelectedDivergenceInTables();
  }, [selectedDivergence]);

  /**
   * Handles any keyboard event in the divergence visualizer.
   * @param event The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (selectedDivergence != null) {
      const index = divergences.indexOf(selectedDivergence);

      switch (event.key) {
        case "ArrowUp":
          if (index > 0) {
            setSelectedDivergence(divergences[index - 1]);
          }
          break;
        case "ArrowDown":
          if (index < divergences.length - 1) {
            setSelectedDivergence(divergences[index + 1]);
          }
          break;
      }
    }
  };

  return (
    <ScrollWrapper dependsOn={selectedDivergence} dependenceRef={selectedRef}>
      <div className="divergence-table-container">
        <div
          className="divergence-table"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {divergences.length > 0 &&
            divergences.map((d) => (
              <DivergenceItem
                key={`divergence-${d.id}`}
                ref={selectedDivergence == d ? selectedRef : null}
                divergence={d}
              />
            ))}
        </div>
      </div>
    </ScrollWrapper>
  );
};

export default DivergenceVisualizer;
