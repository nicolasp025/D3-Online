import type { D3FlowDivergence, D3StateDivergence } from "./models/divergence";
import type { D3CallStack } from "./models/stack";

export const originalStack: D3CallStack = {
  id: 1,
  frames: Array.from({ length: 100 }, (_, index) => {
    const frameNum = index;
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
      position: index,
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
      position: index,
    };
  }),
};

export const fakeStateDivergences: D3StateDivergence[] = [
  {
    id: 1,
    displayName: "[Assignment] #count: 10, 20",
    originalPosition: 1,
    modifiedPosition: 1,
    context: "count increment",
  },
  {
    id: 2,
    displayName: "[Assignment] #count: 10, 20",
    originalPosition: 8,
    modifiedPosition: 8,
    context: "count increment",
  },
  {
    id: 3,
    displayName: "[Assignment] #count: 10, 20",
    originalPosition: 27,
    modifiedPosition: 27,
    context: "count increment",
  },
];

export const fakeFlowDivergences: D3FlowDivergence[] = [
  {
    id: 1,
    displayName: "Flow Divergence 1",
    originalPosition: { start: 1, stop: 5 },
    modifiedPosition: { start: 1, stop: 5 },
  },
  {
    id: 2,
    displayName: "Flow Divergence 2",
    originalPosition: { start: 7, stop: 8 },
    modifiedPosition: { start: 7, stop: 8 },
  },
  {
    id: 3,
    displayName: "Flow Divergence 3",
    originalPosition: { start: 10, stop: 12 },
    modifiedPosition: { start: 10, stop: 15 },
  },
  {
    id: 4,
    displayName: "Flow Divergence 4",
    originalPosition: { start: 17, stop: 22 },
    modifiedPosition: { start: 17, stop: 18 },
  },
  {
    id: 5,
    displayName: "Flow Divergence 5",
    originalPosition: { start: 24, stop: 25 },
    modifiedPosition: { start: 24, stop: 24 },
  },

  {
    id: 6,
    displayName: "Flow Divergence 6",
    originalPosition: { start: 27, stop: null },
    modifiedPosition: { start: 27, stop: null },
  },
];
