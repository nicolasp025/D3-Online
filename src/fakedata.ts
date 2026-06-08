import type { D3FlowDivergence, D3StateDivergence } from "./models/divergence";
import type { D3CallStack } from "./models/stack";

export const originalStack: D3CallStack = {
  id: 1,
  frames: Array.from({ length: 100 }, (_, index) => {
    const frameNum = index + 10;
    const codeSnippets = [
      `const value${frameNum} = ${frameNum};`,
      `console.log('Original frame ${frameNum}');`,
      `const result = Math.pow(${frameNum}, 2);`,
      `if (${frameNum} % 2 === 0) { return true; }`,
      `const arr = Array.from({ length: ${frameNum} });`,
      `fetch('/api/data/${frameNum}').then(r => r.json());`,
      `document.querySelector('#elem-${frameNum}').addEventListener('click', () => {});`,
      `localStorage.setItem('key${frameNum}', 'value${frameNum}');`,
      `const obj = { id: ${frameNum}, name: 'Item ${frameNum}' };`,
      `setTimeout(() => { console.log('Timeout ${frameNum}'); }, ${frameNum * 100});`,
    ];

    return {
      id: frameNum,
      sourceCode: codeSnippets[frameNum % codeSnippets.length],
      displayName: `Original Frame ${frameNum}`,
    };
  }),
};

export const modifiedStack: D3CallStack = {
  id: 1,
  frames: Array.from({ length: 100 }, (_, index) => {
    const frameNum = index + 10;
    const codeSnippets = [
      `const value${frameNum} = ${frameNum};`,
      `console.log('Modified frame ${frameNum}');`,
      `const result = Math.pow(${frameNum}, 2);`,
      `if (${frameNum} % 2 === 0) { return true; }`,
      `const arr = Array.from({ length: ${frameNum} });`,
      `fetch('/api/data/${frameNum}').then(r => r.json());`,
      `document.querySelector('#elem-${frameNum}').addEventListener('click', () => {});`,
      `localStorage.setItem('key${frameNum}', 'value${frameNum}');`,
      `const obj = { id: ${frameNum}, name: 'Item ${frameNum}' };`,
      `setTimeout(() => { console.log('Timeout ${frameNum}'); }, ${frameNum * 100});`,
    ];

    return {
      id: frameNum,
      sourceCode: codeSnippets[frameNum % codeSnippets.length],
      displayName: `Modified Frame ${frameNum}`,
    };
  }),
};

export const fakeStateDivergences: D3StateDivergence[] = [
  {
    id: 1,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'UndefinedObje..., a Dictionary('className'->'SmallInteger'...",
    originalPosition: 2,
    modifiedPosition: 5,
    context: "here is some context",
  },
  {
    id: 2,
    displayName: "[Assignment] #counter: 0, 1",
    originalPosition: 7,
    modifiedPosition: 12,
    context: "counter initialization",
  },
  {
    id: 3,
    displayName: "[Assignment] #name: 'Alice', 'Bob'",
    originalPosition: 14,
    modifiedPosition: 21,
    context: "name assignment",
  },
  {
    id: 4,
    displayName: "[Assignment] #value: undefined, 42",
    originalPosition: 23,
    modifiedPosition: 29,
    context: "value initialization",
  },
  {
    id: 5,
    displayName: "[Assignment] #flag: false, true",
    originalPosition: 31,
    modifiedPosition: 38,
    context: "flag state change",
  },
  {
    id: 6,
    displayName: "[Assignment] #data: null, Object",
    originalPosition: 42,
    modifiedPosition: 47,
    context: "data object creation",
  },
  {
    id: 7,
    displayName: "[Assignment] #array: [], [1,2,3]",
    originalPosition: 51,
    modifiedPosition: 56,
    context: "array population",
  },
  {
    id: 8,
    displayName: "[Assignment] #count: 10, 20",
    originalPosition: 59,
    modifiedPosition: 65,
    context: "count increment",
  },
  {
    id: 9,
    displayName: "[Assignment] #status: 'pending', 'complete'",
    originalPosition: 68,
    modifiedPosition: 73,
    context: "status update",
  },
  {
    id: 10,
    displayName: "[Assignment] #element: null, HTMLElement",
    originalPosition: 76,
    modifiedPosition: 82,
    context: "DOM element reference",
  },
  {
    id: 11,
    displayName: "[Assignment] #sum: 0, 55",
    originalPosition: 85,
    modifiedPosition: 90,
    context: "sum calculation",
  },
  {
    id: 12,
    displayName: "[Assignment] #user: {}, {id: 1, name: 'John'}",
    originalPosition: 93,
    modifiedPosition: 98,
    context: "user object creation",
  },
  {
    id: 13,
    displayName: "[Assignment] #valid: true, false",
    originalPosition: 96,
    modifiedPosition: 99,
    context: "validation state",
  },
  {
    id: 14,
    displayName: "[Assignment] #result: '', 'success'",
    originalPosition: 97,
    modifiedPosition: 100,
    context: "result message",
  },
];

export const fakeFlowDivergences: D3FlowDivergence[] = [
  {
    id: 1,
    displayName: "Flow Divergence 1",
    originalPosition: { start: 0, stop: 10 },
    modifiedPosition: { start: 5, stop: 15 },
  },
  {
    id: 2,
    displayName: "Flow Divergence 2",
    originalPosition: { start: 10, stop: 20 },
    modifiedPosition: { start: 15, stop: 25 },
  },
  {
    id: 3,
    displayName: "Flow Divergence 3",
    originalPosition: { start: 20, stop: 30 },
    modifiedPosition: { start: 25, stop: 35 },
  },
  {
    id: 4,
    displayName: "Flow Divergence 4",
    originalPosition: { start: 30, stop: 40 },
    modifiedPosition: { start: 35, stop: 45 },
  },
  {
    id: 5,
    displayName: "Flow Divergence 5",
    originalPosition: { start: 40, stop: 50 },
    modifiedPosition: { start: 45, stop: 55 },
  },
  {
    id: 6,
    displayName: "Flow Divergence 6",
    originalPosition: { start: 50, stop: 60 },
    modifiedPosition: { start: 55, stop: 65 },
  },
  {
    id: 7,
    displayName: "Flow Divergence 7",
    originalPosition: { start: 60, stop: 70 },
    modifiedPosition: { start: 65, stop: 75 },
  },
  {
    id: 8,
    displayName: "Flow Divergence 8",
    originalPosition: { start: 70, stop: 80 },
    modifiedPosition: { start: 75, stop: 85 },
  },
  {
    id: 9,
    displayName: "Flow Divergence 9",
    originalPosition: { start: 80, stop: 90 },
    modifiedPosition: { start: 85, stop: 95 },
  },
];
