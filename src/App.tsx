import "./App.css";
import StackVisualizer from "./components/stack-vizualizer/StackVisualizer";
import { modifiedStack, originalStack } from "./fakedata";

function App() {
  return (
    <>
      <div style={{ height: "100%" }}>test</div>
      <div style={{ height: "100%" }}>
        <StackVisualizer
          originalStack={originalStack}
          modifiedStack={modifiedStack}
        />
      </div>
    </>
  );
}

export default App;
