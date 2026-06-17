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
import type { D3FlowDivergence } from "../../models/divergence";
import type { D3StackFrame } from "../../models/stack";

const DivergenceTree = React.memo(() => {
    const { flowDivergences, stateDivergences } = useDivergence();
    const { originalStack, modifiedStack } = useStacks();
    const { selectedRow, setSelectedRow } = useDivergenceTree();

    const selectedRef = useRef<HTMLDivElement>(null);

    /**
     * Returns the frames and next indexes for a row.
     * @param flowDiv The possible flow divergence.
     * @param originalIndex The original index for the row.
     * @param modifiedIndex The modified index for the row.
     * @returns The frames and next indexes for a row.
     */
    const getFrames = (
        flowDiv: D3FlowDivergence | null,
        originalIndex: number,
        modifiedIndex: number,
    ): {
        frame: D3StackFrame | null;
        modifiedFrame: D3StackFrame | null;
        nextOriginalIndex: number;
        nextModifiedIndex: number;
    } => {
        if (!flowDiv || !flowDiv.originalPosition.stop || !flowDiv.modifiedPosition.stop) {
            return {
                frame: originalStack.frames[originalIndex],
                modifiedFrame: modifiedStack.frames[modifiedIndex],
                nextOriginalIndex: originalIndex + 1,
                nextModifiedIndex: modifiedIndex + 1,
            };
        }

        const lengthDiff = getLengthDifference(flowDiv);
        const originalInRange =
            originalIndex - flowDiv.originalPosition.start <=
            flowDiv.originalPosition.stop - flowDiv.originalPosition.start;
        const modifiedInRange =
            modifiedIndex - flowDiv.modifiedPosition.start <=
            flowDiv.modifiedPosition.stop - flowDiv.modifiedPosition.start;

        return {
            frame:
                lengthDiff >= 0 || originalInRange
                    ? originalStack.frames[originalIndex]
                    : null,
            modifiedFrame:
                lengthDiff <= 0 || modifiedInRange
                    ? modifiedStack.frames[modifiedIndex]
                    : null,
            nextOriginalIndex:
                lengthDiff >= 0 || originalInRange ? originalIndex + 1 : originalIndex,
            nextModifiedIndex:
                lengthDiff <= 0 || modifiedInRange ? modifiedIndex + 1 : modifiedIndex,
        };
    };

    /**
     * Builds the list of TreeRow elements.
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
            const hasPreviousInDiv = isNextInDivergence;
            isNextInDivergence = flowDiv != null;

            if (rows.length > 0)
                rows[rows.length - 1].hasNextInDivergence = flowDiv != null;

            const { frame, modifiedFrame, nextOriginalIndex, nextModifiedIndex } =
                getFrames(flowDiv, originalIndex, modifiedIndex);

            originalIndex = nextOriginalIndex;
            modifiedIndex = nextModifiedIndex;

            rows.push({
                index: rows.length,
                frame,
                modifiedFrame,
                hasPreviousInDivergence: hasPreviousInDiv,
                hasNextInDivergence: flowDiv
                    ? isInfiniteFlowDivergence(flowDiv)
                    : false,
                isStateDivergence: isStateDivergence(
                    originalIndex,
                    modifiedIndex,
                    stateDivergences,
                ),
                flowDivergence: flowDiv,
            });
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
