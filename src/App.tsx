import "./App.css";
import DebugLayout from "./components/layout/DebugLayout";
import { DivergenceProvider } from "./contexts/DivergenceContext";
import { StacksProvider } from "./contexts/StacksContext";

function App() {
  return (
    <StacksProvider>
      <DivergenceProvider>
        <DebugLayout />
      </DivergenceProvider>
    </StacksProvider>
  );
}

export default App;
