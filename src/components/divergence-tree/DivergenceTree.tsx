import "./DivergenceTree.css";
import { useEffect, useMemo, useRef } from "react";
import { useDivergence } from "../../contexts/DivergenceContext";
import { useStacks } from "../../contexts/StacksContext";
import { TREE_CONFIG } from "./tree-config";
import React from "react";
import {
    buildRows,
    getFlowDiv,
    hasNextInDivergence,
    hasPreviousInDivergence,
} from "./tree-util";
import { useDivergenceTree } from "../../contexts/DivergenceTreeContext";
import { DiffEditor } from "@monaco-editor/react";
import { useSettings } from "../../contexts/SettingsContext";
import { defineMonacoTheme, MONACO_OPTIONS } from "../../config/monaco";
import type { D3StackFrame } from "../../models/stack";
import TreeNode from "./nodes/TreeNode";
import DivergenceNode from "./nodes/DivergenceNode";
import StartDivergenceDiagonal from "./edges/StartDivergenceDiagonal";
import EndDivergenceDiagonal from "./edges/EndDivergenceDiagonal";
import NodeRelation from "./edges/NodeRelation";

const DivergenceTree = React.memo(() => {
    const { flowDivergences } = useDivergence();
    const { originalStack, modifiedStack } = useStacks();

    const { selectedRow, setSelectedRow } = useDivergenceTree();

    const selectedRef = useRef<HTMLDivElement>(null);

    const { darkMode } = useSettings();

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

    const buildTreeRow = (frame: D3StackFrame | null, index: number) => {
        if (frame == null) {
            return (
                <>
                    <NodeRelation index={index} rows={rows} />
                    {rows[index + 1] && <EndDivergenceDiagonal />}
                    <DivergenceNode frame={modifiedStack.frames[index]} />
                </>
            );
        }

        const flowDiv = getFlowDiv(index, flowDivergences);
        if (flowDiv == null) return;

        const isStart = !hasPreviousInDivergence(index, rows, flowDivergences);
        const isEnd = !hasNextInDivergence(index, rows, flowDivergences);

        return (
            <>
                {isStart && <StartDivergenceDiagonal />}
                {isEnd && <EndDivergenceDiagonal />}
                <NodeRelation index={index} rows={rows} />
                <DivergenceNode frame={frame} />
            </>
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

            {rows.map((frame, index) => (
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
                            {buildTreeRow(frame, index)}
                            <TreeNode frame={frame} />
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
                            {frame == null ? "null" : frame.position}
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
