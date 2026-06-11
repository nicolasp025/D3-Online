import type { D3FlowDivergence } from "../../models/divergence";
import type { D3StackFrame } from "../../models/stack";
import { TREE_CONFIG } from "./tree-config";

/**
 * Returns the template for the vertical relation (used when previous frame was already in a flow divegence).
 * @returns A jsx element.
 */
export const verticalDivergenceTop = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1="-2%" // for better connection with previous node
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2={TREE_CONFIG.CIRCLE_POSITION}
        />
    );
};

/**
 * Returns the template for the vertical relation (used when next frame is also in the flow divergence).
 * @returns A jsx element.
 */
export const verticalDivergenceBottom = () => {
    return (
        <line
            x1={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y1={TREE_CONFIG.CIRCLE_POSITION}
            x2={TREE_CONFIG.LINE_X + TREE_CONFIG.SPACE_BETWEEN}
            y2="100%"
        />
    );
};

/**
 * Returns the divergence length difference between original and modified stacks.
 * Negative result = modified stack is longer.
 * 0 = both stack have the same size.
 * Positive result = original stack is longer.
 * @param flowDiv A flow divergence.
 * @returns A number.
 */
const getLengthDifference = (flowDiv: D3FlowDivergence) => {
    const originalLength =
        flowDiv.originalPosition.stop - flowDiv.originalPosition.start;
    const modifiedLength =
        flowDiv.modifiedPosition.stop - flowDiv.modifiedPosition.start;
    return originalLength - modifiedLength;
};

/**
 * Returns the divergence if the specified position is in any flow divergence range, null otherrwise.
 * @param position The considered position in the frames.
 * @param flowDivergences The flow divergence.
 * @returns A D3FlowDivergence if found, null otherwise.
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
) =>
    frames.flatMap((frame) => {
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
