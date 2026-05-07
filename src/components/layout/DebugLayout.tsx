import { modifiedStack, originalStack } from "../../fakedata";
import DivergenceVisualizer from "../divergence-visualizer/DivergenceVisualizer";
import StackVisualizer from "../stack-vizualizer/StackVisualizer";
import "./DebugLayout.css";

const DebugLayout = () => {
  return (
    <>
      <div className="page-header">
        <DivergenceVisualizer />
        <DivergenceVisualizer />
      </div>
      <StackVisualizer
        originalStack={originalStack}
        modifiedStack={modifiedStack}
      />
    </>
  );
};

export default DebugLayout;
