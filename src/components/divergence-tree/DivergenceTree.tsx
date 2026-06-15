import "./DivergenceTree.css";
import { useEffect, useMemo, useRef } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import { TREE_CONFIG } from "../../config/tree-config";
import React from "react";
import {
    buildRows,
    getFlowDiv,
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

    const rows = useMemo(
        () => buildRows(originalStack.frames, flowDivergences),
        [originalStack, flowDivergences],
    );

    useEffect(() => {
        selectedRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });
    }, [selectedRow]);

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
