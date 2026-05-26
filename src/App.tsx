import { BrowserRouter } from "react-router";
import "./App.css";
import { DivergenceProvider } from "./contexts/DivergenceContext";
import { StacksProvider } from "./contexts/StacksContext";
import Router from "./Router";
import { ConsentProvider } from "./contexts/ConsentContext";

function App() {
  return (
    <BrowserRouter>
      <StacksProvider>
        <DivergenceProvider>
          <ConsentProvider>
            <Router />
          </ConsentProvider>
        </DivergenceProvider>
      </StacksProvider>
    </BrowserRouter>
  );
}

export default App;
