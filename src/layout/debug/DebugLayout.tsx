import DivergenceVisualizer from "../../components/divergence-visualizer/DivergenceVisualizer";
import StackVisualizer from "../../components/stack-vizualizer/StackVisualizer";
import "./DebugLayout.css";
import { TabDisplayer } from "../../components/tab-displayer/TabDisplayer";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useMemo } from "react";

const DebugLayout = () => {
  const { flowDivergences, stateDivergences } = useDivergence();

  const tabs = useMemo(
    () => [
      {
        id: 0,
        title: "Flow",
        content: <DivergenceVisualizer divergences={flowDivergences} />,
      },
      {
        id: 1,
        title: "State",
        content: <DivergenceVisualizer divergences={stateDivergences} />,
      },
    ],
    [flowDivergences, stateDivergences],
  );

  return (
    <>
      <div className="container">
        <h1>Divergences</h1>
        <TabDisplayer tabs={tabs} />
      </div>
      <StackVisualizer />
    </>
  );
};

export default DebugLayout;
