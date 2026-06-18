import type {
  D3FlowDivergence,
  D3StateDivergence,
} from "../../models/divergence";

/**
 * Returns the divergence length difference between original and modified stacks.
 * Negative result = modified stack is longer.
 * 0 = both stacks have the same size.
 * Positive result = original stack is longer.
 *
 * @param flowDiv           A flow divergence.
 * @returns                 A number.
 */
export const getLengthDifference = (flowDiv: D3FlowDivergence) => {
  if (!flowDiv.originalPosition.stop || !flowDiv.modifiedPosition.stop) {
    throw new Error("Could not determine infinite divergence length.");
  }
  const originalLength =
    flowDiv.originalPosition.stop - flowDiv.originalPosition.start;
  const modifiedLength =
    flowDiv.modifiedPosition.stop - flowDiv.modifiedPosition.start;
  return originalLength - modifiedLength;
};

/**
 * Returns true if the specified flow divergence is infinite (does not converge).
 * @param flowDiv           The specified flow divergence.
 * @returns                 True if the flow divergence is infinite (does not converge).
 */
export const isInfiniteFlowDivergence = (flowDiv: D3FlowDivergence) => {
  return (
    flowDiv.originalPosition.stop == null ||
    flowDiv.modifiedPosition.stop == null
  );
};

/**
 * Returns the divergence if the specified position is in any flow divergence range, null otherwise.
 * @param position          The specified position.
 * @param flowDivergences   The flow divergences.
 * @returns                 The divergence related to the position if possible, null otherwise.
 */
export const getFlowDiv = (
  originalPosition: number,
  modifiedPosition: number,
  flowDivergences: D3FlowDivergence[],
): D3FlowDivergence | null => {
  return (
    flowDivergences.find((div) => {
      if (!div.originalPosition.stop || !div.modifiedPosition.stop) {
        return (
          div.originalPosition.start <= originalPosition &&
          div.modifiedPosition.start <= modifiedPosition
        );
      }

      const lengthDiff = getLengthDifference(div);

      switch (true) {
        case lengthDiff == 0:
          return (
            div.originalPosition.start <= originalPosition &&
            div.originalPosition.stop >= originalPosition &&
            div.modifiedPosition.start <= modifiedPosition &&
            div.modifiedPosition.stop >= modifiedPosition
          );
        case lengthDiff < 0:
          return (
            div.modifiedPosition.start <= modifiedPosition &&
            div.modifiedPosition.stop >= modifiedPosition
          );
        case lengthDiff > 0:
          return (
            div.originalPosition.start <= originalPosition &&
            div.originalPosition.stop >= originalPosition
          );
      }
    }) ?? null
  );
};

/**
 * Return true if the specified frame position corresponds to a state divergence position.
 * @param position          The frame position.
 * @returns                 True if the specified position is a state divergence, false otherwise.
 */
export const isStateDivergence = (
  originalPosition: number,
  modifiedPosition: number,
  stateDivergences: D3StateDivergence[],
) => {
  return stateDivergences.some(
    (div) =>
      div.originalPosition == originalPosition &&
      div.modifiedPosition == modifiedPosition,
  );
};
