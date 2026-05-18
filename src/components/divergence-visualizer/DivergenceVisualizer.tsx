import "./DivergenceVisualizer.css";
import { useDivergence } from "../../contexts/DivergenceContext";
import DivergenceItem from "./DivergenceItem";

const DivergenceVisualizer = () => {
  const { divergences } = useDivergence();

  return (
    <div className="divergence-table-container container">
      <div className="divergence-header">Divergence</div>
      <div className="divergence-table">
        {divergences.length > 0 &&
          divergences.map((d) => (
            <DivergenceItem key={`divergence-${d.id}`} divergence={d} />
          ))}
      </div>
    </div>
  );
};

export default DivergenceVisualizer;
