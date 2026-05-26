import { BrowserRouter } from "react-router";
import "./App.css";
import { DivergenceProvider } from "./contexts/DivergenceContext";
import { StacksProvider } from "./contexts/StacksContext";
import Router from "./Router";
import { ConsentProvider } from "./contexts/ConsentContext";
import { NotepadProvider } from "./contexts/NotepadContext";

function App() {
  return (
    <BrowserRouter>
      <StacksProvider>
        <ConsentProvider>
          <NotepadProvider>
            <DivergenceProvider>
              <Router />
            </DivergenceProvider>
          </NotepadProvider>
        </ConsentProvider>
      </StacksProvider>
    </BrowserRouter>
  );
}

export default App;
