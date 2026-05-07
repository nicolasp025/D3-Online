import "./App.css";
import DebugLayout from "./components/layout/DebugLayout";
import { DivergenceProvider } from "./contexts/DivergenceContext";

function App() {
  return (
    <DivergenceProvider>
      <DebugLayout />
    </DivergenceProvider>
  );
}

export default App;
