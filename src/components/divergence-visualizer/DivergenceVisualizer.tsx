import "./DivergenceVisualizer.css";
import DivergenceItem from "./DivergenceItem";
import { useEffect, useRef, useState } from "react";
import type { D3Divergence } from "../../models/divergence";

interface DivergenceVisualizerProps {
  divergences: D3Divergence[];
}

const DivergenceVisualizer: React.FC<DivergenceVisualizerProps> = ({
  divergences,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);
  const [selectedDivergence, setSelectedDivergence] =
    useState<D3Divergence | null>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
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
    <div className="divergence-table-container">
      <div className="divergence-table" tabIndex={0} onKeyDown={handleKeyDown}>
        {divergences.length > 0 &&
          divergences.map((d) => (
            <DivergenceItem
              key={`divergence-${d.id}`}
              ref={selectedDivergence == d ? selectedRef : null}
              divergence={d}
              isSelected={selectedDivergence == d}
              setSelectedDivergence={setSelectedDivergence}
            />
          ))}
      </div>
    </div>
  );
};

export default DivergenceVisualizer;
