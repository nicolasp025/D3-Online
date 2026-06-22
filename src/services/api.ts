import type { D3FlowDivergence, D3StateDivergence } from "../models/divergence";
import type { D3CallStack } from "../models/stack";

type D3DebugResponse = {
  metadata: null;
  flowDivergences: D3FlowDivergence[];
  stateDivergences: D3StateDivergence[];
  v1: D3CallStack;
  v2: D3CallStack;
};

export const startDebug = async (
  url1: string,
  url2: string,
  userId: string,
) => {
  const response = await fetch("/api/experiment", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      origin: url1,
      modified: url2,
    }),
  });

  if (!response || !response.ok) {
    throw new Error("invalid data fetch");
  }
  const result : D3DebugResponse = await response.json();
  console.log(result)
};
