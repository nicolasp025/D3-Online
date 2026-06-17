import "./DivergenceTree.css";
import { useEffect, useMemo, useRef } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import { TREE_CONFIG } from "../../config/tree-config";
import React from "react";
import {
    getFlowDiv,
    getLengthDifference,
    isInfiniteFlowDivergence,
    isStateDivergence,
} from "./tree-util";
import { useDivergenceTree } from "../../contexts/DivergenceTreeContext";
import DivergenceTreeRow from "./DivergenceTreeRow";
import type { TreeRow } from "../../models/tree";

const DivergenceTree = React.memo(() => {
    const { flowDivergences, stateDivergences } = useDivergence();
    const { originalStack, modifiedStack } = useStacks();
    const { selectedRow, setSelectedRow } = useDivergenceTree();

    const selectedRef = useRef<HTMLDivElement>(null);

    /**
     * Builds the list of TreeRow elements.
     * An element in the list is null if the considered position is in a flow divergence
     * that is longer than the actual path in original stack.
     *
     * @returns A list of TreeRow elements.
     */
    const buildRows = (): TreeRow[] => {
        const rows: TreeRow[] = [];
        let originalIndex = 0;
        let modifiedIndex = 0;
        let isNextInDivergence = false;

        while (
            originalIndex < originalStack.frames.length &&
            modifiedIndex < modifiedStack.frames.length
        ) {
            const flowDiv = getFlowDiv(originalIndex, modifiedIndex, flowDivergences);
            const isStateDiv = isStateDivergence(
                originalIndex,
                modifiedIndex,
                stateDivergences,
            );

            // If the previous row was in a flow divergence, then hasPreviousInDiv is true
            const hasPreviousInDiv = isNextInDivergence;
            isNextInDivergence = flowDiv != null;

            // If we are in a flow divergence, then the previous row has next in divergence
            if (rows.length > 0)
                rows[rows.length - 1].hasNextInDivergence = flowDiv != null;

            const row: TreeRow = {
                index: rows.length,
                frame: null,
                modifiedFrame: null,
                hasPreviousInDivergence: hasPreviousInDiv,
                hasNextInDivergence: false,
                isStateDivergence: isStateDiv,
                flowDivergence: flowDiv,
            };

            if (!flowDiv) {
                row.frame = originalStack.frames[originalIndex++];
                row.modifiedFrame = modifiedStack.frames[modifiedIndex++];
            } else if (isInfiniteFlowDivergence(flowDiv)) {
                row.frame = originalStack.frames[originalIndex++];
                row.modifiedFrame = modifiedStack.frames[modifiedIndex++];
                row.hasNextInDivergence = true;
            } else {
                const lengthDiff = getLengthDifference(flowDiv);

                switch (true) {
                    // Both sides are same size
                    case lengthDiff === 0:
                        row.frame = originalStack.frames[originalIndex++];
                        row.modifiedFrame = modifiedStack.frames[modifiedIndex++];
                        break;

                    // Original side is longer
                    case lengthDiff > 0:
                        row.frame = originalStack.frames[originalIndex++];
                        row.modifiedFrame =
                            modifiedIndex - flowDiv.modifiedPosition.start <=
                                flowDiv.modifiedPosition.stop - flowDiv.modifiedPosition.start
                                ? modifiedStack.frames[modifiedIndex++]
                                : null;
                        break;

                    // Modified side is longer
                    case lengthDiff < 0:
                        row.frame =
                            originalIndex - flowDiv.originalPosition.start <=
                                flowDiv.originalPosition.stop - flowDiv.originalPosition.start
                                ? originalStack.frames[originalIndex++]
                                : null;
                        row.modifiedFrame = modifiedStack.frames[modifiedIndex++];
                        break;
                }
            }

            rows.push(row);
        }

        return rows;
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

    const rows = useMemo(
        () => buildRows(),
        [originalStack, modifiedStack, flowDivergences, stateDivergences],
    );

    return (
        <div className="tree-wrapper" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="tree-row">
                <div className="tree-row-content">
                    <div className="tree-row-label">
                        <span>Position</span>
                        <span>Divergence</span>
                    </div>
                </div>
            </div>
            <svg>
                <line
                    x1={TREE_CONFIG.LINE_X}
                    y1={TREE_CONFIG.CIRCLE_POSITION}
                    x2={TREE_CONFIG.LINE_X}
                    y2={"100%"}
                    strokeWidth={TREE_CONFIG.LINE_WIDTH}
                />
            </svg>

            {rows.map((row, index) => (
                <DivergenceTreeRow key={`tree-row-${index}`} row={row} />
            ))}
        </div>
    );
});

export default DivergenceTree;
