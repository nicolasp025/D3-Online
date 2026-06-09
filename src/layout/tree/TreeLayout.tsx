import "./TreeLayout.css";
import { useStacks } from "../../contexts/StacksContext";
import { useEffect, useRef, useState } from "react";
import { TREE_CONFIG } from "./tree-config";
import React from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import {
    divergenceNode,
    endDivergenceDiagonal,
    startDivergenceDiagonal,
    treeNode,
    verticalDivergenceBottom,
    verticalDivergenceTop,
} from "./tree-util";

const TreeLayout = React.memo(() => {
    const { flowDivergences, stateDivergences } = useDivergence();
    const { originalStack } = useStacks();

    const [selectedFrameIndex, setSelectedFrameIndex] = useState<number | null>(
        null,
    );
    const selectedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        selectedRef.current?.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });
    }, [selectedFrameIndex]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            if (selectedFrameIndex && selectedFrameIndex > 0) {
                setSelectedFrameIndex(selectedFrameIndex - 1);
            }
        } else if (event.key === "ArrowDown") {
            if (
                selectedFrameIndex !== null &&
                selectedFrameIndex < originalStack.frames.length - 1
            ) {
                setSelectedFrameIndex(selectedFrameIndex + 1);
            }
        }
    };

    const isStateDiv = (position: number) => {
        return stateDivergences.some((div) => div.modifiedPosition == position);
    };

    const getFlowDiv = (position: number) => {
        return (
            flowDivergences.find(
                (div) =>
                    div.modifiedPosition.start <= position &&
                    div.modifiedPosition.stop >= position,
            ) ?? null
        );
    };

    return (
        <div className="tree-wrapper" tabIndex={0} onKeyDown={handleKeyDown}>
            <svg>
                <line
                    x1={TREE_CONFIG.LINE_X}
                    y1={TREE_CONFIG.CIRCLE_POSITION}
                    x2={TREE_CONFIG.LINE_X}
                    y2={"100%"}
                />
            </svg>

            {originalStack.frames.map((frame, index) => (
                <div
                    key={`tree-row-${index}`}
                    ref={selectedFrameIndex === index ? selectedRef : null}
                    className={
                        selectedFrameIndex === index ? "tree-row selected" : "tree-row"
                    }
                    onClick={() => {
                        if (selectedFrameIndex === index) setSelectedFrameIndex(null);
                        else setSelectedFrameIndex(index);
                    }}
                >
                    <div className="tree-svg-wrapper">
                        <svg>
                            {(() => {
                                const flowDiv = getFlowDiv(index);
                                if (flowDiv == null) return null;

                                const isStart = index === flowDiv.modifiedPosition.start;
                                const isEnd = index === flowDiv.modifiedPosition.stop;

                                return (
                                    <>
                                        {isStart && startDivergenceDiagonal()}
                                        {isEnd && endDivergenceDiagonal()}
                                        {!isStart && verticalDivergenceTop()}
                                        {!isEnd && verticalDivergenceBottom()}
                                        {divergenceNode(isStateDiv(index))}
                                    </>
                                );
                            })()}
                            {treeNode(isStateDiv(index))}
                        </svg>
                    </div>

                    <div className="tree-row-content">
                        <div className="tree-row-label">{frame.displayName}</div>
                        {selectedFrameIndex === index && (
                            <span className="tree-row-code">{frame.sourceCode}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
});
export default TreeLayout;
