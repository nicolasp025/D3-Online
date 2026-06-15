import type {
    D3FlowDivergence,
    D3StateDivergence,
} from "../../models/divergence";
import type { D3StackFrame } from "../../models/stack";

/**
 * Returns the divergence length difference between original and modified stacks.
 * Negative result = modified stack is longer.
 * 0 = both stack have the same size.
 * Positive result = original stack is longer.
 *
 * @param flowDiv           A flow divergence.
 * @returns                 A number.
 */
export const getLengthDifference = (flowDiv: D3FlowDivergence) => {
    const originalLength =
        flowDiv.originalPosition.stop - flowDiv.originalPosition.start;
    const modifiedLength =
        flowDiv.modifiedPosition.stop - flowDiv.modifiedPosition.start;
    return originalLength - modifiedLength;
};

/**
 * Returns the divergence if the specified position is in any flow divergence range, null otherwise.
 * @param position          The specified position.
 * @param flowDivergences   The flow divergences.
 * @returns                 The divergence related to the position if possible, null otherwise.
 */
export const getFlowDiv = (
    position: number,
    flowDivergences: D3FlowDivergence[],
) => {
    return (
        flowDivergences.find(
            (div) =>
                position >= div.modifiedPosition.start &&
                (position <= div.modifiedPosition.stop + getLengthDifference(div) ||
                    div.originalPosition.stop == null),
        ) ?? null
    );
};

/**
 * Return true if the specified position's previous element is in a divergence.
 * @param index             The position in the rows.
 * @param rows              The tree rows.
 * @param flowDivergences   The flow divergences.
 * @returns                 True if the specified position's next element is in a divergence.
 */
export const hasPreviousInDivergence = (
    index: number,
    rows: (D3StackFrame | null)[],
    flowDivergences: D3FlowDivergence[],
) => {
    return rows[index] == null || getFlowDiv(index - 1, flowDivergences) != null;
};

/**
 * Return true if the specified position's next element is in a divergence.
 * @param index             The position in the rows.
 * @param rows              The tree rows.
 * @param flowDivergences   The flow divergences.
 * @returns                 True if the specified position's next element is in a divergence.
 */
export const hasNextInDivergence = (
    index: number,
    rows: (D3StackFrame | null)[],
    flowDivergences: D3FlowDivergence[],
) => {
    return (
        getFlowDiv(index + 1, flowDivergences) != null || rows[index + 1] == null
    );
};

/**
 * Return true if the specified frame position corresponds to a state divergence position.
 * @param position          The frame position.
 * @returns                 True if the specified position is a state divergence, false otherwise.
 */
export const isStateDivergence = (
    position: number,
    stateDivergences: D3StateDivergence[],
) => {
    return stateDivergences.some((div) => div.originalPosition == position);
};