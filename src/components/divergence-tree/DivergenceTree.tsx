import "./DivergenceTree.css";
import { useEffect, useMemo, useRef } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import { TREE_CONFIG } from "../../config/tree-config";
import React from "react";
import {
    getFlowDiv,
    getLengthDifference,
    hasNextInDivergence,
    hasPreviousInDivergence,
    isStateDivergence,
} from "./tree-util";
import { useDivergenceTree } from "../../contexts/DivergenceTreeContext";
import DivergenceTreeRow from "./DivergenceTreeRow";

const DivergenceTree = React.memo(() => {
    const { flowDivergences, stateDivergences } = useDivergence();
    const { originalStack, modifiedStack } = useStacks();
    const { selectedRow, setSelectedRow } = useDivergenceTree();

    const selectedRef = useRef<HTMLDivElement>(null);

    /**
     * Builds the list of (D3StackFrame | null) elements.
     * An element in the list is null if the considered position is in a flow divergence
     * that is longer than the actual path in original stack.
     *
     * @param frames            The original stack frames.
     * @param flowDivergences   The flow divergences.
     * @returns                 A list of (D3StackFrame | null) elements.
     */
    const buildRows = () => {
        return originalStack.frames.flatMap((frame) => {
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

    useEffect(() => {
        selectedRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });
    }, [selectedRow]);

    /**
     * Handles arrow press in the tree.
     * @param event The keyboard event.
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            if (selectedRow && selectedRow > 0) {
                setSelectedRow(selectedRow - 1);
            }
        } else if (event.key === "ArrowDown") {
            if (
                selectedRow !== null &&
                selectedRow < originalStack.frames.length - 1
            ) {
                setSelectedRow(selectedRow + 1);
            }
        }
    };

    const rows = useMemo(() => buildRows(), [originalStack, flowDivergences]);

    return (
        <div className="tree-wrapper" tabIndex={0} onKeyDown={handleKeyDown}>
            <svg>
                <line
                    x1={TREE_CONFIG.LINE_X}
                    y1={TREE_CONFIG.CIRCLE_POSITION}
                    x2={TREE_CONFIG.LINE_X}
                    y2={"100%"}
                    strokeWidth={TREE_CONFIG.LINE_WIDTH}
                />
            </svg>

            {rows.map((frame, index) => (
                <DivergenceTreeRow
                    key={`tree-row-${index}`}
                    index={index}
                    frame={frame}
                    modifiedFrame={modifiedStack.frames[index]}
                    hasPrevious={hasPreviousInDivergence(index, rows, flowDivergences)}
                    hasNext={hasNextInDivergence(index, rows, flowDivergences)}
                    isStateDivergence={isStateDivergence(index, stateDivergences)}
                    flowDivergence={getFlowDiv(index, flowDivergences)}
                />
            ))}
        </div>
    );
});

export default DivergenceTree;
