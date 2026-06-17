import { DiffEditor } from "@monaco-editor/react";
import { useSettings } from "../../contexts/SettingsContext";
import { defineMonacoTheme, MONACO_OPTIONS } from "../../config/monaco";

interface MonacoDiffEditorProps {
    original: string | undefined;
    modified: string | undefined;
}

const MonacoDiffEditor: React.FC<MonacoDiffEditorProps> = ({
    original = "",
    modified = "",
}) => {
    const { darkMode } = useSettings();

    return (
        <DiffEditor
            height="300px"
            theme={darkMode ? "d3-dark" : "d3-light"}
            language="python"
            options={MONACO_OPTIONS}
            beforeMount={defineMonacoTheme}
            original={original}
            modified={modified}
        />
    );
};

export default MonacoDiffEditor;
