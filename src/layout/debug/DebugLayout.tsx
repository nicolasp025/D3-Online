import { modifiedStack, originalStack } from "../../fakedata";
import DivergenceVisualizer from "../../components/divergence-visualizer/DivergenceVisualizer";
import StackVisualizer from "../../components/stack-vizualizer/StackVisualizer";
import "./DebugLayout.css";
import { TabDisplayer } from "../../components/tab-displayer/TabDisplayer";
import { ResizableContainer } from "../../components/resizable-container/ResizableContainer";

const DebugLayout = () => {
  return (
    <>
      <ResizableContainer>
        <h1>Divergences</h1>
        <TabDisplayer
          tabs={[
            { title: "Flow", content: <DivergenceVisualizer /> },
            { title: "Test", content: <>Test tab</> },
          ]}
        />
      </ResizableContainer>
      <StackVisualizer
        originalStack={originalStack}
        modifiedStack={modifiedStack}
      />
    </>
  );
};

export default DebugLayout;
