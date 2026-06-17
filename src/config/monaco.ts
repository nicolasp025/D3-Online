import type { BeforeMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

export const MONACO_LIGHT_THEME = {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#ffffff",
  },
};

export const MONACO_DARK_THEME = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#151515",
  },
};

/**
 * Defines the monaco theme for editors.
 * @param monaco the monaco instance.
 */
export const defineMonacoTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("d3-light", MONACO_LIGHT_THEME);
  monaco.editor.defineTheme("d3-dark", MONACO_DARK_THEME);
};

export const MONACO_OPTIONS: editor.IDiffEditorConstructionOptions = {
  readOnly: true,
  originalEditable: false,
  lineNumbers: "on",
  fontSize: 18,
  fontFamily: '"Roboto", sans-serif',
  minimap: {
    enabled: false,
  },
  diffWordWrap: "on",
  splitViewDefaultRatio: 0.515,
};
