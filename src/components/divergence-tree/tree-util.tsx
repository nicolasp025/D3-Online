import type { D3FlowDivergence } from "../../models/divergence";
import type { D3StackFrame } from "../../models/stack";

/**
 * Returns the divergence length difference between original and modified stacks.
 * Negative result = modified stack is longer.
 * 0 = both stack have the same size.
 * Positive result = original stack is longer.
 * @param flowDiv A flow divergence.
 * @returns A number.
 */
export const getLengthDifference = (flowDiv: D3FlowDivergence) => {
    const originalLength =
        flowDiv.originalPosition.stop - flowDiv.originalPosition.start;
    const modifiedLength =
        flowDiv.modifiedPosition.stop - flowDiv.modifiedPosition.start;
    return originalLength - modifiedLength;
};

/**
 * Returns the divergence if the specified position is in any flow divergence range, null otehrwise.
 * @param position
 * @param flowDivergences
 * @returns
 */
export const getFlowDiv = (
    position: number,
    flowDivergences: D3FlowDivergence[],
) => {
    return (
        flowDivergences.find(
            (div) =>
                position >= div.modifiedPosition.start &&
                position <= div.modifiedPosition.stop + getLengthDifference(div),
        ) ?? null
    );
};

/**
 * Builds the list of (D3StackFrame | null) elements.
 * An element in the list is null if the considered position is in a flow divergence
 * that is longer than the actual path in original stack.
 *
 * @param frames            The original stack frames.
 * @param flowDivergences   The flow divergences.
 * @returns                 A list of (D3StackFrame | null) elements.
 */
export const buildRows = (
    frames: D3StackFrame[],
    flowDivergences: D3FlowDivergence[],
) => {
    return frames.flatMap((frame) => {
        if (frame.position === 0) return [frame];

        const lastDiv = getFlowDiv(frame.position - 1, flowDivergences);
        const emptyRows =
            lastDiv && getFlowDiv(frame.position, flowDivergences) == null
                ? Array.from(
                    { length: Math.max(0, -getLengthDifference(lastDiv)) },
                    () => null,
                )
                : [];

        return [...emptyRows, frame];
    });
};

/**
 * Return true if the specified position's previous element is in a divergence.
 *
 * @param index The position in the rows.
 * @param rows The tree rows.
 * @param flowDivergences The flow divergences.
 * @returns True if the specified position's next element is in a divergence.
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
 *
 * @param index The position in the rows.
 * @param rows The tree rows.
 * @param flowDivergences The flow divergences.
 * @returns True if the specified position's next element is in a divergence.
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
