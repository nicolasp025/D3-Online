import Editor from '@monaco-editor/react';

export const MonacoEditor: React.FC = () => {
  return (
    <Editor
      height="100%"
      theme='vs-dark'
      defaultLanguage="typescript"
      defaultValue={[
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
      ].join('\n')}
    />
  );
};