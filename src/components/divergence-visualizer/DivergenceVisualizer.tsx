import "./DivergenceVisualizer.css";
import { useDivergence } from "../../contexts/DivergenceContext";
import DivergenceItem from "./DivergenceItem";
import { useEffect, useRef } from "react";

const DivergenceVisualizer = () => {
  const { divergences, selectedDivergence, setSelectedDivergence } =
    useDivergence();
  const selectedRef = useRef<HTMLDivElement>(null);

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
    if (selectedDivergence) {
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
    <div className="divergence-table-container container">
      <div className="divergence-header">Divergence</div>
      <div className="divergence-table" tabIndex={0} onKeyDown={handleKeyDown}>
        {divergences.length > 0 &&
          divergences.map((d) => (
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
