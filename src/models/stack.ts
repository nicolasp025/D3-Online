  export type D3CallStack = {
    id: number;
    frames: D3StackFrame[];
  };

  export type D3StackFrame = {
    id: number;
    position: number;
    displayName: string;
    sourceCode: string;
  };
