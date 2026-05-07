import type { FlowDivergence, StateDivergence } from "./model/divergence";
import type { ExecutionStack } from "./model/stack";

export const originalStack: ExecutionStack = {
  id: 1,
  steps: [
    {
      id: 1,
      position: 0,
      content: "console.log('test')",
      displayName: "Log 'test'",
    },
    {
      id: 2,
      position: 1,
      content: "console.log('bonjour')",
      displayName: "Log",
    },
    { id: 3, position: 2, content: "console.log(42)", displayName: "Log 42" },
    {
      id: 4,
      position: 3,
      content:
        "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 5,
      position: 4,
      content: "console.log(document.getElementById('test-element'))",
      displayName: "Log test-element",
    },
    {
      id: 6,
      position: 5,
      content: "console.log('bonjour')",
      displayName: "Log",
    },
    { id: 7, position: 6, content: "console.log(42)", displayName: "Log 42" },
    {
      id: 8,
      position: 7,
      content:
        "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 9,
      position: 8,
      content: "console.log(document.getElementById('test-element'))",
      displayName: "Log test-element",
    },
  ],
};

export const modifiedStack: ExecutionStack = {
  id: 1,
  steps: [
    {
      id: 10,
      position: 0,
      content: "console.log('bonjour')",
      displayName: "Log 'bonjour'",
    },
    {
      id: 11,
      position: 1,
      content: "console.log('test')",
      displayName: "Log 'test'",
    },
    { id: 12, position: 2, content: "console.log(42)", displayName: "Log 42" },
    {
      id: 13,
      position: 3,
      content:
        "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 14,
      position: 4,
      content: "console.log(document.getElementById('a-test-element'))",
      displayName: "Log a-test-element",
    },
    {
      id: 15,
      position: 5,
      content: "console.log('test')",
      displayName: "Log 'test'",
    },
    { id: 16, position: 6, content: "console.log(42)", displayName: "Log 42" },
  ],
};

export const fakeDivergences: (FlowDivergence | StateDivergence)[] = [
  {
    id: 1,
    description:
      "[Message] <-> Divergence on Flow : reference execution send #sugar modified send #sugar1",
    originalPosition: {
      start: 0,
      end: 2,
    },
    modifiedPosition: {
      start: 0,
      end: 3,
    },
  },
  {
    id: 2,
    description:
      "[Assignment] #sugar: a Dictionary('className'->'UndefinedObje..., a Dictionary('className'->'SmallInteger'...",
    originalValue: "UndefinedObject",
    modifiedValue: "SmallInteger",
    context: "",
    position: 3,
  },
  {
    id: 3,
    description:
      "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      end: 6,
    },
    modifiedPosition: {
      start: 5,
      end: 7,
    },
  },
  {
    id: 4,
    description:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalValue: "SmallInteger",
    modifiedValue: "UndefinedObject",
    context: "",
    position: 6,
  },
  {
    id: 5,
    description:
      "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      end: 6,
    },
    modifiedPosition: {
      start: 5,
      end: 7,
    },
  },
  {
    id: 6,
    description:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalValue: "SmallInteger",
    modifiedValue: "UndefinedObject",
    context: "",
    position: 6,
  },
  {
    id: 7,
    description:
      "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      end: 6,
    },
    modifiedPosition: {
      start: 5,
      end: 7,
    },
  },
  {
    id: 8,
    description:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalValue: "SmallInteger",
    modifiedValue: "UndefinedObject",
    context: "",
    position: 6,
  },
  {
    id: 9,
    description:
      "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      end: 6,
    },
    modifiedPosition: {
      start: 5,
      end: 7,
    },
  },
  {
    id: 10,
    description:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalValue: "SmallInteger",
    modifiedValue: "UndefinedObject",
    context: "",
    position: 6,
  },
  {
    id: 11,
    description:
      "[Message] <-> Divergence on Flow : reference execution send #log modified send #print",
    originalPosition: {
      start: 5,
      end: 6,
    },
    modifiedPosition: {
      start: 5,
      end: 7,
    },
  },
  {
    id: 12,
    description:
      "[Assignment] #sugar: a Dictionary('className'->'SmallInteger'..., a Dictionary('className'->'UndefinedObje...",
    originalValue: "SmallInteger",
    modifiedValue: "UndefinedObject",
    context: "",
    position: 6,
  },
];
