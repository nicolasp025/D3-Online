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
      id: 2,
      position: 5,
      content: "console.log('bonjour')",
      displayName: "Log",
    },
    { id: 3, position: 6, content: "console.log(42)", displayName: "Log 42" },
    {
      id: 4,
      position: 7,
      content:
        "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
    {
      id: 5,
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
      id: 1,
      position: 0,
      content: "console.log('bonjour')",
      displayName: "Log 'bonjour'",
    },
    {
      id: 2,
      position: 1,
      content: "console.log('test')",
      displayName: "Log 'test'",
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
      content: "console.log(document.getElementById('a-test-element'))",
      displayName: "Log a-test-element",
    },
    {
      id: 2,
      position: 5,
      content: "console.log('test')",
      displayName: "Log 'test'",
    },
    { id: 3, position: 6, content: "console.log(42)", displayName: "Log 42" },
    {
      id: 4,
      position: 7,
      content:
        "document.addEventListener('click',() => {console.log('click')});",
      displayName: "Add event listener",
    },
  ],
};
