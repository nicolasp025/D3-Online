import { BrowserRouter } from "react-router";
import "./App.css";
import { DivergenceProvider } from "./contexts/DivergenceContext";
import { StacksProvider } from "./contexts/StacksContext";
import Router from "./Router";
import { ConsentProvider } from "./contexts/ExperimentContext";
import { NotepadProvider } from "./contexts/NotepadContext";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <BrowserRouter>
      <StacksProvider>
        <ConsentProvider>
          <NotepadProvider>
            <DivergenceProvider>
              <SettingsProvider>
                <Router />
              </SettingsProvider>
            </DivergenceProvider>
          </NotepadProvider>
        </ConsentProvider>
      </StacksProvider>
    </BrowserRouter>
  );
}

export default App;
