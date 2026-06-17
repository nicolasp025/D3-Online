import { BrowserRouter } from "react-router";
import "./App.css";
import { DivergenceProvider } from "./contexts/DivergenceContext";
import { StacksProvider } from "./contexts/StacksContext";
import Router from "./Router";
import { ConsentProvider } from "./contexts/ExperimentContext";
import { NotepadProvider } from "./contexts/NotepadContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { DivergenceTreeProvider } from "./contexts/DivergenceTreeContext";

function App() {
  return (
    <BrowserRouter>
      <StacksProvider>
        <ConsentProvider>
          <NotepadProvider>
            <DivergenceProvider>
              <SettingsProvider>
                <DivergenceTreeProvider>
                  <Router />
                </DivergenceTreeProvider>
              </SettingsProvider>
            </DivergenceProvider>
          </NotepadProvider>
        </ConsentProvider>
      </StacksProvider>
    </BrowserRouter>
  );
}

export default App;
