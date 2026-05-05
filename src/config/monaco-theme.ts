import type { BeforeMount } from "@monaco-editor/react";

export const EDITOR_THEME_NAME = "D3-theme";

export const EDITOR_THEME = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#111111",
  },
};

/**
 * Defines the monaco theme for editors.
 * @param monaco the monaco instance.
 */
export const defineMonacoTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme(EDITOR_THEME_NAME, EDITOR_THEME);
};
