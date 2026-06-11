import { DiffEditor } from "@monaco-editor/react";
import { useSettings } from "../../contexts/SettingsContext";
import { defineMonacoTheme, MONACO_OPTIONS } from "../../config/monaco";

interface MonacoDiffEditorProps {
    original: string;
    modified: string;
}

const MonacoDiffEditor: React.FC<MonacoDiffEditorProps> = ({
    original,
    modified,
}) => {
    const { darkMode } = useSettings();

    return (
        <DiffEditor
            height="300px"
            theme={darkMode ? "d3-dark" : "d3-light"}
            language="typescript"
            options={MONACO_OPTIONS}
            beforeMount={defineMonacoTheme}
            original={original}
            modified={modified}
        />
    );
};

export default MonacoDiffEditor;
