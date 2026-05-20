import type { BeforeMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

export const EDITOR_THEME_NAME = "D3-theme";
export const EDITOR_THEME = {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#ffffff",
  },
};

/**
 * Defines the monaco theme for editors.
 * @param monaco the monaco instance.
 */
export const defineMonacoTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme(EDITOR_THEME_NAME, EDITOR_THEME);
};

export const MONACO_OPTIONS: editor.IDiffEditorConstructionOptions = {
  readOnly: true,
  originalEditable: false,
  lineNumbers: "on",
  fontSize: 16,
  minimap: {
    enabled: false,
  },
  diffWordWrap: "on",
  splitViewDefaultRatio: 0.515,
};
