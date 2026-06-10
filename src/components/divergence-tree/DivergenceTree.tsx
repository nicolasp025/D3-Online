import "./DivergenceTree.css";
import { useEffect, useRef } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import { TREE_CONFIG } from "./tree-config";
import React from "react";
import {
    divergenceNode,
    endDivergenceDiagonal,
    startDivergenceDiagonal,
    treeNode,
    verticalDivergenceBottom,
    verticalDivergenceTop,
} from "./tree-util";
import { useDivergenceTree } from "../../contexts/DivergenceTreeContext";
import { DiffEditor } from "@monaco-editor/react";
import { useSettings } from "../../contexts/SettingsContext";
import { defineMonacoTheme, MONACO_OPTIONS } from "../../config/monaco";

const DivergenceTree = React.memo(() => {
    const { flowDivergences, stateDivergences } = useDivergence();
    const { originalStack, modifiedStack } = useStacks();

    const { selectedRow, setSelectedRow } = useDivergenceTree();

    const selectedRef = useRef<HTMLDivElement>(null);

    const { darkMode } = useSettings();

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
                    ref={selectedRow === index ? selectedRef : null}
                    className={selectedRow === index ? "tree-row selected" : "tree-row"}
                >
                    <div
                        className="tree-svg-wrapper"
                        onClick={() => {
                            if (selectedRow === index) setSelectedRow(null);
                            else setSelectedRow(index);
                        }}
                    >
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
                        <div
                            className="tree-row-label"
                            onClick={() => {
                                if (selectedRow === index) setSelectedRow(null);
                                else setSelectedRow(index);
                            }}
                        >
                            {frame.displayName}
                        </div>
                        {selectedRow === index && (
                            <DiffEditor
                                height="300px"
                                theme={darkMode ? "d3-dark" : "d3-light"}
                                language="typescript"
                                options={MONACO_OPTIONS}
                                beforeMount={defineMonacoTheme}
                                original={originalStack.frames[index]?.sourceCode ?? ""}
                                modified={modifiedStack.frames[index]?.sourceCode ?? ""}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
});

export default DivergenceTree;
