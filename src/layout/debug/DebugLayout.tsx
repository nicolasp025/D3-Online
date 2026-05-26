import { modifiedStack, originalStack } from "../../fakedata";
import DivergenceVisualizer from "../../components/divergence-visualizer/DivergenceVisualizer";
import StackVisualizer from "../../components/stack-vizualizer/StackVisualizer";
import "./DebugLayout.css";

const DebugLayout = () => {
  return (
    <>
      <DivergenceVisualizer />
      <StackVisualizer originalStack={originalStack} modifiedStack={modifiedStack} />
    </>
  );
};

export default DebugLayout;
