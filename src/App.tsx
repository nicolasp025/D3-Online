import { BrowserRouter } from "react-router";
import "./App.css";
import { DivergenceProvider } from "./contexts/DivergenceContext";
import { StacksProvider } from "./contexts/StacksContext";
import Router from "./Router";

function App() {
  return (
    <BrowserRouter>
      <StacksProvider>
        <DivergenceProvider>
          <Router />
        </DivergenceProvider>
      </StacksProvider>
    </BrowserRouter>
  );
}

export default App;
