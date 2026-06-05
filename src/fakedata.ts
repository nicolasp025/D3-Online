import type { D3Divergence } from "./models/divergence";
import type { D3CallStack } from "./models/stack";

export const originalStack: D3CallStack = {
  id: 1,
  frames: [
    {
      id: 1,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 2,
      sourceCode: "console.log('bonjour')",
      displayName: "Log",
    },
    { id: 3, sourceCode: "console.log(42)", displayName: "Log 42" },
    {
      id: 4,
      sourceCode: "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 5,
      sourceCode: "console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'));console.log(document.getElementById('test-element'))",
      displayName: "Log test-element",
    },
    {
      id: 6,
      sourceCode: "console.log('bonjour')",
      displayName: "Log",
    },
    { id: 7, sourceCode: "console.log(42)", displayName: "Log 42" },
    {
      id: 8,
      sourceCode: "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 9,
      sourceCode: "console.log(document.getElementById('test-element'))",
      displayName: "Log test-element",
    },
    {
      id: 10,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 11,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 12,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 13,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 14,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 15,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 16,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 17,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 18,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 19,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 20,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 21,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 22,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 23,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 24,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 25,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 26,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 27,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
  ],
};

export const modifiedStack: D3CallStack = {
  id: 1,
  frames: [
    {
      id: 10,
      sourceCode: "console.log('bonjour')",
      displayName: "Log 'bonjour'",
    },
    {
      id: 11,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    { id: 12, sourceCode: "console.log(42)", displayName: "Log 42" },
    {
      id: 13,
      sourceCode: "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 14,
      sourceCode: "console.log(document.getElementById('a-test-element'))",
      displayName: "Log a-test-element",
    },
    {
      id: 15,
      sourceCode: "console.log('test')",
      displayName: "Log 'test'",
    },
    { id: 16, sourceCode: "console.log(42)", displayName: "Log 42" },
  ],
};

export const fakeDivergences: D3Divergence[] = [
  {
    id: 1,
    displayName: "[Message] <-> Divergence on Flow : reference execution send #sugar modified send #sugar1",
    originalPosition: {
      start: 0,
      stop: 2,
    },
    modifiedPosition: {
      start: 0,
      stop: 3,
    },
  },
  {
    id: 2,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'UndefinedObje..., a Dictionary('className'->'SmallInteger'...",
    originalPosition: 0,
    modifiedPosition: 0,
    context: "here is some context",
  },
  {
    id: 3,
    displayName: "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      stop: 6,
    },
    modifiedPosition: {
      start: 5,
      stop: 7,
    },
  },
  {
    id: 4,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalPosition: 0,
    modifiedPosition: 0,
    context: "here is some context",
  },
  {
    id: 5,
    displayName: "[Message] <-> Divergence on Flow : reference execution stop #log modified send #print",
    originalPosition: {
      start: 5,
      stop: 6,
    },
    modifiedPosition: {
      start: 5,
      stop: 7,
    },
  },
  {
    id: 6,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalPosition: 1,
    modifiedPosition: 1,
    context: "here is some context",
  },
  {
    id: 7,
    displayName: "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      stop: 6,
    },
    modifiedPosition: {
      start: 5,
      stop: 7,
    },
  },
  {
    id: 8,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalPosition: 2,
    modifiedPosition: 2,
    context: "here is some context",
  },
  {
    id: 9,
    displayName: "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      stop: 6,
    },
    modifiedPosition: {
      start: 5,
      stop: 7,
    },
  },
  {
    id: 10,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalPosition: 3,
    modifiedPosition: 3,
    context: "here is some context",
  },
  {
    id: 11,
    displayName: "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      stop: 6,
    },
    modifiedPosition: {
      start: 5,
      stop: 7,
    },
  },
  {
    id: 12,
    displayName:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalPosition: 4,
    modifiedPosition: 4,
    context: "here is some context",
  },
];
