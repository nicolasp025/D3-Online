import DivergenceVisualizer from "../../components/divergence-visualizer/DivergenceVisualizer";
import StackVisualizer from "../../components/stack-vizualizer/StackVisualizer";
import "./DebugLayout.css";
import { TabDisplayer } from "../../components/tab-displayer/TabDisplayer";
import { ResizableContainer } from "../../components/resizable-container/ResizableContainer";
import { useStacks } from "../../contexts/StacksContext";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useMemo, useState } from "react";

const DebugLayout = () => {
  const { originalStack, modifiedStack } = useStacks();
  const { flowDivergences, stateDivergences } = useDivergence();

  const [originalPosition, _setOriginalPosition] = useState<number>(0);
  const [modifiedPosition, _setModifiedPosition] = useState<number>(0);

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
      <ResizableContainer>
        <h1>Divergences</h1>
        <TabDisplayer tabs={tabs} />
      </ResizableContainer>
      <StackVisualizer
        originalStack={originalStack}
        originalPosition={originalPosition}
        modifiedStack={modifiedStack}
        modifiedPosition={modifiedPosition}
      />
    </>
  );
};

export default DebugLayout;
